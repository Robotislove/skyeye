
var processInstanceId = "";//流程id

var hisTaskId = "";//历史审批任务id

layui.config({
	base: basePath, 
	version: skyeyeVersion
}).extend({
    window: 'js/winui.window'
}).define(['window', 'table', 'jquery', 'winui', 'form'], function (exports) {
	winui.renderColor();
	var $ = layui.$,
		table = layui.table,
		form = layui.form;
	
	// 我的历史任务
	table.render({
	    id: 'messageMyHistoryTaskTable',
	    elem: '#messageMyHistoryTaskTable',
	    method: 'post',
	    url: flowableBasePath + 'activitimode014',
	    where:{},
	    even: true,
	    page: true,
		limits: getLimits(),
		limit: getLimit(),
	    cols: [[
	        { title: systemLanguage["com.skyeye.serialNumber"][languageType], type: 'numbers' },
	        { field: 'processInstanceId', title: '流程ID', width: 100 },
			{ field: 'taskType', title: '类型', width: 150, templet: function (d) {
				return d.processMation.title;
			}},
			{ field: 'createName', title: '申请人', width: 120, templet: function (d) {
				return d.processMation.createName;
			}},
			{ field: 'createTime', title: '申请时间', align: 'center', width: 150, templet: function (d) {
				return d.processMation.createTime;
			}},
	        { field: 'name', title: '我处理的节点', width: 130, templet: function (d) {
	        	return '[' + d.name + ']';
	        }},
	        { field: 'agencyName', title: '受理人', width: 80},
	        { field: 'endTime', title: '受理时间', align: 'center', width: 140, templet: function (d) {
	        	if (!isNull(d.endTime)){
		        	var str = d.endTime.toString();
		        	str = str.substring(0, str.length - 3);
		        	return date('Y-m-d H:i', str);
	        	} else {
	        		return "";
	        	}
	        }},
	        { field: 'weatherEnd', title: '审批进度', align: 'left', width: 80, templet: function (d) {
	        	if(d.weatherEnd == 0){
	        		return "<span class='state-down'>进行中</span>";
	        	} else {
	        		return "<span class='state-up'>已完成</span>";
	        	}
	        }},
	        { title: systemLanguage["com.skyeye.operation"][languageType], fixed: 'right', align: 'center', width: 240, toolbar: '#myHistoryTaskTableBar'}
	    ]],
	    done: function(json) {
	    	matchingLanguage();
	    }
	});
	
	table.on('tool(messageMyHistoryTaskTable)', function (obj) {
        var data = obj.data;
        var layEvent = obj.event;
        if (layEvent === 'details') { //详情
			activitiUtil.activitiDetails(data);
        } else if (layEvent === 'withdraw') { //撤回
        	withdraw(data);
        } else if (layEvent === 'refreshPic') { //刷新流程图
        	refreshPic(data);
        }
    });

	//撤回
	function withdraw(data) {
		//流程id
		processInstanceId = data.processInstanceId;
		//历史审批任务id
		hisTaskId = data.hisTaskId;
		_openNewWindows({
			url: "../../tpl/activitiCommon/revokeActiviti.html",
			title: "撤回",
			pageId: "revokeActiviti",
			area: ['70vw', '40vh'],
			callBack: function (refreshCode) {
				winui.window.msg(systemLanguage["com.skyeye.successfulOperation"][languageType], {icon: 1, time: 2000});
				reloadMyHistoryTaskTable();
			}
		});
	}
	
	//刷新流程图
	function refreshPic(data) {
		layer.confirm('确认重新生成流程图吗？', { icon: 3, title: '刷新流程图操作' }, function (i) {
			layer.close(i);
            AjaxPostUtil.request({url: flowableBasePath + "activitimode027", params: {processInstanceId: data.processInstanceId}, type: 'json', callback: function (json) {
				winui.window.msg(systemLanguage["com.skyeye.successfulOperation"][languageType], {icon: 1, time: 2000});
 	   		}});
		});
	}
	
    //刷新我的历史任务
	$("body").on("click", "#reloadMyHistoryTaskTable", function() {
		reloadMyHistoryTaskTable();
	});
	
    function reloadMyHistoryTaskTable(){
    	table.reloadData("messageMyHistoryTaskTable", {where:{}});
    }
    
    exports('processedProcess', {});
});
