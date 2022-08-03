
layui.config({
	base: basePath, 
	version: skyeyeVersion
}).extend({
    window: 'js/winui.window'
}).define(['window', 'jquery', 'winui'], function (exports) {
	winui.renderColor();
	layui.use(['form'], function (form) {
		var index = parent.layer.getFrameIndex(window.name);
	    var $ = layui.$;

	    showGrid({
		 	id: "showForm",
		 	url: sysMainMation.knowlgBasePath + "knowledgetype006",
		 	params: {rowId:parent.rowId},
		 	pagination: false,
			method: 'GET',
		 	template: getFileContent('tpl/knowledgetype/knowledgetypeeditTemplate.tpl'),
		 	ajaxSendAfter:function (json) {
 	        	matchingLanguage();
				form.render();
		 	    form.on('submit(formEditBean)', function (data) {
		 	        if (winui.verifyForm(data.elem)) {
		 	        	var params = {
		 	        		rowId: parent.rowId,
		 	        		name: $("#typeName").val()
		 	        	};
		 	        	AjaxPostUtil.request({url: sysMainMation.knowlgBasePath + "knowledgetype007", params: params, type: 'json', method: "POST", callback: function (json) {
							parent.layer.close(index);
							parent.refreshCode = '0';
		 	        	}});
		 	        }
		 	        return false;
		 	    });
		 	}
		});
	    
	    $("body").on("click", "#cancle", function() {
	    	parent.layer.close(index);
	    });
	});
});