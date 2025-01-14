layui.config({
	base: basePath, 
	version: skyeyeVersion
}).extend({
    window: 'js/winui.window'
}).define(['window', 'table', 'jquery', 'winui'], function (exports) {
	winui.renderColor();
	layui.use(['form'], function (form) {
		var index = parent.layer.getFrameIndex(window.name);
	    var $ = layui.$,
	    	form = layui.form;
	    
 		showGrid({
		 	id: "showForm",
		 	url: sysMainMation.rmprogramBasePath + "rmxcx033",
		 	params: {rowId: parent.pageId},
		 	pagination: false,
		 	template: getFileContent('tpl/rmmysmpropage/projectpageeditTemplate.tpl'),
		 	ajaxSendLoadBefore: function(hdb) {
		 	},
		 	ajaxSendAfter:function (json) {
		 		matchingLanguage();
		 		form.render();
			    form.on('submit(formEditBean)', function (data) {
			        if (winui.verifyForm(data.elem)) {
			        	var params = {
		        			name: $("#pageName").val(),
		        			filePath: $("#filePath").val(),
		        			fileName: $("#fileName").val(),
		        			rowId: parent.pageId
			        	};
			        	AjaxPostUtil.request({url: sysMainMation.rmprogramBasePath + "rmxcx034", params: params, type: 'json', callback: function (json) {
							parent.layer.close(index);
							parent.refreshCode = '0';
			 	   		}});
			        }
			        return false;
			    });
		 	}
 		});
	    
	    // 取消
	    $("body").on("click", "#cancle", function() {
	    	parent.layer.close(index);
	    });
	});
});