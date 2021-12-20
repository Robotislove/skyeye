var rowId = "";

layui.config({
	base: basePath, 
	version: skyeyeVersion
}).extend({
    window: 'js/winui.window'
}).define(['window', 'table', 'jquery', 'winui', 'form', 'tableCheckBoxUtil'], function (exports) {
	winui.renderColor();
	var index = parent.layer.getFrameIndex(window.name);
	var $ = layui.$,
		form = layui.form,
		table = layui.table,
		tableCheckBoxUtil = layui.tableCheckBoxUtil;
		
	var checkType = '1';//教师选择类型：1.单选；2.多选
	var whetherIncludeMe = '1';//是否包含当前登录用户：1.是；2.否
	var whetherHasCode = '1';//是否必须是已分配帐号的教师：1.是；2.否
	
	if(!isNull(parent.teacherCheckType)){
		checkType = parent.teacherCheckType;
	}
	if(!isNull(parent.teacherWhetherIncludeMe)){
		whetherIncludeMe = parent.teacherWhetherIncludeMe;
	}
	if(!isNull(parent.teacherWhetherHasCode)){
		whetherHasCode = parent.teacherWhetherHasCode;
	}
	
	//设置提示信息
	var s = "人员选择规则：";
	if(checkType == "1"){
		s += '1.单选，双击指定行数据即可选中；';
	}else{
		s += '1.多选；';
		//显示保存按钮
		$("#saveCheckBox").show();
	}
	if(whetherIncludeMe == "1"){
		s += '2.包含当前登录用户；';
	}else{
		s += '2.不包含当前登录用户；';
	}
	if(whetherHasCode == "1"){
		s += '3.必需是已分配帐号的教师。';
	}else{
		s += '3.无需是已分配帐号的教师。';
	}
	s += '如没有查到要选择的人员，请检查人员信息是否满足当前规则。';
	$("#showInfo").html(s);
	
	//初始化学校
	showGrid({
	 	id: "schoolId",
	 	url: reqBasePath + "schoolmation008",
	 	params: {},
	 	pagination: false,
	 	template: getFileContent('tpl/template/select-option-must.tpl'),
	 	ajaxSendLoadBefore: function(hdb){},
	 	ajaxSendAfter:function(json){
	 		initTable();
	 	}
    });
	
	function initTable(){
		if(checkType == '2'){
			//初始化值
			var ids = [];
			$.each(parent.chooseTeacherList, function(i, item){
				ids.push(item.staffId);
			});
			tableCheckBoxUtil.setIds({
				gridId: 'messageTable',
				fieldName: 'staffId',
				ids: ids
			});
			tableCheckBoxUtil.init({
				gridId: 'messageTable',
				filterId: 'messageTable',
				fieldName: 'staffId'
			});
		}
			
		
		table.render({
		    id: 'messageTable',
		    elem: '#messageTable',
		    method: 'post',
		    url: reqBasePath + 'schoolteacher006',
		    where: getTableParams(),
			even: true,
		    page: true,
		    limits: [8, 16, 24, 32, 40, 48, 56],
		    limit: 8,
		    cols: [[
		    	{ type: checkType == '1' ? 'radio' : 'checkbox'},
		        { title: systemLanguage["com.skyeye.serialNumber"][languageType], type: 'numbers'},
		        { field: 'userName', title: '姓名', rowspan: '3', align: 'left', width: 150, templet: function(d){
		        	return d.jobNumber + ' ' + d.userName;
		        }},
		        { field: 'email', title: '邮箱', align: 'left', width: 170 },
		        { field: 'userPhoto', title: '头像', align: 'center', width: 60, templet: function(d){
		        	if(isNull(d.userPhoto)){
		        		return '<img src="../../assets/images/os_windows.png" class="photo-img">';
		        	}else{
		        		return '<img src="' + fileBasePath + d.userPhoto + '" class="photo-img" lay-event="userPhoto">';
		        	}
		        }},
		        { field: 'userSex', title: '性别', width: 60, align: 'center'},
		        { field: 'userCodeState', title: '帐号', width: 90, align: 'center', templet: function(d){
		        	if(d.userCodeState == '已分配帐号'){
		        		return "<span class='state-up'>" + d.userCodeState + "</span>";
		        	}else{
		        		return "<span class='state-down'>" + d.userCodeState + "</span>";
		        	}
		        }},
		        { field: 'schoolName', title: '学校', align: 'left', width: 120},
		        { field: 'phone', title: '手机号', align: 'center', width: 100},
		        { field: 'qq', title: 'QQ', align: 'center', width: 100}
		    ]],
		    done: function(res, curr, count){
		    	matchingLanguage();
		    	if(checkType == '1'){
			    	$('#messageTable').next().find('.layui-table-body').find("table" ).find("tbody").children("tr").on('dblclick',function(){
						var dubClick = $('#messageTable').next().find('.layui-table-body').find("table").find("tbody").find(".layui-table-hover");
						dubClick.find("input[type='radio']").prop("checked", true);
						form.render();
						var chooseIndex = JSON.stringify(dubClick.data('index'));
						var obj = res.rows[chooseIndex];
						parent.teacherMation.staffId = obj.staffId;
						parent.teacherMation.userId = obj.userId;
						parent.teacherMation.userName = obj.userName;
						parent.layer.close(index);
						parent.refreshCode = '0';
					});
					
					$('#messageTable').next().find('.layui-table-body').find("table" ).find("tbody").children("tr").on('click',function(){
						var click = $('#messageTable').next().find('.layui-table-body').find("table").find("tbody").find(".layui-table-hover");
						click.find("input[type='radio']").prop("checked", true);
						form.render();
					})
		    	}else{
		    		//多选
		    		//设置选中
		    		tableCheckBoxUtil.checkedDefault({
						gridId: 'messageTable',
						fieldName: 'staffId'
					});
		    	}
		    }
		});
		
		table.on('tool(messageTable)', function (obj) {
	        var data = obj.data;
	        var layEvent = obj.event;
	        if (layEvent === 'userPhoto') { //头像预览
	        	layer.open({
	        		type:1,
	        		title:false,
	        		closeBtn:0,
	        		skin: 'demo-class',
	        		shadeClose:true,
	        		content:'<img src="' + fileBasePath + data.userPhoto + '" style="max-height:600px;max-width:100%;">',
	        		scrollbar:false
	            });
	        }
	    });
		
		form.render();
	}
	
	//保存按钮-多选才有
	$("body").on("click", "#saveCheckBox", function(){
		var selectedData = tableCheckBoxUtil.getValue({
			gridId: 'messageTable'
		});
		AjaxPostUtil.request({url:reqBasePath + "schoolteacher007", params: {staffIds: selectedData.toString()}, type:'json', callback:function(json){
   			if(json.returnCode == 0){
   				parent.chooseTeacherList = [].concat(json.rows);
 	   			parent.layer.close(index);
 	        	parent.refreshCode = '0';
   			}else{
   				winui.window.msg(json.returnMessage, {icon: 2,time: 2000});
   			}
   		}});
	});
	
	
	$("body").on("click", "#formSearch", function(){
		refreshTable();
	});
	
	 $("body").on("click", "#reloadTable", function(){
    	loadTable();
    });
    
    function loadTable(){
    	table.reload("messageTable", {where: getTableParams()});
    }
    
    function refreshTable(){
    	table.reload("messageTable", {page: {curr: 1}, where: getTableParams()});
    }

	function getTableParams(){
		return {
			userName: $("#userName").val(), 
			userSex: $("#userSex").val(), 
			schoolId: $("#schoolId").val(),
			whetherIncludeMe: whetherIncludeMe,
			whetherHasCode: whetherHasCode
		};
	}
	
    exports('teacherChoose', {});
});