
// 表格的序号
var rowNum = 1;

layui.config({
    base: basePath,
    version: skyeyeVersion
}).extend({
    window: 'js/winui.window'
}).define(['window', 'table', 'jquery', 'winui', 'textool', 'fileUpload'], function (exports) {
    winui.renderColor();
    layui.use(['form'], function (form) {
        var index = parent.layer.getFrameIndex(window.name);
        var $ = layui.$,
        	textool = layui.textool;
        var usetableTemplate = $("#usetableTemplate").html();

        showGrid({
            id: "showForm",
            url: shopBasePath + "meal003",
            params: {rowId: parent.rowId},
            pagination: false,
            method: "GET",
            template: $("#beanTemplate").html(),
            ajaxSendLoadBefore: function(hdb) {},
            ajaxSendAfter:function(data) {

                $("input:radio[name=type][value=" + data.bean.type + "]").attr("checked", true);
                $("input:radio[name=state][value=" + data.bean.state + "]").attr("checked", true);

                textool.init({eleId: 'mealExplain', maxlength: 500});

                // 初始化上传
                $("#logo").upload(systemCommonUtil.uploadCommon003Config('logo', 22, data.bean.logo, 1));

                if (!isNull(data.bean.mealConsumeMationList)){
                    $.each(data.bean.mealConsumeMationList, function(i, item) {
                        addRow();
                        $("#consumeExplain" + (rowNum - 1)).val(item.consumeExplain);
                    });
                }

                // 加载当前登陆用户所属的区域列表
                shopUtil.queryStaffBelongAreaList(function (json){
                    $("#areaMation").html(getDataUseHandlebars(getFileContent('tpl/template/checkbox-property.tpl'), json));
                    $.each(data.bean.mealAreaMationList, function(i, item) {
                        $("input:checkbox[name=limitrequire][rowId=" + item.areaId + "]").attr("checked", true);
                    });
                });

			    matchingLanguage();
                form.render();
                form.on('submit(formEditBean)', function (data) {
                    if (winui.verifyForm(data.elem)) {
                        var tableData = new Array();
                        $.each($("#useTable tr"), function(i, item) {
                            // 获取行编号
                            var rowNum = $(item).attr("trcusid").replace("tr", "");
                            var row = {
                                consumeExplain: $("#consumeExplain" + rowNum).val(),
                            };
                            tableData.push(row);
                        });

                        var mealAreaMationList = new Array();
                        $.each($('#areaMation input:checkbox:checked'),function(){
                            mealAreaMationList.push({
                                areaId: $(this).attr("rowId")
                            });
                        });

                        var params = {
                            title: $("#title").val(),
                            logo: $("#logo").find("input[type='hidden'][name='upload']").attr("oldurl"),
                            type: $("input[name='type']:checked").val(),
                            price: $("#price").val(),
                            showPrice: $("#showPrice").val(),
                            lowPrice: $("#lowPrice").val(),
                            mealNum: $("#mealNum").val(),
                            mealExplain: $("#mealExplain").val(),
                            state: $("input[name='state']:checked").val(),
                            mealAreaMationList: JSON.stringify(mealAreaMationList),
                            mealConsumeMationList: JSON.stringify(tableData),
                            id: parent.rowId
                        };
                        if(isNull(params.logo)){
                            winui.window.msg('请上传套餐LOGO', {icon: 2, time: 2000});
                            return false;
                        }
                        AjaxPostUtil.request({url: shopBasePath + "meal005", params: params, type: 'json', method: "PUT", callback: function (json) {
                            parent.layer.close(index);
                            parent.refreshCode = '0';
                        }, async: true});
                    }
                    return false;
                });
            }
        });

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
                consumeExplain: "consumeExplain" + rowNum.toString(), // 耗材说明id
            };
            $("#useTable").append(getDataUseHandlebars(usetableTemplate, par));
            form.render();
            rowNum++;
        }

        // 删除行
        function deleteRow() {
            var checkRow = $("#useTable input[type='checkbox'][name='tableCheckRow']:checked");
            if(checkRow.length > 0) {
                $.each(checkRow, function(i, item) {
                    // 移除界面上的信息
                    $(item).parent().parent().remove();
                });
            } else {
                winui.window.msg('请选择要删除的行', {icon: 2, time: 2000});
            }
        }

        $("body").on("click", "#cancle", function() {
            parent.layer.close(index);
        });
    });
});