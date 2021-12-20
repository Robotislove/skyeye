
// 财务模块工具类
var sysIfsUtil = {

    /**
     * 已经选择的会计科目信息
     */
    chooseAccountSubjectMation: {},

    /**
     * 会计科目选择页面
     *
     * @param callback 回调函数
     */
    openSysAccountSubjectChoosePage: function (callback){
        _openNewWindows({
            url: "../../tpl/ifsAccountSubject/ifsAccountSubjectListChoose.html",
            title: "会计科目选择",
            pageId: "ifsAccountSubjectListChoose",
            area: ['90vw', '90vh'],
            callBack: function(refreshCode){
                if (refreshCode == '0') {
                    if(typeof(callback) == "function") {
                        callback(sysIfsUtil.chooseAccountSubjectMation);
                    }
                } else if (refreshCode == '-9999') {
                    winui.window.msg(systemLanguage["com.skyeye.operationFailed"][languageType], {icon: 2,time: 2000});
                }
            }});
    },

}