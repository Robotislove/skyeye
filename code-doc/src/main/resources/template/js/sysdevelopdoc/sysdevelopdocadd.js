layui.config({
	base: basePath, 
	version: skyeyeVersion
}).extend({
    window: 'js/winui.window'
}).define(['window', 'jquery', 'winui'], function (exports) {
	winui.renderColor();
	layui.use(['form'], function (form) {
		var index = parent.layer.getFrameIndex(window.name);
	    var $ = layui.$,
		    form = layui.form;
	    
		matchingLanguage();
	    form.render();
	    showGrid({
    	 	id: "docFirstType",
    	 	url: reqBasePath + "sysdevelopdoc006",
    	 	params: {rowId: '111'},
    	 	pagination: false,
    	 	template: getFileContent('tpl/template/select-option.tpl'),
    	 	ajaxSendLoadBefore: function(hdb) {
    	 	},
    	 	ajaxSendAfter:function (json) {
    	 		form.render('select');
    	 	}
        });
	    
	    //默认隐藏一级目录
	    $("#parentIdBox").addClass("layui-hide");
	    
	    form.on('radio(docType)', function (data) {
 			var val = data.value;
	    	if(val == '1'){//一级目录
	    		$("#parentIdBox").addClass("layui-hide");
	    	} else if (val == '2'){//二级目录
	    		$("#parentIdBox").removeClass("layui-hide");
	    	} else {
	    		winui.window.msg('状态值错误', {icon: 2, time: 2000});
	    	}
        });
		
	    form.on('submit(formAddBean)', function (data) {
	    	
	        if (winui.verifyForm(data.elem)) {
	        	var pId = '0';
	        	if($("input[name='docType']:checked").val() == '2'){
	        		if(isNull($("#docFirstType").val())) {
	        			winui.window.msg('请选择一级目录', {icon: 2, time: 2000});
	        			return false;
	        		} else {
	        			pId = $("#docFirstType").val();
	        		}
	        	}
	        	var params = {
        			typeName: $("#typeName").val(),
        			parentId: pId,
	        	};
	        	
	        	AjaxPostUtil.request({url: reqBasePath + "sysdevelopdoc002", params: params, type: 'json', callback: function (json) {
					parent.layer.close(index);
					parent.refreshCode = '0';
	 	   		}});
	        }
	        return false;
	    });
	    
	    // 取消
	    $("body").on("click", "#cancle", function() {
	    	parent.layer.close(index);
	    });
	});
	    
});