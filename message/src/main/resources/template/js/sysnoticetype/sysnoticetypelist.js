var firstType = "";
var rowId = "";
layui.config({
	base: basePath, 
	version: skyeyeVersion
}).extend({
    window: 'js/winui.window'
}).define(['window', 'tableTreeDj', 'jquery', 'winui', 'form'], function (exports) {
	winui.renderColor();
	var $ = layui.$,
		form = layui.form,
		tableTree = layui.tableTreeDj;
	
	authBtn('1561106812907');
	// 公告类型列表
	tableTree.render({
	    id: 'messageTable',
	    elem: '#messageTable',
	    method: 'post',
	    url: sysMainMation.noticeBasePath + 'noticetype001',
	    where: {name: $("#name").val(), parentId: $("#firstType").val()},
	    cols: [[
	        { title: systemLanguage["com.skyeye.serialNumber"][languageType], type: 'numbers' },
	        { field: 'name', title: '类型名称', width: 120 },
	        { field: 'allNum', title: '总公告数量', align: 'center', width: 120 },
	        { field: 'upStateNum', title: '上线公告数量', align: 'center', width: 120 },
	        { field: 'state', title: '当前状态', width: 120, align: 'center', templet: function (d) {
	        	if(d.state == '3'){
	        		return "<span class='state-down'>下线</span>";
	        	} else if (d.state == '2'){
	        		return "<span class='state-up'>上线</span>";
	        	} else if (d.state == '1'){
	        		return "<span class='state-new'>新建</span>";
	        	}
	        }},
	        { field: 'pId', title: '类型级别', align: 'center', width: 120 , templet: function (d) {
	        	if(d.pId == '0'){
	        		return "一级类型";
	        	} else {
	        		return "二级类型";
	        	}
	        }},
	        { field: 'createName', title: systemLanguage["com.skyeye.createName"][languageType], align: 'left', width: 120 },
	        { field: 'createTime', title: systemLanguage["com.skyeye.createTime"][languageType], align: 'center', width: 180 },
	        { title: systemLanguage["com.skyeye.operation"][languageType], fixed: 'right', align: 'center', width: 257, toolbar: '#tableBar'}
	    ]],
	    done: function(json) {
	    	matchingLanguage();
	    	if(!loadFirstType){
	    		initFirstType();
	    	}
	    }
	}, {
		keyId: 'id',
		keyPid: 'pId',
		title: 'name',
	});

	tableTree.getTable().on('tool(messageTable)', function (obj) {
        var data = obj.data;
        var layEvent = obj.event;
        if (layEvent === 'edit') { //编辑
        	edit(data);
        } else if (layEvent === 'delet') { //删除
        	delet(data);
        } else if (layEvent === 'up') { //上线
        	up(data);
        } else if (layEvent === 'down') { //下线
        	down(data);
        } else if (layEvent === 'upMove') { //上移
        	upMove(data);
        } else if (layEvent === 'downMove') { //下移
        	downMove(data);
        }
    });
	
	var loadFirstType = false;
	//初始化一级类型
	function initFirstType(){
		loadFirstType = true;
		showGrid({
		 	id: "firstType",
		 	url: sysMainMation.noticeBasePath + "noticetype012",
		 	params: {},
		 	pagination: false,
		 	template: getFileContent('tpl/template/select-option.tpl'),
		 	ajaxSendLoadBefore: function(hdb) {},
		 	ajaxSendAfter:function (json) {
		 		form.render('select');
		 	}
	    });
	}
	//一级类型监听事件
	form.on('select(firstType)', function(data) {
		firstType = data.value;
	});
	
	form.render();

	$("body").on("click", "#formSearch", function() {
		loadTable();
	});
	
	//添加
	$("body").on("click", "#addBean", function() {
    	_openNewWindows({
			url: "../../tpl/sysnoticetype/sysnoticetypeadd.html", 
			title: "新增类型",
			pageId: "sysnoticetypeadd",
			area: ['500px', '40vh'],
			callBack: function (refreshCode) {
				winui.window.msg(systemLanguage["com.skyeye.successfulOperation"][languageType], {icon: 1, time: 2000});
				loadTable();
			}});
    });
	
	//删除
	function delet(data) {
		var msg = '确认删除选中数据吗？';
		layer.confirm(msg, { icon: 3, title: '删除公告类型' }, function (index) {
			layer.close(index);
            AjaxPostUtil.request({url: sysMainMation.noticeBasePath + "noticetype003", params: {rowId: data.id}, type: 'json', callback: function (json) {
				winui.window.msg(systemLanguage["com.skyeye.deleteOperationSuccessMsg"][languageType], {icon: 1, time: 2000});
				loadTable();
    		}});
		});
	}
	
	//上线
	function up(data) {
		var msg = '确认上线选中数据吗？';
		layer.confirm(msg, { icon: 3, title: '上线公告类型' }, function (index) {
			layer.close(index);
            AjaxPostUtil.request({url: sysMainMation.noticeBasePath + "noticetype004", params: {rowId: data.id}, type: 'json', callback: function (json) {
				winui.window.msg("上线成功", {icon: 1, time: 2000});
				loadTable();
    		}});
		});
	}
	
	//下线
	function down(data) {
		var msg = '确认下线选中数据吗？';
		layer.confirm(msg, { icon: 3, title: '下线公告类型' }, function (index) {
			layer.close(index);
            AjaxPostUtil.request({url: sysMainMation.noticeBasePath + "noticetype005", params: {rowId: data.id}, type: 'json', callback: function (json) {
				winui.window.msg("下线成功", {icon: 1, time: 2000});
				loadTable();
    		}});
		});
	}
	
	//编辑
	function edit(data) {
		rowId = data.id;
		_openNewWindows({
			url: "../../tpl/sysnoticetype/sysnoticetypeedit.html", 
			title: "编辑类型",
			pageId: "sysnoticetypeedit",
			area: ['500px', '40vh'],
			callBack: function (refreshCode) {
				winui.window.msg(systemLanguage["com.skyeye.successfulOperation"][languageType], {icon: 1, time: 2000});
				loadTable();
			}
		});
	}
	
	//上移
	function upMove(data) {
        AjaxPostUtil.request({url: sysMainMation.noticeBasePath + "noticetype008", params: {rowId: data.id}, type: 'json', callback: function (json) {
			winui.window.msg(systemLanguage["com.skyeye.moveUpOperationSuccessMsg"][languageType], {icon: 1, time: 2000});
			loadTable();
		}});
	}
	
	//下移
	function downMove(data) {
        AjaxPostUtil.request({url: sysMainMation.noticeBasePath + "noticetype009", params: {rowId: data.id}, type: 'json', callback: function (json) {
			winui.window.msg(systemLanguage["com.skyeye.moveDownOperationSuccessMsg"][languageType], {icon: 1, time: 2000});
			loadTable();
		}});
	}
    
	//刷新数据
    $("body").on("click", "#reloadTable", function() {
    	loadTable();
    });
    
    function loadTable() {
		tableTree.reload("messageTable", {where:{name: $("#name").val(),parentId: $("#firstType").val()}});
    }
    
    exports('sysnoticetypelist', {});
});
