
var rowId = "";

layui.config({
    base: basePath,
    version: skyeyeVersion
}).extend({
    window: 'js/winui.window'
}).define(['window', 'table', 'jquery', 'winui', 'form', 'laydate', 'soulTable'], function (exports) {
    winui.renderColor();
    var $ = layui.$,
        form = layui.form,
        laydate = layui.laydate,
        soulTable = layui.soulTable,
        table = layui.table;
    var serviceClassName = sysServiceMation["purchaseOrder"]["key"];
    authBtn('1571812723211');//新增
    authBtn('1571986566776');//导出
        
    laydate.render({elem: '#operTime', range: '~'});
        
    table.render({
        id: 'messageTable',
        elem: '#messageTable',
        method: 'post',
        url: flowableBasePath + 'purchaseorder001',
        where: getTableParams(),
        even: true,
        page: true,
        limits: getLimits(),
	    limit: getLimit(),
        overflow: {
            type: 'tips',
            hoverTime: 300, // 悬停时间，单位ms, 悬停 hoverTime 后才会显示，默认为 0
            minWidth: 150, // 最小宽度
            maxWidth: 500 // 最大宽度
        },
        cols: [[
            { title: systemLanguage["com.skyeye.serialNumber"][languageType], rowspan: '2', type: 'numbers' },
            { field: 'defaultNumber', title: '单据编号', rowspan: '2', align: 'left', width: 200, templet: function (d) {
		        return '<a lay-event="details" class="notice-title-click">' + d.defaultNumber + '</a>';
		    }},
            { field: 'supplierName', title: '供应商', rowspan: '2', align: 'left', width: 150 },
            { title: '审批模式', align: 'center', colspan: '2'},
            { field: 'state', title: '状态', rowspan: '2', align: 'left', width: 80, templet: function (d) {
                return activitiUtil.showStateName(d.state, d.submitType);
		    }},
            { field: 'totalPrice', title: '合计金额', rowspan: '2', align: 'left', width: 120},
            { field: 'operPersonName', title: '操作人', rowspan: '2', align: 'left', width: 120},
            { field: 'operTime', title: '单据日期', rowspan: '2', align: 'center', width: 140 },
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
	    	soulTable.render(this);
        }
    });

    table.on('tool(messageTable)', function (obj) {
        var data = obj.data;
        var layEvent = obj.event;
        if (layEvent === 'delete') { //删除
            deleteOrder(data);
        } else if (layEvent === 'details') { //详情
        	details(data);
        } else if (layEvent === 'edit') { //编辑
        	edit(data);
        } else if (layEvent === 'submitToSave') { //提交
            subExamine(data);
        } else if (layEvent === 'subExamine') { //提交审核
        	subExamine(data);
        } else if (layEvent === 'turnPurchase') { //转采购入库单
        	turnPurchase(data);
        } else if (layEvent === 'activitiProcessDetails') { // 工作流流程详情查看
            activitiUtil.activitiDetails(data);
        } else if (layEvent === 'revoke') { //撤销
            erpOrderUtil.revokeOrderMation(data.processInstanceId, serviceClassName, function() {
                loadTable();
            });
        }
    });

    //编辑
    function edit(data) {
        rowId = data.id;
        _openNewWindows({
            url: "../../tpl/purchaseOrder/purchaseOrderEdit.html",
            title: systemLanguage["com.skyeye.editPageTitle"][languageType],
            pageId: "purchaseOrderEdit",
            area: ['90vw', '90vh'],
            callBack: function (refreshCode) {
                winui.window.msg(systemLanguage["com.skyeye.successfulOperation"][languageType], {icon: 1, time: 2000});
                loadTable();
            }});
    }

    // 删除
    function deleteOrder(data) {
        erpOrderUtil.deleteOrderMation(data.id, serviceClassName, function() {
            loadTable();
        });
    }
    
    // 详情
	function details(data) {
		rowId = data.id;
		_openNewWindows({
			url: "../../tpl/purchaseOrder/purchaseOrderDetails.html",
			title: systemLanguage["com.skyeye.detailsPageTitle"][languageType],
			pageId: "purchaseOrderDetails",
			area: ['90vw', '90vh'],
			callBack: function (refreshCode) {
			}});
	}

    // 提交数据
	function subExamine(data) {
        erpOrderUtil.submitOrderMation(data.id, serviceClassName, data.submitType, serviceClassName, function() {
            loadTable();
        });
    }
    
    // 转采购入库
	function turnPurchase(data) {
		rowId = data.id;
		_openNewWindows({
			url: "../../tpl/purchaseOrder/purchaseOrderToPut.html",
			title: "转采购入库",
			pageId: "purchaseOrderToPut",
			area: ['90vw', '90vh'],
			callBack: function (refreshCode) {
                winui.window.msg(systemLanguage["com.skyeye.successfulOperation"][languageType], {icon: 1, time: 2000});
                loadTable();
			}});
    }

    // 添加
    $("body").on("click", "#addBean", function() {
        _openNewWindows({
            url: "../../tpl/purchaseOrder/purchaseOrderAdd.html",
            title: systemLanguage["com.skyeye.addPageTitle"][languageType],
            pageId: "purchaseOrderAdd",
            area: ['90vw', '90vh'],
            callBack: function (refreshCode) {
                winui.window.msg(systemLanguage["com.skyeye.successfulOperation"][languageType], {icon: 1, time: 2000});
                loadTable();
            }});
    });

    // 搜索表单
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
    
    // 导出excel
    $("body").on("click", "#downloadExcel", function () {
    	postDownLoadFile({
			url : flowableBasePath + 'purchaseorder010',
			params: getTableParams(),
			method : 'post'
		});
    });

    exports('purchaseOrderList', {});
});
