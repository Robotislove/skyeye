
var rowId = "";

layui.config({
	base: basePath,
	version: skyeyeVersion
}).extend({
    window: 'js/winui.window'
}).define(['window', 'jquery', 'winui', 'form', 'table'], function (exports) {
	winui.renderColor();
	var $ = layui.$,
		form = layui.form,
		table = layui.table;
	var serviceClassName = sysServiceMation["proFile"]["key"];

	authBtn('1575277345327');
	
	table.render({
	    id: 'messageTable',
	    elem: '#messageTable',
	    method: 'post',
	    url: flowableBasePath + 'profile001',
	    where: getTableParams(),
	    even: true,
	    page: true,
		limits: getLimits(),
		limit: getLimit(),
	    cols: [[
	        { title: systemLanguage["com.skyeye.serialNumber"][languageType], type: 'numbers' },
	        { field: 'title', title: '名称', align: 'left', width: 250, templet: function (d) {
	        	return '<a lay-event="details" class="notice-title-click">' + d.title + '</a>';
	        }},
	        { field: 'projectName', title: '所属项目', align: 'left', width: 100},
	        { field: 'stateName', title: '状态', width: 90, templet: function (d) {
	        	if(d.state == 0){
	        		return "<span>草稿</span>";
	        	} else if (d.state == 1){
	        		return "<span class='state-new'>审核中</span>";
	        	} else if (d.state == 11){
	        		return "<span class='state-up'>审核通过</span>";
	        	} else if (d.state == 12){
	        		return "<span class='state-down'>审核失败</span>";
	        	} else if (d.state == 2){
	        		return "<span class='state-down'>作废</span>";
	        	} else if (d.state == 3){
	        		return "<span class='state-error'>撤销</span>";
	        	}
	        }},
	        { field: 'updateTime', title: '更新时间', align: 'center', width: 140},
	        { field: 'processInstanceId', title: '流程ID', align: 'center', width: 100, templet: function (d) {
	        	if (!isNull(d.processInstanceId)) {
	        		return '<a lay-event="processDetails" class="notice-title-click">' + d.processInstanceId + '</a>';
	        	} else {
	        		return "";
	        	}
	        }},
	        { title: systemLanguage["com.skyeye.operation"][languageType], fixed: 'right', align: 'center', width: 250, toolbar: '#tableBar'}
	    ]],
	    done: function(json) {
	    	matchingLanguage();
	    }
	});
	
	table.on('tool(messageTable)', function (obj) {
        var data = obj.data;
        var layEvent = obj.event;
        if (layEvent === 'details') { //详情
        	details(data);
        } else if (layEvent === 'processDetails') { //流程详情
			activitiUtil.activitiDetails(data);
        } else if (layEvent === 'edit') { //编辑
        	edit(data);
        } else if (layEvent === 'subApproval') { //提交审批
        	subApproval(data, obj);
        } else if (layEvent === 'cancellation') { //作废
        	cancellation(data, obj);
        } else if (layEvent === 'del') { //删除
        	del(data, obj);
        } else if (layEvent === 'revoke') { //撤销
        	revoke(data);
        }
    });

	// 撤销审批申请
	function revoke(data) {
		layer.confirm('确认从工作流中撤销选中数据吗？', { icon: 3, title: '撤销申请' }, function (index) {
			layer.close(index);
            AjaxPostUtil.request({url: flowableBasePath + "profile007", params: {processInstanceId: data.processInstanceId}, type: 'json', callback: function (json) {
				winui.window.msg("提交成功", {icon: 1, time: 2000});
				loadTable();
    		}});
		});
	}

	// 添加
	$("body").on("click", "#addBean", function() {
    	_openNewWindows({
			url: "../../tpl/profile/profileadd.html",
			title: systemLanguage["com.skyeye.addPageTitle"][languageType],
			pageId: "profileadd",
			area: ['90vw', '90vh'],
			callBack: function (refreshCode) {
				winui.window.msg(systemLanguage["com.skyeye.successfulOperation"][languageType], {icon: 1, time: 2000});
				loadTable();
			}});
    });
	
	// 提交审批
	function subApproval(data, obj){
		layer.confirm(systemLanguage["com.skyeye.approvalOperationMsg"][languageType], {icon: 3, title: systemLanguage["com.skyeye.approvalOperation"][languageType]}, function (index) {
			layer.close(index);
			activitiUtil.startProcess(serviceClassName, null, function (approvalId) {
				var params = {
					rowId: data.id,
					approvalId: approvalId
				};
				AjaxPostUtil.request({url: flowableBasePath + "profile006", params: params, type: 'json', callback: function (json) {
					winui.window.msg("提交成功", {icon: 1, time: 2000});
					loadTable();
				}});
			});
		});
	}
	
	// 作废
	function cancellation(data, obj){
		layer.confirm('确认作废该数据吗？', { icon: 3, title: '作废操作' }, function (index) {
			layer.close(index);
            AjaxPostUtil.request({url: flowableBasePath + "profile010", params: {rowId: data.id}, type: 'json', callback: function (json) {
				winui.window.msg(systemLanguage["com.skyeye.successfulOperation"][languageType], {icon: 1, time: 2000});
				loadTable();
    		}});
		});
	}
	
	// 详情
	function details(data) {
		rowId = data.id;
		_openNewWindows({
			url: "../../tpl/profile/profiledetails.html", 
			title: systemLanguage["com.skyeye.detailsPageTitle"][languageType],
			pageId: "profiledetails",
			area: ['90vw', '90vh'],
			callBack: function (refreshCode) {
			}});
	}
	
	// 编辑
	function edit(data) {
		rowId = data.id;
		_openNewWindows({
			url: "../../tpl/profile/profileedit.html", 
			title: systemLanguage["com.skyeye.editPageTitle"][languageType],
			pageId: "profileedit",
			area: ['90vw', '90vh'],
			callBack: function (refreshCode) {
				winui.window.msg(systemLanguage["com.skyeye.successfulOperation"][languageType], {icon: 1, time: 2000});
				loadTable();
			}});
	}

	// 删除
	function del(data, obj) {
		layer.confirm(systemLanguage["com.skyeye.deleteOperationMsg"][languageType], {icon: 3, title: systemLanguage["com.skyeye.deleteOperation"][languageType]}, function (index) {
			layer.close(index);
            AjaxPostUtil.request({url: flowableBasePath + "profile009", params: {rowId: data.id}, type: 'json', callback: function (json) {
				winui.window.msg(systemLanguage["com.skyeye.deleteOperationSuccessMsg"][languageType], {icon: 1, time: 2000});
				loadTable();
    		}});
		});
	}

	// 搜索表单
	form.render();
	form.on('submit(formSearch)', function (data) {
		if (winui.verifyForm(data.elem)) {
			table.reloadData("messageTable", {page: {curr: 1}, where: getTableParams()});
		}
		return false;
	});

	// 刷新数据
    $("body").on("click", "#reloadTable", function() {
    	loadTable();
    });

    function loadTable() {
    	table.reloadData("messageTable", {where: getTableParams()});
    }

    function getTableParams() {
    	return {
    		projectName: $("#proName").val(),
			title: $("#fileName").val(),
			state: $("#state").val()
    	};
	}

    exports('profilelist', {});
});
