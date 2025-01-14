
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
	
	authBtn('1599994176696');

    // 语种
    sysDictDataUtil.showDictDataListByDictTypeCode(sysDictData["employeeLanguages"]["key"], 'select', "typeId", '', form);

    initTable();
    function initTable(){
		table.render({
		    id: 'messageTable',
		    elem: '#messageTable',
		    method: 'post',
		    url: sysMainMation.ehrBasePath + 'sysstafflanguagelevel001',
		    where: getTableParams(),
		    even: true,
		    page: true,
		    limits: getLimits(),
	    	limit: getLimit(),
		    cols: [[
		        { title: systemLanguage["com.skyeye.serialNumber"][languageType], type: 'numbers' },
		        { field: 'name', title: '名称', align: 'left', width: 160 },
		        { field: 'typeName', title: '语种', rowspan: 2, width: 150 },
                { field: 'state', title: '状态', rowspan: 2, width: 90, templet: function (d) {
                    if(d.state == '1'){
                        return "<span class='state-new'>启用</span>";
                    } else if (d.state == '2'){
                        return "<span class='state-down'>禁用</span>";
                    }
                }},
                { field: 'createName', title: systemLanguage["com.skyeye.createName"][languageType], align: 'left', width: 120 },
                { field: 'createTime', title: systemLanguage["com.skyeye.createTime"][languageType], align: 'center', width: 100 },
                { field: 'lastUpdateName', title: systemLanguage["com.skyeye.lastUpdateName"][languageType], align: 'left', width: 120 },
                { field: 'lastUpdateTime', title: '最后修改时间', align: 'center', width: 100},
		        { title: systemLanguage["com.skyeye.operation"][languageType], fixed: 'right', align: 'center', width: 257, toolbar: '#tableBar'}
		    ]],
		    done: function(json) {
		    	matchingLanguage();
		    }
		});
		
		table.on('tool(messageTable)', function (obj) {
	        var data = obj.data;
	        var layEvent = obj.event;
	        if (layEvent === 'edit') { // 编辑
	        	edit(data);
	        } else if (layEvent === 'delet') { // 删除
	        	delet(data);
	        } else if (layEvent === 'up') { // 启用
                up(data);
            } else if (layEvent === 'down') { // 禁用
                down(data);
            }
	    });
		form.render();
    }

	// 添加
	$("body").on("click", "#addBean", function() {
    	_openNewWindows({
			url: "../../tpl/sysStaffLanguageLevel/sysStaffLanguageLevelAdd.html",
			title: systemLanguage["com.skyeye.addPageTitle"][languageType],
			pageId: "sysStaffLanguageLevelAdd",
			area: ['90vw', '90vh'],
			callBack: function (refreshCode) {
                winui.window.msg(systemLanguage["com.skyeye.successfulOperation"][languageType], {icon: 1, time: 2000});
                loadTable();
			}});
    });
	
	// 编辑
    function edit(data) {
        rowId = data.id;
        _openNewWindows({
			url: "../../tpl/sysStaffLanguageLevel/sysStaffLanguageLevelEdit.html",
			title: systemLanguage["com.skyeye.editPageTitle"][languageType],
			pageId: "sysStaffLanguageLevelEdit",
            area: ['90vw', '90vh'],
			callBack: function (refreshCode) {
                winui.window.msg(systemLanguage["com.skyeye.successfulOperation"][languageType], {icon: 1, time: 2000});
                loadTable();
			}
		});
	}

    // 删除
    function delet(data) {
        layer.confirm(systemLanguage["com.skyeye.deleteOperationMsg"][languageType], {icon: 3, title: systemLanguage["com.skyeye.deleteOperation"][languageType]}, function (index) {
            layer.close(index);
            AjaxPostUtil.request({url: sysMainMation.ehrBasePath + "sysstafflanguagelevel007", params: {rowId: data.id}, type: 'json', callback: function (json) {
                winui.window.msg(systemLanguage["com.skyeye.deleteOperationSuccessMsg"][languageType], {icon: 1, time: 2000});
                loadTable();
            }});
        });
    }

    // 启用
    function up(data) {
        layer.confirm('确认启用选中数据吗？', { icon: 3, title: '启用操作' }, function (index) {
            layer.close(index);
            AjaxPostUtil.request({url: sysMainMation.ehrBasePath + "sysstafflanguagelevel006", params: {rowId: data.id}, type: 'json', callback: function (json) {
                winui.window.msg(systemLanguage["com.skyeye.deleteOperationSuccessMsg"][languageType], {icon: 1, time: 2000});
                loadTable();
            }});
        });
    }

    // 禁用
    function down(data) {
        layer.confirm('确认禁用选中数据吗？', { icon: 3, title: '禁用操作' }, function (index) {
            layer.close(index);
            AjaxPostUtil.request({url: sysMainMation.ehrBasePath + "sysstafflanguagelevel005", params: {rowId: data.id}, type: 'json', callback: function (json) {
                winui.window.msg(systemLanguage["com.skyeye.deleteOperationSuccessMsg"][languageType], {icon: 1, time: 2000});
                loadTable();
            }});
        });
    }

    // 搜索表单
    $("body").on("click", "#formSearch", function() {
        table.reloadData("messageTable", {page: {curr: 1}, where: getTableParams()});
    });

	// 刷新数据
    $("body").on("click", "#reloadTable", function() {
    	loadTable();
    });

    function loadTable() {
        table.reloadData("messageTable", {where: getTableParams()});
    }

    function getTableParams() {
    	return {
    		typeName: $("#typeName").val(),
			state: $("#state").val(),
			typeId: $("#typeId").val()
    	};
	}
    
    exports('sysStaffLanguageLevelList', {});
});
