
// 客户工具类
var sysCustomerUtil = {

    /**
     * 已经选的的客户信息
     */
    customerMation: {},

    /**
     * 客户选择页面
     *
     * @param callback 回调函数
     */
    openSysCustomerChoosePage: function (callback){
        _openNewWindows({
            url: "../../tpl/customermanage/customerChoose.html",
            title: "客户选择",
            pageId: "customerChoose",
            area: ['90vw', '90vh'],
            callBack: function(refreshCode){
                if (refreshCode == '0') {
                    if(typeof(callback) == "function") {
                        callback(sysCustomerUtil.customerMation);
                    }
                } else if (refreshCode == '-9999') {
                    winui.window.msg(systemLanguage["com.skyeye.operationFailed"][languageType], {icon: 2,time: 2000});
                }
            }});
    },

    /**
     * 获取客户类型状态为上线的所有记录
     *
     * @param callback 回执函数
     */
    queryCustomerTypeIsUpList: function (callback){
        AjaxPostUtil.request({url: flowableBasePath + "customertype008", params: {}, type: 'json', method: "GET", callback: function(json) {
            if(json.returnCode == 0) {
                if(typeof(callback) == "function") {
                    callback(json);
                }
            } else {
                winui.window.msg(json.returnMessage, {icon: 2, time: 2000});
            }
        }, async: false});
    },

    /**
     * 获取已上线的客户来源类型
     *
     * @param callback 回执函数
     */
    queryCustomerFromIsUpList: function (callback){
        AjaxPostUtil.request({url: flowableBasePath + "crmcustomerfrom008", params: {}, type: 'json', method: "GET", callback: function(json) {
            if(json.returnCode == 0) {
                if(typeof(callback) == "function") {
                    callback(json);
                }
            } else {
                winui.window.msg(json.returnMessage, {icon: 2, time: 2000});
            }
        }, async: false});
    },

}