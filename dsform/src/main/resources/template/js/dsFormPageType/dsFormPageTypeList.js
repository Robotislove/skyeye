
var rowId = "";

layui.config({
	base: basePath, 
	version: skyeyeVersion
}).extend({
    window: 'js/winui.window'
}).define(['window', 'treeGrid', 'jquery', 'winui', 'form'], function (exports) {
	winui.renderColor();
	var $ = layui.$,
		form = layui.form,
		treeGrid = layui.treeGrid;
	
	authBtn('1636280749353');

	treeGrid.render({
	    id: 'messageTable',
	    elem: '#messageTable',
	    method: 'post',
		idField: 'id',
	    url: reqBasePath + 'dsformpagetype001',
	    where: getTableParams(),
		treeId: 'id',//树形id字段名称
		treeUpId: 'parentId',//树形父id字段名称
		treeShowName: 'typeName',//以树形式显示的字段
	    cols: [[
	        { title: systemLanguage["com.skyeye.serialNumber"][languageType], type: 'numbers'},
			{ field: 'typeName', title: '名称',  width: 360 },
			{ field: 'createName', title: '创建人', align: 'left', width: 100 },
			{ field: 'createTime', title: '创建时间', align: 'center', width: 150 },
			{ field: 'lastUpdateName', title: '最后修改人', align: 'left', width: 100 },
			{ field: 'lastUpdateTime', title: '最后修改时间', align: 'center', width: 150 },
	        { title: systemLanguage["com.skyeye.operation"][languageType], fixed: 'right', align: 'center', width: 130, toolbar: '#tableBar'}
	    ]],
		isPage: false,
	    done: function(){
	    	matchingLanguage();
	    }
	});

	treeGrid.on('tool(messageTable)', function (obj) {
        var data = obj.data;
        var layEvent = obj.event;
        if(layEvent === 'delet'){ // 删除
        	delet(data);
        }else if(layEvent === 'edit'){ // 编辑
        	edit(data);
        }
    });
	
	// 添加
	$("body").on("click", "#addBean", function(){
    	_openNewWindows({
			url: "../../tpl/dsFormPageType/dsFormPageTypeAdd.html",
			title: systemLanguage["com.skyeye.addPageTitle"][languageType],
			pageId: "dsFormPageTypeAdd",
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

	// 删除
	function delet(data){
		layer.confirm(systemLanguage["com.skyeye.deleteOperationMsg"][languageType], {icon: 3, title: systemLanguage["com.skyeye.deleteOperation"][languageType]}, function(index){
			layer.close(index);
            AjaxPostUtil.request({url:reqBasePath + "dsformpagetype003", params:{id: data.id}, type:'json', method: "DELETE", callback:function(json){
    			if(json.returnCode == 0){
    				winui.window.msg(systemLanguage["com.skyeye.deleteOperationSuccessMsg"][languageType], {icon: 1,time: 2000});
    				loadTable();
    			}else{
    				winui.window.msg(json.returnMessage, {icon: 2,time: 2000});
    			}
    		}});
		});
	}

	// 编辑
	function edit(data){
		rowId = data.id;
		_openNewWindows({
			url: "../../tpl/dsFormPageType/dsFormPageTypeEdit.html",
			title: systemLanguage["com.skyeye.editPageTitle"][languageType],
			pageId: "dsFormPageTypeEdit",
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

	// 刷新数据
    $("body").on("click", "#reloadTable", function(){
    	loadTable();
    });

	form.render();
	form.on('submit(formSearch)', function (data) {
		if (winui.verifyForm(data.elem)) {
			loadTable();
		}
		return false;
	});
    
    function loadTable(){
		treeGrid.query("messageTable", {where: getTableParams()});
    }
    
    function getTableParams(){
    	return {
    		typeName: $("#typeName").val()
    	};
	}
    
    exports('dsFormPageTypeList', {});
});