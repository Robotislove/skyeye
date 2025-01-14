var rowId = "";

var taskType = "";//流程详情的主标题
var processInstanceId = "";//流程id

layui.config({
	base: basePath, 
	version: skyeyeVersion
}).extend({
    window: 'js/winui.window'
}).define(['window', 'table', 'jquery', 'winui', 'form', 'laydate'], function (exports) {
	winui.renderColor();
	var $ = layui.$,
		form = layui.form,
		laydate = layui.laydate,
		table = layui.table;
	var serviceClassName = sysServiceMation["assetManageUse"]["key"];
	
	// 新增资产领用申请
	authBtn('1597242249453');
	
	// '资产领用'页面的选取时间段表格
	laydate.render({elem: '#createTime', range: '~'});
	
	// 资产领用管理开始
	table.render({
		id: 'lingyongTable',
		elem: '#lingyongTable',
		method: 'post',
		url: flowableBasePath + 'asset010',
		where: getTableParams(),
		even: true,
		page: true,
		limits: getLimits(),
		limit: getLimit(),
		cols: [[
			{ title: systemLanguage["com.skyeye.serialNumber"][languageType], type: 'numbers' },
			{ field: 'title', title: '标题', width: 300, templet: function (d) {
				return '<a lay-event="lingyongDedails" class="notice-title-click">' + d.title + '</a>';
			}},
			{ field: 'oddNum', title: '单号', width: 200, align: 'center' },
			{ field: 'processInstanceId', title: '流程ID', width: 80, align: 'center', templet: function (d) {
				return '<a lay-event="lingyongProcessDetails" class="notice-title-click">' + d.processInstanceId + '</a>';
			}},
			{ field: 'stateName', title: '状态', width: 90, align: 'center', templet: function (d) {
				return activitiUtil.showStateName2(d.state, 1);
			}},
			{ field: 'createTime', title: systemLanguage["com.skyeye.createTime"][languageType], width: 150, align: 'center' },
			{ title: systemLanguage["com.skyeye.operation"][languageType], fixed: 'right', align: 'center', width: 257, toolbar: '#lingyongTableBar'}
		]],
		done: function(json) {
			matchingLanguage();
		}
	});

	// 资产领用的操作事件
	table.on('tool(lingyongTable)', function (obj) {
        var data = obj.data;
        var layEvent = obj.event;
        if (layEvent === 'lingyongDedails') { //领用详情
        	lingyongDedails(data);
        } else if (layEvent === 'lingyongEdit') { //编辑领用申请
        	lingyongEdit(data);
        } else if (layEvent === 'subApproval') { //提交审批
        	subApproval(data);
        } else if (layEvent === 'cancellation') {//领用作废
        	cancellation(data);
        } else if (layEvent === 'lingyongProcessDetails') {//领用流程详情
			activitiUtil.activitiDetails(data);
        } else if (layEvent === 'revoke') {//撤销领用申请
        	revoke(data);
        }
    });
	
	// 资产领用详情
	function lingyongDedails(data) {
		rowId = data.id;
		_openNewWindows({
			url: "../../tpl/assetManageUse/assetManageUseDetails.html", 
			title: systemLanguage["com.skyeye.detailsPageTitle"][languageType],
			pageId: "assetManageUseDetails",
			area: ['90vw', '90vh'],
			callBack: function (refreshCode) {
			}
		});
	}
	
	// 撤销资产领用
	function revoke(data) {
		var msg = '确认撤销该资产领用申请吗？';
		layer.confirm(msg, { icon: 3, title: '撤销操作' }, function (index) {
			layer.close(index);
            AjaxPostUtil.request({url: flowableBasePath + "asset036", params: {processInstanceId: data.processInstanceId}, type: 'json', method: "PUT", callback: function (json) {
				winui.window.msg("提交成功", {icon: 1, time: 2000});
				loadLingyongTable();
    		}});
		});
	}
	
	// 新增资产领用
	$("body").on("click", "#addUseBean", function() {
    	_openNewWindows({
			url: "../../tpl/assetManageUse/assetManageUseAdd.html", 
			title: "资产领用申请",
			pageId: "assetManageUseAdd",
			area: ['90vw', '90vh'],
			callBack: function (refreshCode) {
				winui.window.msg(systemLanguage["com.skyeye.successfulOperation"][languageType], {icon: 1, time: 2000});
				loadLingyongTable();
			}});
    });
	
	// 编辑资产领用申请
	function lingyongEdit(data) {
		rowId = data.id;
		_openNewWindows({
			url: "../../tpl/assetManageUse/assetManageUseEdit.html", 
			title: "编辑资产领用申请",
			pageId: "assetManageUseEdit",
			area: ['90vw', '90vh'],
			callBack: function (refreshCode) {
				winui.window.msg(systemLanguage["com.skyeye.successfulOperation"][languageType], {icon: 1, time: 2000});
				loadLingyongTable();
			}
		});
	}
	
	// 资产领用作废
	function cancellation(data) {
		var msg = '确认作废该条领用申请吗？';
		layer.confirm(msg, { icon: 3, title: '作废操作' }, function (index) {
			layer.close(index);
            AjaxPostUtil.request({url: flowableBasePath + "asset016", params: {rowId: data.id}, type: 'json', callback: function (json) {
				winui.window.msg(systemLanguage["com.skyeye.successfulOperation"][languageType], {icon: 1, time: 2000});
				loadLingyongTable();
    		}});
		});
	}
	
	// 资产领用提交审批
	function subApproval(data) {
		layer.confirm(systemLanguage["com.skyeye.approvalOperationMsg"][languageType], {icon: 3, title: systemLanguage["com.skyeye.approvalOperation"][languageType]}, function (index) {
			layer.close(index);
			activitiUtil.startProcess(serviceClassName, null, function (approvalId) {
				var params = {
					rowId: data.id,
					approvalId: approvalId
				};
				AjaxPostUtil.request({url: flowableBasePath + "asset017", params: params, type: 'json', callback: function (json) {
					winui.window.msg("提交成功", {icon: 1, time: 2000});
					loadLingyongTable();
				}});
			});
		});
	}

	form.render();
	form.on('submit(formSearch)', function (data) {
		if (winui.verifyForm(data.elem)) {
			table.reloadData("lingyongTable", {page: {curr: 1}, where: getTableParams()});
		}
		return false;
	});

	// 刷新领用数据
    $("body").on("click", "#reloadLingyongTable", function() {
    	loadLingyongTable();
    });
    
	// 刷新领用列表数据
    function loadLingyongTable(){
    	table.reloadData("lingyongTable", {where: getTableParams()});
    }
	
    function getTableParams() {
    	var startTime = "", endTime = "";
		if (!isNull($("#createTime").val())) {
    		startTime = $("#createTime").val().split('~')[0].trim() + ' 00:00:00';
    		endTime = $("#createTime").val().split('~')[1].trim() + ' 23:59:59';
    	}
    	return {
    		state: $("#lingyongState").val(),
    		startTime: startTime,
    		endTime: endTime
    	};
    }
    
    exports('assetManageUseList', {});
});
