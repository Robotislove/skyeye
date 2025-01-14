
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
    authBtn('1571812346209');//新增
    authBtn('1571988086763');//导出
    var serviceClassName = sysServiceMation["outIsOthers"]["key"];
        
    laydate.render({elem: '#operTime', range: '~'});
        
    table.render({
        id: 'messageTable',
        elem: '#messageTable',
        method: 'post',
        url: flowableBasePath + 'otheroutlets001',
        where: getTableParams(),
        even: true,
        page: true,
        limits: getLimits(),
	    limit: getLimit(),
        cols: [[
            { title: systemLanguage["com.skyeye.serialNumber"][languageType], rowspan: '2', type: 'numbers' },
            { field: 'defaultNumber', title: '单据编号', align: 'left', width: 200, rowspan: '2', templet: function (d) {
		        return '<a lay-event="details" class="notice-title-click">' + d.defaultNumber + '</a>';
		    }},
            { field: 'supplierName', title: '客户', align: 'left', rowspan: '2', width: 150 },
            { title: '审批模式', align: 'center', colspan: '2'},
            { field: 'state', title: '状态', align: 'left', rowspan: '2', width: 80, templet: function (d) {
                return activitiUtil.showStateName(d.state, d.submitType);
            }},
            { field: 'totalPrice', title: '合计金额', align: 'left', rowspan: '2', width: 120},
            { field: 'operPersonName', title: '操作人', align: 'left', rowspan: '2', width: 100},
            { field: 'operTime', title: '单据日期', align: 'center', rowspan: '2', width: 140 },
            { title: systemLanguage["com.skyeye.operation"][languageType], fixed: 'right', rowspan: '2', align: 'center', width: 200, toolbar: '#tableBar'}
        ],[
            { field: 'submitType', title: '提交模式', align: 'left', width: 120, templet: function (d) {
                return erpOrderUtil.getSubmitTypeName(d);
            }},
            { field: 'processInstanceId', title: '流程实例id', align: 'left', width: 120, templet: function (d) {
                return erpOrderUtil.getProcessInstanceIdBySubmitType(d);
            }}
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
        } else if (layEvent === 'submitToSave') { //提交
            subExamine(data);
        } else if (layEvent === 'subExamine') { //提交审核
            subExamine(data);
        } else if (layEvent === 'activitiProcessDetails') { // 工作流流程详情查看
            activitiUtil.activitiDetails(data);
        } else if (layEvent === 'revoke') { //撤销
            erpOrderUtil.revokeOrderMation(data.processInstanceId, serviceClassName, function() {
                loadTable();
            });
        }
    });

    // 提交数据
	function subExamine(data) {
        erpOrderUtil.submitOrderMation(data.id, serviceClassName, data.submitType, serviceClassName, function() {
            loadTable();
        });
    }
    
    // 编辑
    function edit(data) {
        rowId = data.id;
        _openNewWindows({
            url: "../../tpl/otherOutlets/otherOutletsEdit.html",
            title: systemLanguage["com.skyeye.editPageTitle"][languageType],
            pageId: "otherOutletsEdit",
            area: ['90vw', '90vh'],
            callBack: function (refreshCode) {
                winui.window.msg(systemLanguage["com.skyeye.successfulOperation"][languageType], {icon: 1, time: 2000});
                loadTable();
            }});
    }

    // 删除
    function deletemember(data) {
        erpOrderUtil.deleteOrderMation(data.id, serviceClassName, function() {
            loadTable();
        });
    }
    
    // 详情
	function details(data) {
		rowId = data.id;
		_openNewWindows({
			url: "../../tpl/otherOutlets/otherOutletsDetails.html",
			title: systemLanguage["com.skyeye.detailsPageTitle"][languageType],
			pageId: "otherOutletsDetails",
			area: ['90vw', '90vh'],
			callBack: function (refreshCode) {
			}});
	}

    // 添加
    $("body").on("click", "#addBean", function() {
        _openNewWindows({
            url: "../../tpl/otherOutlets/otherOutletsAdd.html",
            title: systemLanguage["com.skyeye.addPageTitle"][languageType],
            pageId: "otherOutletsAdd",
            area: ['90vw', '90vh'],
            callBack: function (refreshCode) {
                winui.window.msg(systemLanguage["com.skyeye.successfulOperation"][languageType], {icon: 1, time: 2000});
                loadTable();
            }});
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

    // 导出excel
    $("body").on("click", "#downloadExcel", function () {
    	postDownLoadFile({
			url : flowableBasePath + 'otheroutlets005',
			params: getTableParams(),
			method : 'post'
		});
    });
    
    function getTableParams() {
        var startTime = "";
        var endTime = "";
        if (!isNull($("#operTime").val())) {
            startTime = $("#operTime").val().split('~')[0].trim() + ' 00:00:00';
            endTime = $("#operTime").val().split('~')[1].trim() + ' 23:59:59';
    	}
    	return {
    		defaultNumber: $("#defaultNumber").val(),
    		startTime: startTime,
    		endTime: endTime
    	};
    }

    exports('otherOutletsList', {});
});
