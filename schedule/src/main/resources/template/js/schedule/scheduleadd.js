
var laydate;
var theStartTime = "", theEndTime = "";
layui.config({
	base: basePath, 
	version: skyeyeVersion
}).extend({
    window: 'js/winui.window'
}).define(['window', 'table', 'jquery', 'laydate', 'winui'], function (exports) {
	winui.renderColor();
	layui.use(['form'], function (form) {
		var index = parent.layer.getFrameIndex(window.name);
	    var $ = layui.$;
	    laydate = layui.laydate;
	    
 		// 新增节假日选取时间段
		laydate.render({elem: '#holidayTime', range: '~'});
		
		matchingLanguage();
		form.render();
 	    form.on('submit(formBean)', function (data) {
 	        if (winui.verifyForm(data.elem)) {
 	        	theStartTime = $("#holidayTime").val().split('~')[0].trim() + ' 00:00:00';
 	    		theEndTime = $("#holidayTime").val().split('~')[1].trim() + ' 23:59:59';
 	        	var params = {
 	        		title: $("#title").val(),
 	        		startTime: theStartTime,
 	        		endTime: theEndTime
 	        	};
 	        	AjaxPostUtil.request({url: sysMainMation.scheduleBasePath + "syseveschedule017", params: params, type: 'json', callback: function (json) {
					parent.layer.close(index);
					parent.refreshCode = '0';
	 	   		}});
 	        }
 	        return false;
 	    });
	    
	    $("body").on("click", "#cancle", function() {
	    	parent.layer.close(index);
	    });
	});
});