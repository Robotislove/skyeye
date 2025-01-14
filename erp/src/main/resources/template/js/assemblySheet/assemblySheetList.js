
var rowId = "";

layui.config({
    base: basePath,
    version: skyeyeVersion
}).extend({
    window: 'js/winui.window'
}).define(['window', 'table', 'jquery', 'winui', 'form', 'laydate'], function (exports) {
    winui.renderColor();
    var $ = layui.$,
        form = layui.form,
        laydate = layui.laydate,
        table = layui.table;
    authBtn('1571811998404');//新增
    authBtn('1572244640352');//导出
        
    laydate.render({elem: '#operTime', range: '~'});
        
    table.render({
        id: 'messageTable',
        elem: '#messageTable',
        method: 'post',
        url: flowableBasePath + 'assemblysheet001',
        where: getTableParams(),
        even: true,
        page: true,
        limits: getLimits(),
	    limit: getLimit(),
        cols: [[
            { title: systemLanguage["com.skyeye.serialNumber"][languageType], type: 'numbers' },
            { field: 'defaultNumber', title: '单据编号', align: 'left', width: 200, templet: function (d) {
		        return '<a lay-event="details" class="notice-title-click">' + d.defaultNumber + '</a>';
		    }},
            { field: 'materialNames', title: '商品信息', align: 'left', width: 300},
            { field: 'status', title: '状态', align: 'left', width: 80, templet: function (d) {
		        if(d.status == '0'){
	        		return "<span class='state-down'>未审核</span>";
	        	} else if (d.status == '1'){
	        		return "<span class='state-up'>审核中</span>";
	        	} else if (d.status == '2'){
	        		return "<span class='state-new'>已组装</span>";
	        	} else if (d.status == '3'){
	        		return "<span class='state-down'>拒绝通过</span>";
	        	} else if (d.status == '4'){
	        		return "<span class='state-new'>已组装</span>";
	        	} else {
	        		return "参数错误";
	        	}
		    }},
            { field: 'totalPrice', title: '合计金额', align: 'left', width: 120},
            { field: 'operPersonName', title: '操作人', align: 'left', width: 100},
            { field: 'operTime', title: '单据日期', align: 'center', width: 140 },
            { title: systemLanguage["com.skyeye.operation"][languageType], fixed: 'right', align: 'center', width: 200, toolbar: '#tableBar'}
        ]],
	    done: function(json) {
	    	matchingLanguage();
	    }
    });

    table.on('tool(messageTable)', function (obj) {
        var data = obj.data;
        var layEvent = obj.event;
        if (layEvent === 'delete') { //删除
            deletemember(data);
        } else if (layEvent === 'details') { //详情
        	details(data);
        } else if (layEvent === 'edit') { //编辑
        	edit(data);
        } else if (layEvent === 'subExamine') { //提交审核
        	subExamine(data);
        }
    });

    // 删除
    function deletemember(data) {
        layer.confirm(systemLanguage["com.skyeye.deleteOperationMsg"][languageType], {icon: 3, title: systemLanguage["com.skyeye.deleteOperation"][languageType]}, function (index) {
            AjaxPostUtil.request({url: flowableBasePath + "delcommon010", params: {rowId: data.id}, type: 'json', callback: function (json) {
                winui.window.msg(systemLanguage["com.skyeye.deleteOperationSuccessMsg"][languageType], {icon: 1, time: 2000});
                loadTable();
            }});
        });
    }
    
    // 提交审批
	function subExamine(data) {
        layer.confirm('确认要提交审核吗？', { icon: 3, title: '提交审核操作' }, function (index) {
            AjaxPostUtil.request({url: flowableBasePath + "assemblysheet006", params: {rowId: data.id}, type: 'json', callback: function (json) {
                winui.window.msg("提交成功。", {icon: 1, time: 2000});
                loadTable();
            }});
        });
    }
    
    // 编辑
	function edit(data) {
		rowId = data.id;
		_openNewWindows({
			url: "../../tpl/assemblySheet/assemblySheetEdit.html",
			title: systemLanguage["com.skyeye.editPageTitle"][languageType],
			pageId: "assemblySheetEdit",
			area: ['90vw', '90vh'],
			callBack: function (refreshCode) {
                winui.window.msg(systemLanguage["com.skyeye.successfulOperation"][languageType], {icon: 1, time: 2000});
                loadTable();
			}});
	}
    
    // 详情
	function details(data) {
		rowId = data.id;
		_openNewWindows({
			url: "../../tpl/assemblySheet/assemblySheetDetails.html",
			title: systemLanguage["com.skyeye.detailsPageTitle"][languageType],
			pageId: "assemblySheetDetails",
			area: ['90vw', '90vh'],
			callBack: function (refreshCode) {
			}});
	}

    // 添加
    $("body").on("click", "#addBean", function() {
        _openNewWindows({
            url: "../../tpl/assemblySheet/assemblySheetAdd.html",
            title: systemLanguage["com.skyeye.addPageTitle"][languageType],
            pageId: "assemblySheetAdd",
            area: ['90vw', '90vh'],
            callBack: function (refreshCode) {
                winui.window.msg(systemLanguage["com.skyeye.successfulOperation"][languageType], {icon: 1, time: 2000});
                loadTable();
            }});
    });

    // 导出excel
    $("body").on("click", "#downloadExcel", function () {
    	postDownLoadFile({
			url : flowableBasePath + 'assemblysheet005',
			params: getTableParams(),
			method : 'post'
		});
    });

    form.render();
    form.on('submit(formSearch)', function (data) {
        if (winui.verifyForm(data.elem)) {
            table.reloadData("messageTable", {page: {curr: 1}, where: getTableParams()})
        }
        return false;
    });

    $("body").on("click", "#reloadTable", function() {
        loadTable();
    });

    // 刷新
    function loadTable() {
        table.reloadData("messageTable", {where: getTableParams()});
    }
    
    function getTableParams() {
        // 单据的开始时间、结束时间
        var startTime = "", endTime = "";
    	if (!isNull($("#operTime").val())) {
            startTime = $("#operTime").val().split('~')[0].trim() + ' 00:00:00';
            endTime = $("#operTime").val().split('~')[1].trim() + ' 23:59:59';
    	}
    	return {
    		defaultNumber: $("#defaultNumber").val(),
    		material: $("#material").val(),
    		startTime: startTime,
    		endTime: endTime
    	};
    }

    exports('assemblySheetList', {});
});
