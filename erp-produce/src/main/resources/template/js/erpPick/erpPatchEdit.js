
//加工单信息
var machinMation = {};

//根据那一列的值进行变化,默认根据数量
var showTdByEdit = 'rkNum';
//表格的序号
var rowNum = 1;

layui.config({
	base: basePath, 
	version: skyeyeVersion
}).extend({
    window: 'js/winui.window'
}).define(['window', 'jquery', 'winui', 'laydate', 'textool'], function (exports) {
	winui.renderColor();
	layui.use(['form'], function (form) {
		var index = parent.layer.getFrameIndex(window.name);
	    var $ = layui.$,
		    form = layui.form,
		    laydate = layui.laydate,
		    textool = layui.textool;
	    
		var usetableTemplate = $("#usetableTemplate").html();
		var selOption = getFileContent('tpl/template/select-option.tpl');
		//已经选择的商品集合key：表格的行trId，value：商品信息
		var allChooseProduct = {};
	    
 		textool.init({eleId: 'remark', maxlength: 200});
		
		// 单据时间
 		laydate.render({elem: '#operTime', type: 'datetime', value: getFormatDate(), trigger: 'click'});

		erpOrderUtil.getDepotList(function (json){
			// 加载仓库数据
			$("#depotId").html(getDataUseHandlebars(selOption, json));
			loadData();
		});

 		function loadData(){
			AjaxPostUtil.request({url: flowableBasePath + "erppick007", params: {id: parent.rowId}, type: 'json', method: 'GET', callback: function (json) {
				var data = json.bean;
				if (!isNull(data.machinId)){
					$("#machinOrder").val(data.machinNum);
					machinMation = {
						id: data.machinId,
						productionId: data.productionId
					};
				}
				$("#depotId").val(data.depotId);
				$("#operTime").val(data.operTime);
				$("#remark").val(data.remark);

				$.each(data.items, function(i, item) {
					addRow();
					//将规格所属的商品信息加入到对象中存储
					allChooseProduct["tr" + (rowNum - 1)] = item;
					//单位回显
					$("#unitId" + (rowNum - 1)).html(getDataUseHandlebars(selOption, {rows: item.unitList}));
					$("#unitId" + (rowNum - 1)).val(item.normsId);
					//商品回显
					$("#materialId" + (rowNum - 1)).val(item.materialName + "(" + item.materialModel + ")");
					$("#currentTock" + (rowNum - 1)).html(item.currentTock);//库存回显
					//补充数量
					$("#rkNum" + (rowNum - 1)).val(item.needNumber);
					$("#unitPrice" + (rowNum - 1)).val(item.unitPrice.toFixed(2));
				});
				matchingLanguage();
				form.render();

				//计算价格
				calculatedTotalPrice();
 	   		}});
		}
		
		//商品规格加载变化事件
		form.on('select(selectUnitProperty)', function(data) {
			var thisRowValue = data.value;
			var thisRowNum = data.elem.id.replace("unitId", "");//获取当前行
			//当前当前行选中的商品信息
			if (!isNull(thisRowValue) && thisRowValue != '请选择') {
				var product = allChooseProduct["tr" + thisRowNum.toString()];
				$.each(product.unitList, function(j, bean) {
					if(thisRowValue == bean.id){//获取规格
						//获取当前行数量
						var rkNum = parseInt($("#rkNum" + thisRowNum).val());
						$("#unitPrice" + thisRowNum).val(bean.estimatePurchasePrice.toFixed(2));//单价
						$("#amountOfMoney" + thisRowNum).val((rkNum * parseFloat(bean.estimatePurchasePrice)).toFixed(2));//金额
						return false;
					}
				});
			} else {
				$("#unitPrice" + thisRowNum).val("0.00");//重置单价为空
				$("#amountOfMoney" + thisRowNum).val("0.00");//重置金额为空
			}
			
			//加载库存
			loadTockByDepotAndMUnit(thisRowNum, $("#depotId").val());
			//计算价格
			calculatedTotalPrice();
		});
		
	    form.render();
	    form.on('submit(formAddBean)', function (data) {
	        if (winui.verifyForm(data.elem)) {
 	        	//物料清单
				var rowTr = $("#useTable tr");
				if(rowTr.length == 0) {
					winui.window.msg('请选择物料清单.', {icon: 2, time: 2000});
					return false;
				}
				var tableData = new Array();
				var noError = false; //循环遍历表格数据时，是否有其他错误信息
				$.each(rowTr, function(i, item) {
					//获取行编号
					var rowNum = $(item).attr("trcusid").replace("tr", "");
					//表格数量对象
					var rkNum = $("#rkNum" + rowNum);
					if(parseInt(rkNum.val()) == 0) {
						rkNum.addClass("layui-form-danger");
						rkNum.focus();
						winui.window.msg('数量不能为0', {icon: 2, time: 2000});
						noError = true;
						return false;
					}
					//商品对象
					var material = allChooseProduct["tr" + rowNum.toString()];
					if(inTableDataArrayByAssetarId(material.materialId, $("#unitId" + rowNum).val(), tableData)) {
						winui.window.msg('一张单中不允许出现相同单位的商品信息.', {icon: 2, time: 2000});
						noError = true;
						return false;
					}
					var row = {
						materialId: material.materialId,
						mUnitId: $("#unitId" + rowNum).val(),
						rkNum: rkNum.val(),
						unitPrice: $("#unitPrice" + rowNum).val()
					};
					tableData.push(row);
				});
				if(noError) {
					return false;
				}
				
				var params = {
			    	machinId: isNull(machinMation.id) ? '' : machinMation.id,
			    	productionId: isNull(machinMation.productionId) ? '' : machinMation.productionId,
			    	operTime: $("#operTime").val(),
			    	remark: $("#remark").val(),
			    	materialStr: JSON.stringify(tableData),
			    	depotId: $("#depotId").val(),
			    	rowId: parent.rowId
			    };
	        	AjaxPostUtil.request({url: flowableBasePath + "erppick011", params: params, type: 'json', callback: function (json) {
					parent.layer.close(index);
					parent.refreshCode = '0';
	 	   		}});
	        }
	        return false;
	    });
	    
 	    //新增行
		$("body").on("click", "#addRow", function() {
			addRow();
		});

		//删除行
		$("body").on("click", "#deleteRow", function() {
			deleteRow();
			//计算价格
			calculatedTotalPrice();
		});

		//新增行
		function addRow() {
			var par = {
				id: "row" + rowNum.toString(), //checkbox的id
				trId: "tr" + rowNum.toString(), //行的id
				materialId: "materialId" + rowNum.toString(), //商品id
				unitId: "unitId" + rowNum.toString(), //规格id
				currentTock: "currentTock" + rowNum.toString(), //库存id
				rkNum: "rkNum" + rowNum.toString(), //补充数量id
				unitPrice: "unitPrice"  + rowNum.toString(), //单价id
				amountOfMoney: "amountOfMoney"  + rowNum.toString() //金额id
			};
			$("#useTable").append(getDataUseHandlebars(usetableTemplate, par));
			form.render();
			rowNum++;
			//设置根据某列变化的颜色
			$("." + showTdByEdit).parent().css({'background-color': '#e6e6e6'});
		}

		//删除行
		function deleteRow() {
			var checkRow = $("#useTable input[type='checkbox'][name='tableCheckRow']:checked");
			if(checkRow.length > 0) {
				$.each(checkRow, function(i, item) {
					//删除allChooseProduct已选择的商品信息
					var trId = $(item).parent().parent().attr("trcusid");
					allChooseProduct[trId] = undefined;
					//移除界面上的信息
					$(item).parent().parent().remove();
				});
			} else {
				winui.window.msg('请选择要删除的行', {icon: 2, time: 2000});
			}
		}
		
		//商品选择
 	    $("body").on("click", ".chooseProductBtn", function (e) {
 	    	var trId = $(this).parent().parent().attr("trcusid");
			erpOrderUtil.openMaterialChooseChoosePage(function (chooseProductMation) {
				// 获取表格行号
				var thisRowNum = trId.replace("tr", "");
				//商品赋值
				allChooseProduct[trId] = chooseProductMation;
				//表格商品名称赋值
				$("#materialId" + thisRowNum.toString()).val(allChooseProduct[trId].materialName + "(" + allChooseProduct[trId].materialModel + ")");
				//表格单位赋值
				$("#unitId" + thisRowNum.toString()).html(getDataUseHandlebars(selOption, {rows: allChooseProduct[trId].unitList}));
				form.render('select');
				//计算价格
				calculatedTotalPrice();
			});
 	    });
 	    
 	    // 加工单选择
 	    $("body").on("click", "#machinOrderSel", function (e) {
 	    	_openNewWindows({
 				url: "../../tpl/erpMachin/erpMachinStateIsPassNoComplateChoose.html", 
 				title: "选择加工单",
 				pageId: "erpMachinStateIsPassNoComplateChoose",
 				area: ['90vw', '90vh'],
 				callBack: function (refreshCode) {
					$("#machinOrder").val(machinMation.orderNum);

					//移除之前填写的所有行
					var checkRow = $("#useTable input[type='checkbox'][name='tableCheckRow']");
					$.each(checkRow, function(i, item) {
						//删除allChooseProduct已选择的商品信息
						var trId = $(item).parent().parent().attr("trcusid");
						allChooseProduct[trId] = undefined;
						//移除界面上的信息
						$(item).parent().parent().remove();
					});
					$.each(machinMation.norms, function(i, item) {
						addRow();
						//将规格所属的商品信息加入到对象中存储
						allChooseProduct["tr" + (rowNum - 1)] = item;
						//单位回显
						$("#unitId" + (rowNum - 1)).html(getDataUseHandlebars(selOption, {rows: item.unitList}));
						$("#unitId" + (rowNum - 1)).val(item.normsId);
						//商品回显
						$("#materialId" + (rowNum - 1)).val(item.materialName + "(" + item.materialModel + ")");
						$("#currentTock" + (rowNum - 1)).html(item.currentTock);//库存回显
						//建议数量
						$("#rkNum" + (rowNum - 1)).val(0);
						$("#unitPrice" + (rowNum - 1)).val(item.unitPrice.toFixed(2));
					});
					//渲染
					form.render();

					//计算价格
					calculatedTotalPrice();
 				}});
 	    });
	    
	    // 取消
	    $("body").on("click", "#cancle", function() {
	    	parent.layer.close(index);
	    });
	});
	    
});