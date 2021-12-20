
layui.config({
	base: basePath,
	version: skyeyeVersion
}).extend({
	window: 'js/winui.window'
}).define(['window', 'jquery', 'winui'], function(exports) {
	winui.renderColor();
	var index = parent.layer.getFrameIndex(window.name);
	var $ = layui.$;
		
	var rowNum = 1; //表格的序号
	
	var beanTemplate = $("#beanTemplate").html();
	
	AjaxPostUtil.request({url:reqBasePath + "proworkload006", params:{rowId: parent.rowId}, type:'json', callback:function(json){
		if(json.returnCode == 0) {
			//附件回显
			var str = "暂无附件";
            if(json.bean.enclosureInfo.length != 0 && !isNull(json.bean.enclosureInfo)){
            	str = "";
                $.each([].concat(json.bean.enclosureInfo), function(i, item){
                    str += '<a rowid="' + item.id + '" class="enclosureItem" rowpath="' + item.fileAddress + '" href="javascript:;" style="color:blue;">' + item.name + '</a><br>';
                });
            }
			var _html = getDataUseHandlebars(beanTemplate, json);//加载数据
			$("#showForm").html(_html);
			$("#enclosureUploadBox").html(str);
			var dateArray = new Array();
			dateArray.push(json.bean.tasks[0].monTime);
			dateArray.push(json.bean.tasks[0].tuesTime);
			dateArray.push(json.bean.tasks[0].wedTime);
			dateArray.push(json.bean.tasks[0].thurTime);
			dateArray.push(json.bean.tasks[0].friTime);
			dateArray.push(json.bean.tasks[0].satuTime);
			dateArray.push(json.bean.tasks[0].sunTime);
			//设置日期
			var cells = document.getElementById('dataTr').getElementsByTagName('th');
			for(var i = 0; i < 7; i++) {
				cells[i].innerHTML = dateArray[i];
			}
			matchingLanguage();
		}else {
			winui.window.msg(json.returnMessage, {icon: 2, time: 2000});
		}
    }});
    
    $("body").on("click", ".enclosureItem", function(){
    	download(fileBasePath + $(this).attr("rowpath"), $(this).html());
    });
});