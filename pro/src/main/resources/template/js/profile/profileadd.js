
// 项目文档
layui.config({
	base: basePath,
	version: skyeyeVersion
}).extend({
    window: 'js/winui.window'
}).define(['window', 'table', 'jquery', 'winui', 'fileUpload', 'form'], function (exports) {
	winui.renderColor();
	var index = parent.layer.getFrameIndex(window.name);
	var $ = layui.$,
		form = layui.form;
	var serviceClassName = sysServiceMation["proFile"]["key"];
	var selOption = getFileContent('tpl/template/select-option.tpl');

	var ue = ueEditorUtil.initEditor('content');

	// 项目文档分类
	sysDictDataUtil.showDictDataListByDictTypeCode(sysDictData["pmFileType"]["key"], 'select', "fileType", '', form);

	// 获取我参与的项目列表
	proUtil.queryMyProjectsList(function (data) {
		$("#proId").html(getDataUseHandlebars(selOption, data));
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
			title: $("#title").val(),
			typeId: $("#fileType").val(),
			content: encodeURIComponent(ue.getContent()),
			proId: $("#proId").val(),
			enclosureInfo: skyeyeEnclosure.getEnclosureIdsByBoxId('enclosureUpload'),
			subType: subType, // 表单类型 1.保存草稿  2.提交审批
			approvalId: approvalId
		};
		if(isNull(ue.getContent())){
			winui.window.msg('请填写文档内容！', {icon: 2, time: 2000});
			return false;
		}
		AjaxPostUtil.request({url: flowableBasePath + "profile002", params: params, type: 'json', callback: function (json) {
			parent.layer.close(index);
			parent.refreshCode = '0';
		}});
	}

	$("body").on("click", "#cancle", function() {
		parent.layer.close(index);
	});
});