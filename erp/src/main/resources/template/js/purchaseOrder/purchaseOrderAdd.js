
// 生产订单信息
var productionMation = {};

// 根据那一列的值进行变化,默认根据数量
var showTdByEdit = 'rkNum';

// 兼容动态表单
var layedit, form;

// 采购订单
layui.config({
	base: basePath,
	version: skyeyeVersion
}).extend({
	window: 'js/winui.window'
}).define(['window', 'jquery', 'winui', 'textool'].concat(dsFormUtil.mastHaveImport), function(exports) {
	winui.renderColor();
	var index = parent.layer.getFrameIndex(window.name);
	var $ = layui.$,
		laydate = layui.laydate,
		textool = layui.textool;
	layedit = layui.layedit,
	form = layui.form;
	var serviceClassName = sysServiceMation["purchaseOrder"]["key"];

	var selOption = getFileContent('tpl/template/select-option.tpl');
	// 已经选择的商品集合key：表格的行trId，value：商品信息
	var allChooseProduct = {};

	// 获取单据提交类型
	var submitType = erpOrderUtil.getSubmitTypeByKey(serviceClassName);

	// 单据时间
	laydate.render({elem: '#operTime', type: 'datetime', value: getFormatDate(), trigger: 'click'});

	// 计划完成日期
	laydate.render({elem: '#planComplateTime', type: 'datetime', trigger: 'click'});

	textool.init({eleId: 'remark', maxlength: 200});

	// 初始化账户
	systemCommonUtil.getSysAccountListByType(function (json) {
		$("#accountId").html(getDataUseHandlebars(selOption, json));
	});

	initTableChooseUtil.initTable({
		id: "productList",
		cols: [
			{id: 'materialId', title: '商品(型号)', formType: 'chooseInput', width: '150', iconClassName: 'chooseProductBtn', verify: 'required'},
			{id: 'mUnitId', title: '单位', formType: 'select', width: '50', verify: 'required', layFilter: 'selectUnitProperty'},
			{id: 'allStock', title: '库存', formType: 'detail', width: '80'},
			{id: 'rkNum', title: '数量', formType: 'input', width: '80', className: 'change-input rkNum', verify: 'required|number', value: '1'},
			{id: 'unitPrice', title: '单价', formType: 'input', width: '80', className: 'change-input unitPrice', verify: 'required|money'},
			{id: 'amountOfMoney', title: '金额', formType: 'input', width: '80', className: 'change-input amountOfMoney', verify: 'required|money'},
			{id: 'taxRate', title: '税率(%)', formType: 'input', width: '80', className: 'change-input taxRate', verify: 'required|double', value: '0.00'},
			{id: 'taxMoney', title: '税额', formType: 'input', width: '80', className: 'change-input taxMoney', verify: 'required|money'},
			{id: 'taxUnitPrice', title: '含税单价', formType: 'input', width: '80', className: 'change-input taxUnitPrice', verify: 'required|money'},
			{id: 'taxLastMoney', title: '合计价税', formType: 'input', width: '80', className: 'change-input taxLastMoney', verify: 'required|money'},
			{id: 'remark', title: '备注', formType: 'input', width: '100'}
		],
		deleteRowCallback: function (trcusid) {
			delete allChooseProduct[trcusid];
			// 计算价格
			calculatedTotalPrice();
		},
		addRowCallback: function (trcusid) {
			// 设置根据某列变化的颜色
			$("." + showTdByEdit).parent().css({'background-color': '#e6e6e6'});
		},
		form: form,
		minData: 1
	});

	// 加载动态表单
	dsFormUtil.loadPageByCode("dsFormShow", serviceClassName, null);

	matchingLanguage();

	// 商品规格加载变化事件
	mUnitChangeEvent(form, allChooseProduct, "estimatePurchasePrice");

	// 保存为草稿
	form.on('submit(formAddBean)', function(data) {
		if(winui.verifyForm(data.elem)) {
			saveData("1", "");
		}
		return false;
	});

	// 走工作流的提交审批
	form.on('submit(formSubOneBean)', function(data) {
		if(winui.verifyForm(data.elem)) {
			activitiUtil.startProcess(serviceClassName, null, function (approvalId) {
				saveData("2", approvalId);
			});
		}
		return false;
	});

	// 不走工作流的提交
	form.on('submit(formSubTwoBean)', function(data) {
		if(winui.verifyForm(data.elem)) {
			saveData("2", "");
		}
		return false;
	});

	function saveData(subType, approvalId) {
		var result = initTableChooseUtil.getDataList('productList');
		if (!result.checkResult) {
			return false;
		}
		var noError = false;
		var tableData = [];
		$.each(result.dataList, function(i, item) {
			//获取行编号
			var thisRowKey = item["trcusid"].replace("tr", "");
			if (parseInt(item.rkNum) == 0) {
				$("#rkNum" + thisRowKey).addClass("layui-form-danger");
				$("#rkNum" + thisRowKey).focus();
				winui.window.msg('数量不能为0', {icon: 2, time: 2000});
				noError = true;
				return false;
			}
			//商品对象
			var material = allChooseProduct["tr" + thisRowKey];
			if (inTableDataArrayByAssetarId(material.materialId, item.mUnitId, tableData)) {
				winui.window.msg('一张单中不允许出现相同单位的商品信息.', {icon: 2, time: 2000});
				noError = true;
				return false;
			}
			item["materialId"] = material.materialId;
			tableData.push(item);
		});
		if (noError) {
			return false;
		}

		var params = {
			supplierId: sysSupplierUtil.supplierMation.id,
			operTime: $("#operTime").val(),
			accountId: $("#accountId").val(),
			payType: $("#payType").val(),
			remark: $("#remark").val(),
			discount: isNull($("#discount").val()) ? "0.00" : $("#discount").val(),
			discountMoney: isNull($("#discountMoney").val()) ? "0.00" : $("#discountMoney").val(),
			changeAmount: isNull($("#changeAmount").val()) ? "0.00" : $("#changeAmount").val(),
			depotheadStr: JSON.stringify(tableData),
			planComplateTime: $("#planComplateTime").val(),
			productionId: productionMation.id,
			submitType: submitType,
			subType: subType,
			approvalId: approvalId
		};
		AjaxPostUtil.request({url: flowableBasePath + "purchaseorder002", params: params, type: 'json', method: "POST", callback: function(json) {
			dsFormUtil.savePageData("dsFormShow", json.bean.id);
			parent.layer.close(index);
			parent.refreshCode = '0';
		}});
	}

	// 供应商选择
	$("body").on("click", "#supplierNameSel", function (e) {
		sysSupplierUtil.openSysSupplierChoosePage(function (supplierMation) {
			$("#supplierName").val(supplierMation.supplierName);
		});
	});

	initChooseProductBtnEnent(form, function(trId, chooseProductMation) {
		// 商品赋值
		allChooseProduct[trId] = chooseProductMation;
	});

	// 生产计划单选择
	$("body").on("click", "#productionOrderSel", function (e) {
		_openNewWindows({
			url: "../../tpl/erpProduction/erpProductionNoSuccessChoose.html",
			title: "选择生产计划单",
			pageId: "erpProductionNoSuccessChoose",
			area: ['90vw', '90vh'],
			callBack: function (refreshCode) {
				$("#productionOrder").val(productionMation.defaultNumber);
				initTableChooseUtil.deleteAllRow('productList');
				$.each(productionMation.norms, function(i, item) {
					var params = {
						"materialId": item.product.materialName + "(" + item.product.materialModel + ")",
						"mUnitId": {
							"html": getDataUseHandlebars(selOption, {rows: item.product.unitList}),
							"value": item.normsId
						},
						"allStock": item.allStock,
						"rkNum": item.needNum,
						"unitPrice": item.unitPrice.toFixed(2),
						"amountOfMoney": item.allPrice.toFixed(2),
						"taxRate": item.taxRate.toFixed(2),
						"taxMoney": item.taxMoney.toFixed(2),
						"taxUnitPrice": item.taxUnitPrice.toFixed(2),
						"taxLastMoney": item.taxLastMoney.toFixed(2)
					};
					var trcusid = initTableChooseUtil.resetData('productList', params);
					// 将规格所属的商品信息加入到对象中存储
					allChooseProduct[trcusid] = item.product;
				});
				form.render();

				// 计算价格
				calculatedTotalPrice();
			}});
	});

	$("body").on("click", "#cancle", function() {
		parent.layer.close(index);
	});
});