
// 员工考勤班次
var checkWorkTime = new Array();

layui.config({
    base: basePath,
    version: skyeyeVersion
}).extend({
    window: 'js/winui.window'
}).define(['window', 'jquery', 'winui', 'laydate', 'form'], function(exports) {
    winui.renderColor();
    var index = parent.layer.getFrameIndex(window.name);
    var $ = layui.$,
        form = layui.form,
        laydate = layui.laydate;
    var serviceClassName = sysServiceMation["checkWorkBusinessTrip"]["key"];
    var rowNum = 1; //表格的序号

    // 出差日期的初始化集合
    var businessTravelDayElem = new Array();
    var beanTemplate = $("#beanTemplate").html();
    var selOption = getFileContent('tpl/template/select-option.tpl');

    AjaxPostUtil.request({url: flowableBasePath + "checkworkbusinesstrip004", params: {rowId: parent.rowId}, type: 'json', method: 'GET', callback: function (mation) {
        $("#useTitle").html(mation.bean.title);
        $("#useName").html(mation.bean.userName);
        $("#remark").val(mation.bean.remark);
        $("#businessTripAddress").val(mation.bean.businessTripAddress);
        $("#businessTripReason").val(mation.bean.businessTripReason);
        // 附件回显
        skyeyeEnclosure.initTypeISData({'enclosureUpload': mation.bean.enclosureInfo});

        if(mation.bean.state == '1'){
            $(".typeTwo").removeClass("layui-hide");
        } else {
            $(".typeOne").removeClass("layui-hide");
        }
        // 获取当前登陆人的考勤班次
        checkWorkUtil.getCurrentUserCheckWorkTimeList(function (json) {
            $.each(json.rows, function (i, item) {
                checkWorkTime.push({
                    id: item.timeId,
                    name: item.title,
                    days: item.days,
                    startTime: item.startTime,
                    endTime: item.endTime,
                    restStartTime: item.restStartTime,
                    restEndTime: item.restEndTime,
                    type: item.type
                });
            });
            // 考勤班次变化
            form.on('select(timeId)', function (data) {
                var thisRowNum = data.elem.id.replace("timeId", "");
                var thisRowValue = data.value;
                $("#timeStartTime" + thisRowNum).html("");
                $("#timeEndTime" + thisRowNum).html("");
                $("#businessTravelHour" + thisRowNum).html("0");
                var timeMation = getInPoingArr(checkWorkTime, "id", thisRowValue);
                if (timeMation != null) {
                    businessTravelDayElem[thisRowNum].config.chooseDay = timeMation.days;
                    $("#timeStartTime" + thisRowNum).html(timeMation.startTime);
                    $("#timeEndTime" + thisRowNum).html(timeMation.endTime);
                    calcBusinessTravelHour(thisRowNum);
                } else {
                    businessTravelDayElem[thisRowNum].config.chooseDay = [];
                }
            });
            form.render();
            matchingLanguage();
            $.each(mation.bean.businessTripDay, function(i, item) {
                addRow();
                $("#timeId" + (rowNum - 1).toString()).val(item.timeId);
                $("#timeStartTime" + (rowNum - 1).toString()).html(item.timeStartTime);
                $("#timeEndTime" + (rowNum - 1).toString()).html(item.timeEndTime);
                $("#businessTravelDay" + (rowNum - 1).toString()).val(item.businessTravelDay);
                $("#businessTravelHour" + (rowNum - 1).toString()).html(item.businessTravelHour);
                $("#remark" + (rowNum - 1).toString()).val(item.remark);
                form.render('select');
                form.render('checkbox');
            });
        });
    }});

    // 保存为草稿
    form.on('submit(formEditBean)', function(data) {
        if(winui.verifyForm(data.elem)) {
            saveData('1', "");
        }
        return false;
    });

    // 提交审批
    form.on('submit(formSubBean)', function(data) {
        if(winui.verifyForm(data.elem)) {
            activitiUtil.startProcess(serviceClassName, null, function (approvalId) {
                saveData("2", approvalId);
            });
        }
        return false;
    });

    // 工作流中保存
    form.on('submit(subBean)', function(data) {
        if(winui.verifyForm(data.elem)) {
            saveData('3', "");
        }
        return false;
    });

    function saveData(subType, approvalId) {
        // 获取出差日期数据
        var rowTr = $("#beanTable tr");
        if(rowTr.length == 0) {
            winui.window.msg('请选择出差日期数据', {icon: 2, time: 2000});
            return false;
        }
        var tableData = new Array();
        var noError = false; //循环遍历表格数据时，是否有其他错误信息
        $.each(rowTr, function(i, item) {
            var rowNum = $(item).attr("trcusid").replace("tr", "");
            if(inTableDataArray($("#timeId" + rowNum).val(), $("#businessTravelDay" + rowNum).val(), tableData)){
                winui.window.msg('同一班次中不允许出现相同的出差日期.', {icon: 2, time: 2000});
                noError = true;
                return false;
            }
            var row = {
                timeId: $("#timeId" + rowNum).val(),
                timeStartTime: $("#timeStartTime" + rowNum).html(),
                timeEndTime: $("#timeEndTime" + rowNum).html(),
                businessTravelDay: $("#businessTravelDay" + rowNum).val(),
                businessTravelHour: $("#businessTravelHour" + rowNum).html(),
                remark: $("#remark" + rowNum).val()
            };
            tableData.push(row);
        });
        if(noError) {
            return false;
        }

        var params = {
            rowId: parent.rowId,
            title: $("#useTitle").html(),
            remark: $("#remark").val(),
            businessTripDayStr: JSON.stringify(tableData),
            subType: subType,
            enclosureInfo: skyeyeEnclosure.getEnclosureIdsByBoxId('enclosureUpload'),
            businessTripAddress: $("#businessTripAddress").val(),
            businessTripReason: $("#businessTripReason").val(),
            subType: subType, // 1：保存为草稿  2.提交到工作流  3.在工作流中编辑
            approvalId: approvalId,
        };
        AjaxPostUtil.request({url: flowableBasePath + "checkworkbusinesstrip005", params: params, type: 'json', method: 'PUT',  callback: function(json) {
            parent.layer.close(index);
            parent.refreshCode = '0';
        }});
    }

    // 判断选中的出差日期是否也在数组中
    function inTableDataArray(timeId, businessTravelDay, array) {
        var isIn = false;
        $.each(array, function(i, item) {
            if(item.timeId === timeId && item.businessTravelDay === businessTravelDay) {
                isIn = true;
                return false;
            }
        });
        return isIn;
    }

    // 新增行
    $("body").on("click", "#addRow", function() {
        addRow();
    });

    // 删除行
    $("body").on("click", "#deleteRow", function() {
        deleteRow();
    });

    // 新增行
    function addRow() {
        var par = {
            id: "row" + rowNum.toString(), //checkbox的id
            trId: "tr" + rowNum.toString(), //行的id
            timeId: "timeId" + rowNum.toString(), //班次id
            timeStartTime: "timeStartTime" + rowNum.toString(), //打卡开始时间id
            timeEndTime: "timeEndTime" + rowNum.toString(), //打卡结束时间id
            businessTravelDay: "businessTravelDay" + rowNum.toString(), //出差日期id
            businessTravelHour: "businessTravelHour" + rowNum.toString(), //出差小时id
            remark: "remark" + rowNum.toString() //备注id
        };
        $("#beanTable").append(getDataUseHandlebars(beanTemplate, par));
        $("#timeId" + rowNum.toString()).html(getDataUseHandlebars(selOption, {rows: checkWorkTime}));
        businessTravelDayElem[rowNum.toString()] = laydate.render({
            elem: '#businessTravelDay' + rowNum.toString(),
            calendar: true,
            min: getThirdDayToDate()
        });
        form.render('select');
        form.render('checkbox');
        rowNum++;
    }

    // 删除行
    function deleteRow() {
        var checkRow = $("#beanTable input[type='checkbox'][name='tableCheckRow']:checked");
        if(checkRow.length > 0) {
            $.each(checkRow, function(i, item) {
                $(item).parent().parent().remove();
            });
        } else {
            winui.window.msg('请选择要删除的行', {icon: 2, time: 2000});
        }
    }

    /**
     * 计算出差工时
     *
     * @param num 表格的序号
     */
    function calcBusinessTravelHour(num){
        var startTime = $("#timeStartTime" + num).html();
        var endTime = $("#timeEndTime" + num).html();
        if (!isNull(startTime) && !isNull(endTime)){
            var timeId = $("#timeId" + num).val();
            if (!isNull(timeId)){
                var hour = "0";
                var timeMation = getInPoingArr(checkWorkTime, "id", timeId);
                startTime = startTime + ":00";
                endTime = endTime + ":00";
                // 作息时间是否为空
                if (!isNull(timeMation.restStartTime) && !isNull(timeMation.restEndTime)){
                    var restStartTime = timeMation.restStartTime + ":00";
                    var restEndTime = timeMation.restEndTime + ":00";
                    if(compare_HHmmss(restStartTime, endTime) || compare_HHmmss(startTime, restEndTime)){
                        // 出差结束时间比作息开始时间小或者出差开始时间比作息结束时间大，说明没有与作息时间重合的时间
                        hour = division(timeDifference(startTime, endTime), 60);
                    } else {
                        var overlapTime = getOverlapTime(startTime, endTime, restStartTime, restEndTime);
                        // 时间计算为：选择的出差时间时间减去与作息时间重复的时间段
                        hour = division(subtraction(timeDifference(startTime, endTime), timeDifference(overlapTime[0], overlapTime[1])), 60);
                    }
                } else {
                    hour = division(timeDifference(startTime, endTime), 60);
                }
                $("#businessTravelHour" + num).html(hour);
            }
        }
    }

    $("body").on("click", "#cancle", function() {
        parent.layer.close(index);
    });
});