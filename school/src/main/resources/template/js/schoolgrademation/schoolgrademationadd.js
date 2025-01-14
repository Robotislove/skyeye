
layui.config({
	base: basePath, 
	version: skyeyeVersion
}).extend({
    window: 'js/winui.window'
}).define(['window', 'jquery', 'winui'], function (exports) {
	winui.renderColor();
	layui.use(['form', 'layedit'], function (form) {
		var index = parent.layer.getFrameIndex(window.name);
	    var $ = layui.$,
		    form = layui.form,
		    layedit = layui.layedit;

		matchingLanguage();
	    form.render();

		// 获取当前登陆用户所属的学校列表
		schoolUtil.queryMyBelongSchoolList(function (json) {
			$("#OverAllSchool").html(getDataUseHandlebars(getFileContent('tpl/template/select-option-must.tpl'), json));
			form.render("select");
			loadParentGrade();
		});

	    form.on('select(OverAllSchool)', function(data) {
    		loadParentGrade();
 		});
	    
	    //加载所属年级
		function loadParentGrade(){
			showGrid({
	    	 	id: "OverAllGrade",
	    	 	url: schoolBasePath + "grademation006",
	    	 	params: {schoolId: $("#OverAllSchool").val()},
	    	 	pagination: false,
	    	 	template: getFileContent('tpl/template/select-option.tpl'),
	    	 	ajaxSendLoadBefore: function(hdb) {
	    	 	},
	    	 	ajaxSendAfter:function (json) {
	    	 		form.render('select');
	    	 	}
	        });
		}
	    
	    form.on('radio(type)', function (data) {
 			var val = data.value;
	    	if(val == '1'){//正常年级
	    		$("#parentIdBox").addClass("layui-hide");
	    		$("#yearNBox").removeClass("layui-hide");
	    	} else if (val == '2'){//补习班
	    		$("#parentIdBox").removeClass("layui-hide");
	    		$("#yearNBox").addClass("layui-hide");
	    		$("#yearN").val("0");
	    	} else {
	    		winui.window.msg('状态值错误', {icon: 2, time: 2000});
	    	}
        });
		
	    form.on('submit(formAddBean)', function (data) {
	        if (winui.verifyForm(data.elem)) {
	        	var pId = '0';
	        	var yearN = 0;
	        	if($("input[name='type']:checked").val() == '2'){
	        		if(isNull($("#OverAllGrade").val())) {
	        			winui.window.msg('请选择正常年级', {icon: 2, time: 2000});
	        			return false;
	        		} else {
	        			pId = $("#OverAllGrade").val();
	        		}
	        	} else {
	        		yearN = $("#yearN").val();
	        	}
	        	var params = {
        			schoolId: $("#OverAllSchool").val(),
        			gradeName: $("#gradeName").val(),
        			pId: pId,
        			yearN: yearN,
        			type: $("input[name='type']:checked").val()
	        	};
	        	
	        	AjaxPostUtil.request({url:schoolBasePath + "grademation002", params: params, type: 'json', callback: function (json) {
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