
var rowId = "";

var typeList = {
	"1": "政治面貌",
	"2": "学历",
	"3": "教育背景学习形式",
	"4": "教育背景学校性质",
	"5": "奖惩分类",
	"6": "语种",
	"7": "家庭情况与本人关系",
	"8": "证件类型",
	"9": "合同类别",
	"10": "合同类型",
	"11": "证书类型"
};

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
	
	authBtn('1599919580170');
	
	$.each(typeList, function(key, value){
		$("#typeId").append('<option value="' + key + '">' + value + '</option>');
	});

    initTable();
    function initTable(){
		table.render({
		    id: 'messageTable',
		    elem: '#messageTable',
		    method: 'post',
		    url: reqBasePath + 'sysstaffdatadictionary001',
		    where: getTableParams(),
		    even: true,
		    page: true,
		    limits: getLimits(),
	    	limit: getLimit(),
		    cols: [[
		        { title: systemLanguage["com.skyeye.serialNumber"][languageType], type: 'numbers'},
		        { field: 'name', title: '名称', align: 'left', width: 160 },
		        { field: 'typeId', title: '字典类型', rowspan: 2, width: 150, templet: function(d){
                    return typeList[d.typeId];
                }},
                { field: 'state', title: '状态', rowspan: 2, width: 90, templet: function(d){
                    if(d.state == '1'){
                        return "<span class='state-new'>启用</span>";
                    }else if(d.state == '2'){
                        return "<span class='state-down'>禁用</span>";
                    }
                }},
                { field: 'createName', title: '创建人', align: 'left', width: 80 },
                { field: 'createTime', title: '创建时间', align: 'center', width: 100 },
                { field: 'lastUpdateName', title: '最后修改人', align: 'left', width: 100 },
                { field: 'lastUpdateTime', title: '最后修改时间', align: 'center', width: 100},
		        { title: systemLanguage["com.skyeye.operation"][languageType], fixed: 'right', align: 'center', width: 257, toolbar: '#tableBar'}
		    ]],
		    done: function(){
		    	matchingLanguage();
		    }
		});
		
		table.on('tool(messageTable)', function (obj) {
	        var data = obj.data;
	        var layEvent = obj.event;
	        if (layEvent === 'edit') { // 编辑
	        	edit(data);
	        }else if (layEvent === 'delet') { // 删除
	        	delet(data);
	        }else if (layEvent === 'up') { // 启用
                up(data);
            }else if (layEvent === 'down') { // 禁用
                down(data);
            }
	    });
    }
	
	form.render();
	
	// 添加
	$("body").on("click", "#addBean", function(){
    	_openNewWindows({
			url: "../../tpl/sysStaffDataDictionary/sysStaffDataDictionaryAdd.html",
			title: systemLanguage["com.skyeye.addPageTitle"][languageType],
			pageId: "sysStaffDataDictionaryAdd",
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
	
	// 编辑
    function edit(data){
        rowId = data.id;
        _openNewWindows({
			url: "../../tpl/sysStaffDataDictionary/sysStaffDataDictionaryEdit.html",
			title: systemLanguage["com.skyeye.editPageTitle"][languageType],
			pageId: "sysStaffDataDictionaryEdit",
            area: ['90vw', '90vh'],
			callBack: function(refreshCode){
                if (refreshCode == '0') {
                	winui.window.msg(systemLanguage["com.skyeye.successfulOperation"][languageType], {icon: 1,time: 2000});
                	loadTable();
                } else if (refreshCode == '-9999') {
                	winui.window.msg(systemLanguage["com.skyeye.operationFailed"][languageType], {icon: 2,time: 2000});
                }
			}
		});
	}

    // 删除
    function delet(data){
        layer.confirm(systemLanguage["com.skyeye.deleteOperationMsg"][languageType], {icon: 3, title: systemLanguage["com.skyeye.deleteOperation"][languageType]}, function(index){
            layer.close(index);
            AjaxPostUtil.request({url:reqBasePath + "sysstaffdatadictionary007", params:{rowId: data.id}, type:'json', callback:function(json){
                if(json.returnCode == 0){
                    winui.window.msg(systemLanguage["com.skyeye.deleteOperationSuccessMsg"][languageType], {icon: 1,time: 2000});
                    loadTable();
                }else{
                    winui.window.msg(json.returnMessage, {icon: 2,time: 2000});
                }
            }});
        });
    }

    // 启用
    function up(data){
        layer.confirm('确认启用选中数据吗？', { icon: 3, title: '启用操作' }, function (index) {
            layer.close(index);
            AjaxPostUtil.request({url:reqBasePath + "sysstaffdatadictionary006", params:{rowId: data.id}, type:'json', callback:function(json){
                if(json.returnCode == 0){
                    winui.window.msg(systemLanguage["com.skyeye.deleteOperationSuccessMsg"][languageType], {icon: 1,time: 2000});
                    loadTable();
                }else{
                    winui.window.msg(json.returnMessage, {icon: 2,time: 2000});
                }
            }});
        });
    }

    // 禁用
    function down(data){
        layer.confirm('确认禁用选中数据吗？', { icon: 3, title: '禁用操作' }, function (index) {
            layer.close(index);
            AjaxPostUtil.request({url:reqBasePath + "sysstaffdatadictionary005", params:{rowId: data.id}, type:'json', callback:function(json){
                if(json.returnCode == 0){
                    winui.window.msg(systemLanguage["com.skyeye.deleteOperationSuccessMsg"][languageType], {icon: 1,time: 2000});
                    loadTable();
                }else{
                    winui.window.msg(json.returnMessage, {icon: 2,time: 2000});
                }
            }});
        });
    }

    // 搜索表单
    $("body").on("click", "#formSearch", function(){
        table.reload("messageTable", {page: {curr: 1}, where: getTableParams()});
    });

	// 刷新数据
    $("body").on("click", "#reloadTable", function(){
    	loadTable();
    });

    function loadTable(){
        table.reload("messageTable", {where: getTableParams()});
    }

    function getTableParams(){
    	return {
    		typeName: $("#typeName").val(),
			state: $("#state").val(),
			typeId: $("#typeId").val()
    	};
	}
    
    exports('sysStaffDataDictionaryList', {});
});
