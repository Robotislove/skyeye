
layui.config({
	base: basePath, 
	version: skyeyeVersion
}).extend({
    window: 'js/winui.window'
}).define(['window', 'jquery', 'winui', 'form'], function (exports) {
	winui.renderColor();
	var index = parent.layer.getFrameIndex(window.name);
	var $ = layui.$,
		form = layui.form;

	matchingLanguage();
	form.render();
	form.on('submit(formAddBean)', function (data) {
		if (winui.verifyForm(data.elem)) {
			var params = {
				pageName: $("#pageName").val(),
				pageDesc: $("#pageDesc").val()
			};
			AjaxPostUtil.request({url: flowableBasePath + "dsformpage002", params: params, type: 'json', method: "POST", callback: function (json) {
				parent.layer.close(index);
				parent.refreshCode = '0';
			}});
		}
		return false;
	});

	$("body").on("click", "#cancle", function() {
		parent.layer.close(index);
	});
});