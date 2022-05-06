
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
	
	authBtn('1552954959607');
	
	table.render({
	    id: 'messageTable',
	    elem: '#messageTable',
	    method: 'post',
	    url: reqBasePath + 'sys013',
	    where: getTableParams(),
	    even:true,
	    page: true,
		limits: getLimits(),
		limit: getLimit(),
	    cols: [[
	        { title: systemLanguage["com.skyeye.serialNumber"][languageType], type: 'numbers'},
	        { field: 'roleName', title: '角色名称', width: 120 },
	        { field: 'roleDesc', title: '角色描述', width: 520 },
	        { field: 'userNum', title: '使用用户数量', width: 150 },
	        { field: 'parentName', title: '父角色', width: 150 },
	        { field: 'createTime', title: systemLanguage["com.skyeye.createTime"][languageType], align: 'center', width: 150 },
	        { title: systemLanguage["com.skyeye.operation"][languageType], fixed: 'right', align: 'center', width: 300, toolbar: '#tableBar'}
	    ]],
	    done: function(){
	    	matchingLanguage();
	    }
	});
	
	table.on('tool(messageTable)', function (obj) {
        var data = obj.data;
        var layEvent = obj.event;
        if (layEvent === 'del') { // 删除
        	del(data, obj);
        }else if (layEvent === 'edit') { // 编辑
        	edit(data);
        }else if (layEvent === 'appmenu') { // 手机端菜单授权
            appmenu(data);
        }else if (layEvent === 'pcMenu') { // PC端菜单授权
			pcMenu(data);
		}
    });
	
	// 删除
	function del(data, obj){
		layer.confirm(systemLanguage["com.skyeye.deleteOperationMsg"][languageType], { icon: 3, title: systemLanguage["com.skyeye.deleteOperation"][languageType] }, function (index) {
			layer.close(index);
            AjaxPostUtil.request({url: reqBasePath + "sys018", params: {rowId: data.id}, type: 'json', method: "DELETE", callback: function(json){
    			if(json.returnCode == 0){
    				winui.window.msg(systemLanguage["com.skyeye.deleteOperationSuccessMsg"][languageType], {icon: 1, time: 2000});
    				loadTable();
    			}else{
    				winui.window.msg(json.returnMessage, {icon: 2, time: 2000});
    			}
    		}});
		});
	}
	
	// 编辑
	function edit(data){
		rowId = data.id;
		_openNewWindows({
			url: "../../tpl/syseverole/syseveroleedit.html", 
			title: "编辑角色",
			pageId: "syseveroleedit",
			area: ['90vw', '90vh'],
			callBack: function(refreshCode){
                if (refreshCode == '0') {
                	winui.window.msg(systemLanguage["com.skyeye.successfulOperation"][languageType], {icon: 1,time: 2000});
                	loadTable();
                } else if (refreshCode == '-9999') {
                	winui.window.msg(systemLanguage["com.skyeye.operationFailed"][languageType], {icon: 2,time: 2000});
                }
			}});
	}
	
	// 手机端菜单授权
    function appmenu(data){
        rowId = data.id;
        _openNewWindows({
            url: "../../tpl/syseverole/syseveroleappmenu.html", 
            title: "手机端菜单授权",
            pageId: "syseveroleappmenu",
            area: ['90vw', '90vh'],
            callBack: function(refreshCode){
            }});
    }

	// PC端菜单授权
	function pcMenu(data){
		rowId = data.id;
		_openNewWindows({
			url: "../../tpl/syseverole/sysEveRolePCMenu.html",
			title: "PC端菜单授权",
			pageId: "sysEveRolePCMenu",
			area: ['90vw', '90vh'],
			callBack: function(refreshCode){
			}});
	}
	
    // 新增角色
    $("body").on("click", "#addBean", function(){
    	_openNewWindows({
			url: "../../tpl/syseverole/syseveroleadd.html", 
			title: "新增角色",
			pageId: "syseveroleadd",
			area: ['90vw', '90vh'],
			callBack: function(refreshCode){
                if (refreshCode == '0') {
                	winui.window.msg(systemLanguage["com.skyeye.successfulOperation"][languageType], {icon: 1,time: 2000});
                	loadTable();
                } else if (refreshCode == '-9999') {
                	winui.window.msg(systemLanguage["com.skyeye.operationFailed"][languageType], {icon: 2,time: 2000});
                }
			}});
    });

	form.render();
	form.on('submit(formSearch)', function (data) {
		if (winui.verifyForm(data.elem)) {
			refreshTable();
		}
		return false;
	});

	// 刷新数据
	$("body").on("click", "#reloadTable", function(){
		loadTable();
	});

    function loadTable(){
    	table.reload("messageTable", {where: getTableParams()});
    }
    
    function refreshTable(){
    	table.reload("messageTable", {page: {curr: 1}, where: getTableParams()});
    }

    function getTableParams() {
    	return {
			roleName: $("#roleName").val()
		};
	}
    
    exports('syseverolelist', {});
});
