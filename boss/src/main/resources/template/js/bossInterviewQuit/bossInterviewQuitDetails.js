layui.config({
    base: basePath,
    version: skyeyeVersion
}).extend({
    window: 'js/winui.window'
}).define(['window', 'jquery', 'winui'], function (exports) {
    winui.renderColor();
    layui.use(['form'], function (form) {
        var $ = layui.$;

        showGrid({
            id: "showForm",
            url: flowableBasePath + "queryBossInterviewQuitDetailsById",
            params: {id: parent.rowId},
            pagination: false,
            method: "GET",
            template: $("#beanTemplate").html(),
            ajaxSendLoadBefore: function(hdb, json){
                json.bean.remark = stringManipulation.textAreaShow(json.bean.remark);
                json.bean.leaveTypeName = bossUtil.getLeaveTypeNameById(json.bean.leaveType);
            },
            ajaxSendAfter: function (json) {
                // 附件回显
                skyeyeEnclosure.showDetails({'enclosureUpload': json.bean.enclosureInfo});
                matchingLanguage();
            }
        });

    });
});