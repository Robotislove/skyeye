
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

	// 所有待办
	table.render({
	    id: 'messageAllConductTable',
	    elem: '#messageAllConductTable',
	    method: 'post',
	    url: reqBasePath + 'activitimode019',
	    where:{},
	    even:true,
	    page: true,
		limits: getLimits(),
		limit: getLimit(),
	    cols: [[
	        { title: systemLanguage["com.skyeye.serialNumber"][languageType], type: 'numbers'},
	        { field: 'processInstanceId', title: '流程ID', width: 100 },
	        { field: 'taskType', title: '类型', width: 100 },
	        { field: 'createName', title: '申请人', width: 100},
	        { field: 'createTime', title: '申请时间', align: 'center', width: 180, templet: function(d){
	        	if(!isNull(d.createTime)){
					var str = d.createTime.toString();
					str = str.substring(0, str.length - 3);
					return date('Y-m-d H:i:s', str);
				}
	        	return "-";
	        }},
	        { field: 'name', title: '当前节点', width: 130, templet: function(d){
	        	return '[' + d.name + ']';
	        }},
	        { field: 'suspended', title: '状态', align: 'center', width: 130, templet: function(d){
	        	if(d.suspended){
	        		return "<span class='state-down'>挂起</span>";
	        	}else{
	        		return "<span class='state-up'>正常</span>";
	        	}
	        }},
	        { title: systemLanguage["com.skyeye.operation"][languageType], fixed: 'right', align: 'center', width: 240, toolbar: '#allConductTableBar'}
	    ]],
	    done: function(){
	    	matchingLanguage();
	    }
	});
	
	table.on('tool(messageAllConductTable)', function (obj) {
        var data = obj.data;
        var layEvent = obj.event;
        if (layEvent === 'hangUp') { //挂起
        	hangUp(data, obj);
        } else if (layEvent === 'activation') { //激活
        	activation(data, obj);
        } else if (layEvent === 'selTasks') { //详情
			activitiUtil.activitiDetails(data);
        }
    });
    
	// 挂起
	function hangUp(data, obj){
		var msg = '确认挂起该流程吗？';
		layer.confirm(msg, { icon: 3, title: '挂起' }, function (index) {
			layer.close(index);
	        AjaxPostUtil.request({url:reqBasePath + "activitimode020", params:{processInstanceId: data.processInstanceId}, type:'json', callback:function(json){
				if(json.returnCode == 0){
					winui.window.msg("该流程已挂起", {icon: 1,time: 2000});
					reloadAllConductTable();
				}else{
					winui.window.msg(json.returnMessage, {icon: 2,time: 2000});
				}
			}});
		});
	}
	
	//激活
	function activation(data, obj){
		var msg = '确认激活该流程吗？';
		layer.confirm(msg, { icon: 3, title: '激活' }, function (index) {
			layer.close(index);
	        AjaxPostUtil.request({url:reqBasePath + "activitimode021", params:{processInstanceId: data.processInstanceId}, type:'json', callback:function(json){
				if(json.returnCode == 0){
					winui.window.msg("该流程已激活", {icon: 1,time: 2000});
					reloadAllConductTable();
				}else{
					winui.window.msg(json.returnMessage, {icon: 2,time: 2000});
				}
			}});
		});
	}
	
    //刷新所有待办流程
	$("body").on("click", "#reloadAllConductTable", function(){
		reloadAllConductTable();
	});
	
    function reloadAllConductTable(){
    	table.reload("messageAllConductTable", {where:{}});
    }
    
    exports('alltodopossess', {});
});