
layui.config({
    base: basePath,
    version: skyeyeVersion
}).extend({
    window: 'js/winui.window'
}).define(['window', 'jquery', 'winui'], function (exports) {
    winui.renderColor();
    layui.use(['form'], function (form) {
        var index = parent.layer.getFrameIndex(window.name);
        var $ = layui.$;

        reportModelTypeUtil.showModelTypeOperator(form, "typeBox", null, null);

        matchingLanguage();
        form.render();
        form.on('submit(formAddBean)', function (data) {
            if (winui.verifyForm(data.elem)) {
                var params = {
                    fileName: $("#fileName").val(),
                    modelId: $("#modelId").val(),
                    firstTypeId: $("#firstTypeId").val(),
                    secondTypeId: $("#secondTypeId").val(),
                };
                AjaxPostUtil.request({url: reportBasePath + "reportimportmodel002", params: params, type: 'json', method: "POST", callback: function(json) {
                    parent.layer.close(index);
                    parent.refreshCode = '0';
                }});
            }
            return false;
        });

        $("body").on("click", "#cancle", function() {
            parent.layer.close(index);
        });
    });
});