
// 项目信息管理
layui.config({
	base: basePath, 
	version: skyeyeVersion
}).extend({
    window: 'js/winui.window'
}).define(['window', 'jquery', 'winui', 'laydate', 'tagEditor', 'form'], function (exports) {
	winui.renderColor();
	var index = parent.layer.getFrameIndex(window.name);
	var $ = layui.$,
		form = layui.form,
		laydate = layui.laydate;
	var serviceClassName = sysServiceMation["proProject"]["key"];
	var selOption = getFileContent('tpl/template/select-option.tpl');

	// 计划开始时间
	laydate.render({elem: '#startTime', type: 'date', trigger: 'click'});

	// 计划完成时间
	laydate.render({elem: '#endTime', type: 'date', trigger: 'click'});

	var ue = ueEditorUtil.initEditor('container');

	// 项目分类
	sysDictDataUtil.showDictDataListByDictTypeCode(sysDictData["pmProjectType"]["key"], 'select', "typeId", '', form);

	// 获取当前登录用户所属企业的所有部门信息
	systemCommonUtil.queryDepartmentListByCurrentUserBelong(function(data) {
		$("#departmentId").html(getDataUseHandlebars(selOption, data));
		$("#departmentId").val(data.bean.departments);
		form.render('select');
	});

	skyeyeEnclosure.init('enclosureUpload');
	matchingLanguage();
	form.render();

	// 保存为草稿
	form.on('submit(formAddBean)', function(data) {
		if(winui.verifyForm(data.elem)) {
			saveData("1", "");
		}
		return false;
	});

	// 提交审批
	form.on('submit(formSubBean)', function(data) {
		if(winui.verifyForm(data.elem)) {
			activitiUtil.startProcess(serviceClassName, null, function (approvalId) {
				saveData("2", approvalId);
			});
		}
		return false;
	});

	function saveData(subType, approvalId) {
		var params = {
			projectName: $("#projectName").val(),
			projectNumber: $("#projectNumber").val(),
			startTime: $("#startTime").val(),
			endTime: $("#endTime").val(),
			contactName: $("#contactName").val(),
			telphone: $("#telphone").val(),
			mobile: $("#mobile").val(),
			mail: $("#mail").val(),
			qq: $("#qq").val(),
			estimatedWorkload: $("#estimatedWorkload").val(),
			estimatedCost: $("#estimatedCost").val(),
			customerId: sysCustomerUtil.customerMation.id,
			departmentId: $("#departmentId").val(),
			typeId: $("#typeId").val(),
			contractId: $("#contractId").val(),
			businessEnclosureInfo: skyeyeEnclosure.getEnclosureIdsByBoxId('enclosureUpload'),
			subType: subType, // 表单类型 1.保存草稿  2.提交审批
			approvalId: approvalId
		};
		// 获取内容
		params.businessContent = encodeURIComponent(ue.getContent());
		if(isNull(params.businessContent)){
			winui.window.msg("请填写业务需求和目标", {icon: 2, time: 2000});
			return false;
		}
		AjaxPostUtil.request({url: flowableBasePath + "proproject003", params: params, type: 'json', callback: function (json) {
			parent.layer.close(index);
			parent.refreshCode = '0';
		}});
	}

	function contractId(id){
		//合同
		showGrid({
			id: "contractId",
			url: flowableBasePath + "mycrmcontract008",
			params: {id: id},
			pagination: false,
			template: getFileContent('tpl/template/select-option.tpl'),
			ajaxSendLoadBefore: function(hdb) {
			},
			ajaxSendAfter:function (json) {
				form.render('select');
			}
		});
	}

	$("body").on("click", "#customMationSel", function (e) {
		sysCustomerUtil.openSysCustomerChoosePage(function (customerMation) {
			contractId(customerMation.id);
			$("#customName").val(customerMation.customName);
			$("#telphone").val(customerMation.workPhone);
			$("#mobile").val(customerMation.mobilePhone);
			$("#mail").val(customerMation.email);
			$("#qq").val(customerMation.qq);
		});
	});

	$("body").on("click", "#cancle", function() {
		parent.layer.close(index);
	});
});