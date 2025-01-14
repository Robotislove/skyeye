
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
    openSysCustomerChoosePage: function (callback) {
        _openNewWindows({
            url: "../../tpl/customerManage/customerChoose.html",
            title: "选择客户",
            pageId: "customerChoose",
            area: ['90vw', '90vh'],
            callBack: function (refreshCode) {
                if(typeof(callback) == "function") {
                    callback(sysCustomerUtil.customerMation);
                }
            }});
    },

}