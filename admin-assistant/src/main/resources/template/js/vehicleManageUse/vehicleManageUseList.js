var rowId = "";

layui.config({
	base: basePath, 
	version: skyeyeVersion
}).extend({
    window: 'js/winui.window'
}).define(['window', 'table', 'jquery', 'winui', 'form', 'laydate'], function (exports) {
	winui.renderColor();
	var $ = layui.$,
		form = layui.form,
		table = layui.table,
	    laydate = layui.laydate;
	var serviceClassName = sysServiceMation["vehicleManageUse"]["key"];
	
	// 新增用车申请
	authBtn('1597481948288');
	
	// '用车申请'页面的选取时间段表格
	laydate.render({elem: '#createTime', range: '~'});
	
	// 用车申请列表
	table.render({
		id: 'vehicleUseTable',
		elem: '#vehicleUseTable',
		method: 'post',
		url: flowableBasePath + "vehicle014",
		where: getTableParams(),
		even: true,
		page: true,
		limits: getLimits(),
		limit: getLimit(),
		cols: [[
			{ title: systemLanguage["com.skyeye.serialNumber"][languageType], type: 'numbers' },
			{ field: 'title', title: '标题', width: 300, templet: function (d) {
				return '<a lay-event="UseDedails" class="notice-title-click">' + d.title + '</a>';
			}},
			{ field: 'oddNum', title: '单号', width: 200, align: 'center' },
			{ field: 'processInstanceId', title: '流程ID', width: 80, align: 'center', templet: function (d) {
				return '<a lay-event="processDetails" class="notice-title-click">' + d.processInstanceId + '</a>';
			}},
			{ field: 'stateName', title: '状态', width: 90, align: 'center', templet: function (d) {
				return activitiUtil.showStateName2(d.state, 1);
			}},
			{ field: 'createTime', title: systemLanguage["com.skyeye.createTime"][languageType], width: 150, align: 'center'},
			{ title: systemLanguage["com.skyeye.operation"][languageType], fixed: 'right', align: 'center', width: 257, toolbar: '#useTableBar'}
		]],
		done: function(json) {
			matchingLanguage();
		}
	});

	// 车辆申请的操作事件
	table.on('tool(vehicleUseTable)', function (obj) {
        var data = obj.data;
        var layEvent = obj.event;
        if (layEvent === 'UseDedails') { //用车申请详情
        	UseDedails(data);
        } else if (layEvent === 'vehicleEdit') { //编辑用车申请
        	vehicleEdit(data);
        } else if (layEvent === 'subApproval') { //提交审批
        	subApproval(data);
        } else if (layEvent === 'cancellation') { //用车申请作废
        	cancellation(data);
        } else if (layEvent === 'processDetails') { //用车申请详情
			activitiUtil.activitiDetails(data);
        } else if (layEvent === 'revoke') { //撤销用车申请
        	revoke(data);
        }
    });
	
	// 撤销用车申请
	function revoke(data) {
		layer.confirm('确认撤销该用车申请吗？', {icon: 3, title: '撤销操作'}, function (index) {
			layer.close(index);
            AjaxPostUtil.request({url: flowableBasePath + "vehicle022", params: {processInstanceId: data.processInstanceId}, type: 'json', method: "PUT", callback: function (json) {
				winui.window.msg("提交成功", {icon: 1, time: 2000});
				loadTable();
    		}});
		});
	}
	
	// 用车申请提交审批
	function subApproval(data) {
		layer.confirm(systemLanguage["com.skyeye.approvalOperationMsg"][languageType], {icon: 3, title: systemLanguage["com.skyeye.approvalOperation"][languageType]}, function (index) {
			layer.close(index);
			activitiUtil.startProcess(serviceClassName, null, function (approvalId) {
				var params = {
					rowId: data.id,
					approvalId: approvalId
				};
				AjaxPostUtil.request({url: flowableBasePath + "vehicle017", params: params, type: 'json', callback: function (json) {
					winui.window.msg("提交成功", {icon: 1, time: 2000});
					loadTable();
				}});
			});
		});
	}
	
	// 用车申请作废
	function cancellation(data) {
		layer.confirm('确认作废该条用车申请吗？', {icon: 3, title: '作废操作'}, function (index) {
			layer.close(index);
            AjaxPostUtil.request({url: flowableBasePath + "vehicle018", params: {rowId: data.id}, type: 'json', callback: function (json) {
				winui.window.msg(systemLanguage["com.skyeye.successfulOperation"][languageType], {icon: 1, time: 2000});
				loadTable();
    		}});
		});
	}

	// 编辑用车申请
	function vehicleEdit(data) {
		rowId = data.id;
		_openNewWindows({
			url: "../../tpl/vehicleManageUse/vehicleManageUseEdit.html", 
			title: "编辑用车申请",
			pageId: "vehicleManageUseEdit",
			area: ['90vw', '90vh'],
			callBack: function (refreshCode) {
				winui.window.msg(systemLanguage["com.skyeye.successfulOperation"][languageType], {icon: 1, time: 2000});
				loadTable();
			}
		});
	}
	
	// 新增用车申请
	$("body").on("click", "#addUseBean", function() {
    	_openNewWindows({
			url: "../../tpl/vehicleManageUse/vehicleManageUseAdd.html", 
			title: "车辆申请",
			pageId: "vehicleManageUseAdd",
			area: ['90vw', '90vh'],
			callBack: function (refreshCode) {
				winui.window.msg(systemLanguage["com.skyeye.successfulOperation"][languageType], {icon: 1, time: 2000});
				loadTable();
			}});
    });
	
	// 用车申请详情
	function UseDedails(data) {
		rowId = data.id;
		_openNewWindows({
			url: "../../tpl/vehicleManageUse/vehicleManageUseDetails.html", 
			title: systemLanguage["com.skyeye.detailsPageTitle"][languageType],
			pageId: "vehicleManageUseDetails",
			area: ['90vw', '90vh'],
			callBack: function (refreshCode) {
			}
		});
	}

	form.render();
	form.on('submit(formSearch)', function (data) {
		if (winui.verifyForm(data.elem)) {
			table.reloadData("vehicleUseTable", {page: {curr: 1}, where: getTableParams()});
		}
		return false;
	});

	$("body").on("click", "#reloadTable", function() {
		loadTable();
    });

    function loadTable() {
    	table.reloadData("vehicleUseTable", {where: getTableParams()});
    }
    
    function getTableParams() {
    	var startTime = "", endTime = "";
		if (!isNull($("#createTime").val())) {
    		startTime = $("#createTime").val().split('~')[0].trim() + ' 00:00:00';
    		endTime = $("#createTime").val().split('~')[1].trim() + ' 23:59:59';
    	}
    	return {
    		startTime: startTime,
    		endTime: endTime,
    		state: $("#useState").val()
    	};
    }
	
    exports('vehicleManageUseList', {});
});
