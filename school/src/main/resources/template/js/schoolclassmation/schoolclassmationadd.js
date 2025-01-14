
//选中的教师信息
var teacherMation = {};
var teacherCheckType = '1';//教师选择类型：1.单选；2.多选
var teacherWhetherIncludeMe = '1';//是否包含当前登录用户：1.是；2.否
var teacherWhetherHasCode = '2';//是否必须是已分配帐号的教师：1.是；2.否

layui.config({
	base: basePath, 
	version: skyeyeVersion
}).extend({
    window: 'js/winui.window'
}).define(['window', 'jquery', 'winui', 'laydate'], function (exports) {
	winui.renderColor();
	layui.use(['form'], function (form) {
		var index = parent.layer.getFrameIndex(window.name);
	    var $ = layui.$,
		    form = layui.form,
			laydate = layui.laydate;
	    
		laydate.render({elem: '#year', type: 'year', max: 'date'});
	    
		matchingLanguage();
	    form.render();

		// 获取当前登陆用户所属的学校列表
		schoolUtil.queryMyBelongSchoolList(function (json) {
			$("#schoolId").html(getDataUseHandlebars(getFileContent('tpl/template/select-option-must.tpl'), json));
			form.render("select");
			// 加载年级
			initGradeId();
			// 加载教学楼
			initFloorId();
		});
        form.on('select(schoolId)', function(data) {
    		//加载年级
	 		initGradeId();
	 		//加载教学楼
	 		initFloorId();
 		});
        
	    //所属年级
        function initGradeId(){
		    showGrid({
	    	 	id: "gradeId",
	    	 	url: schoolBasePath + "grademation006",
	    	 	params: {schoolId: $("#schoolId").val()},
	    	 	pagination: false,
	    	 	template: getFileContent('tpl/template/select-option.tpl'),
	    	 	ajaxSendLoadBefore: function(hdb) {
	    	 	},
	    	 	ajaxSendAfter:function (json) {
	    	 		form.render('select');
	    	 	}
	        });
        }
        
        //所属教学楼
        function initFloorId(){
		    showGrid({
	    	 	id: "floorId",
	    	 	url: schoolBasePath + "schoolfloormation006",
	    	 	params: {schoolId: $("#schoolId").val()},
	    	 	pagination: false,
	    	 	template: getFileContent('tpl/template/select-option.tpl'),
	    	 	ajaxSendLoadBefore: function(hdb) {
	    	 	},
	    	 	ajaxSendAfter:function (json) {
	    	 		form.render('select');
	    	 	}
	        });
        }
	    
	    form.on('submit(formAddBean)', function (data) {
	        if (winui.verifyForm(data.elem)) {
	        	var pId = '0';
	        	var params = {
        			schoolId: $("#schoolId").val(),
        			gradeId: $("#gradeId").val(),
        			className: $("#className").val(),
        			limitNumber: $("#limitNumber").val(),
        			masterStaffId: "",
        			floorId: $("#floorId").val(),
        			year: $("#year").val()
	        	};
	        	
	        	//选中的教师赋值
	        	if (!isNull(teacherMation.staffId)){
	        		params.masterStaffId = teacherMation.staffId;
	        	}
	        	
	        	AjaxPostUtil.request({url: schoolBasePath + "classmation002", params: params, type: 'json', callback: function (json) {
					parent.layer.close(index);
					parent.refreshCode = '0';
	 	   		}});
	        }
	        return false;
	    });
	    
	    //教师选择
 	    $("body").on("click", "#masterStaffNameSel", function (e) {
 	    	_openNewWindows({
 				url: "../../tpl/schoolteacher/teacherChoose.html", 
 				title: "选择教师",
 				pageId: "teacherChoose",
 				area: ['90vw', '90vh'],
 				callBack: function (refreshCode) {
					$("#masterStaffName").val(teacherMation.userName);
 				}});
 	    });
	    
	    // 取消
	    $("body").on("click", "#cancle", function() {
	    	parent.layer.close(index);
	    });
	});
	    
});