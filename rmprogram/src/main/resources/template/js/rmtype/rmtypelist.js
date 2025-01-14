
var rowId = "";
layui.config({
	base: basePath, 
	version: skyeyeVersion
}).extend({
    window: 'js/winui.window'
}).define(['window', 'table', 'jquery', 'winui', 'form'], function (exports) {
	winui.renderColor();
	var $ = layui.$,
		form = layui.form,
		table = layui.table;

	authBtn('1554952090490');
	
	table.render({
	    id: 'messageTable',
	    elem: '#messageTable',
	    method: 'post',
	    url: sysMainMation.rmprogramBasePath + 'rmxcx001',
	    where: {rmTypeName: $("#rmTypeName").val()},
	    even: true,
	    page: true,
	    limits: [8, 16, 24, 32, 40, 48, 56],
	    limit: 8,
	    cols: [[
	        { title: systemLanguage["com.skyeye.serialNumber"][languageType], type: 'numbers' },
	        { field: 'rmTypeName', title: '分类名称', width: 120 },
	        { field: 'groupNum', title: '分组数量', width: 120 },
	        { field: 'createTime', title: systemLanguage["com.skyeye.createTime"][languageType], width: 180 },
	        { title: systemLanguage["com.skyeye.operation"][languageType], fixed: 'right', align: 'center', width: 240, toolbar: '#tableBar'}
	    ]],
	    done: function(json) {
	    	matchingLanguage();
	    }
	});
	
	table.on('tool(messageTable)', function (obj) {
        var data = obj.data;
        var layEvent = obj.event;
        if (layEvent === 'del') { //删除
        	del(data, obj);
        } else if (layEvent === 'edit') { //编辑
        	edit(data);
        } else if (layEvent === 'top') { //上移
        	topOne(data);
        } else if (layEvent === 'lower') { //下移
        	lowerOne(data);
        }
    });
	
	form.render();
	form.on('submit(formSearch)', function (data) {
        if (winui.verifyForm(data.elem)) {
        	refreshTable();
        }
        return false;
	});
	
	//删除
	function del(data, obj) {
		var msg = obj ? '确认删除分类【' + obj.data.rmTypeName + '】吗？' : '确认删除选中数据吗？';
		layer.confirm(msg, { icon: 3, title: '删除分类' }, function (index) {
			layer.close(index);
            AjaxPostUtil.request({url: sysMainMation.rmprogramBasePath + "rmxcx003", params: {rowId: data.id}, type: 'json', callback: function (json) {
				winui.window.msg(systemLanguage["com.skyeye.deleteOperationSuccessMsg"][languageType], {icon: 1, time: 2000});
				loadTable();
    		}});
		});
	}
	
	//上移
	function topOne(data) {
		AjaxPostUtil.request({url: sysMainMation.rmprogramBasePath + "rmxcx006", params: {rowId: data.id}, type: 'json', callback: function (json) {
			winui.window.msg(systemLanguage["com.skyeye.moveUpOperationSuccessMsg"][languageType], {icon: 1, time: 2000});
			loadTable();
		}});
	}
	
	//下移
	function lowerOne(data) {
		AjaxPostUtil.request({url: sysMainMation.rmprogramBasePath + "rmxcx007", params: {rowId: data.id}, type: 'json', callback: function (json) {
			winui.window.msg(systemLanguage["com.skyeye.moveDownOperationSuccessMsg"][languageType], {icon: 1, time: 2000});
			loadTable();
		}});
	}
	
	//编辑分类
	function edit(data) {
		rowId = data.id;
		_openNewWindows({
			url: "../../tpl/rmtype/rmtypeedit.html", 
			title: "编辑分类",
			pageId: "rmtypeedit",
			area: ['500px', '30vh'],
			callBack: function (refreshCode) {
				winui.window.msg(systemLanguage["com.skyeye.successfulOperation"][languageType], {icon: 1, time: 2000});
				loadTable();
			}});
	}
	
	//刷新数据
    $("body").on("click", "#reloadTable", function() {
    	loadTable();
    });
    
    //新增分类
    $("body").on("click", "#addBean", function() {
    	_openNewWindows({
			url: "../../tpl/rmtype/rmtypeadd.html", 
			title: "新增分类",
			pageId: "rmtypeadd",
			area: ['500px', '30vh'],
			callBack: function (refreshCode) {
				winui.window.msg(systemLanguage["com.skyeye.successfulOperation"][languageType], {icon: 1, time: 2000});
				loadTable();
			}});
    });
    
    function loadTable() {
    	table.reloadData("messageTable", {where:{rmTypeName: $("#rmTypeName").val()}});
    }
    
    function refreshTable(){
    	table.reloadData("messageTable", {page: {curr: 1}, where:{rmTypeName: $("#rmTypeName").val()}});
    }
    
    exports('rmtypelist', {});
});
