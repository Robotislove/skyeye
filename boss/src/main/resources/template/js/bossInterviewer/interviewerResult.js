
layui.config({
    base: basePath,
    version: skyeyeVersion
}).extend({
    window: 'js/winui.window'
}).define(['window', 'jquery', 'winui', 'form'], function(exports) {
    winui.renderColor();
    var index = parent.layer.getFrameIndex(window.name);
    var $ = layui.$,
        form = layui.form;

    showGrid({
        id: "showForm",
        url: flowableBasePath + "queryBossInterviewArrangementById",
        params: {id: parent.rowId},
        pagination: false,
        method: "GET",
        template: $("#beanTemplate").html(),
        ajaxSendLoadBefore: function(hdb, json){
            json.bean.basicResume = stringManipulation.textAreaShow(json.bean.basicResume);
            json.bean.stateName = bossUtil.showStateName(json.bean.state);
        },
        ajaxSendAfter: function (json) {
            skyeyeEnclosure.showDetails({'enclosureUpload': json.bean.enclosureInfo});

            matchingLanguage();
            form.render();
            // 提交
            form.on('submit(formSubBean)', function(data) {
                if(winui.verifyForm(data.elem)) {
                    var params = {
                        id: parent.rowId,
                        state: $("input[name='state']:checked").val(),
                        evaluation: $("#evaluation").val()
                    };
                    AjaxPostUtil.request({url: flowableBasePath + "setBossInterviewResult", params: params, type: 'json', method: "PUT", callback: function(json) {
                        parent.layer.close(index);
                        parent.refreshCode = '0';
                    }});
                }
                return false;
            });

        }
    });

});