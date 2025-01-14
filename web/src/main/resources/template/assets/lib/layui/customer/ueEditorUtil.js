var ueEditorUtil = {

    ueEditorMap: {},

    initEditor: function (id) {
        ueEditorUtil.ueEditorMap[id] = UE.getEditor(id, {
            initialFrameWidth: '100%', //初始化编辑器宽度,默认1000
            initialFrameHeight: 800,
            maximumWords: 100000,
            autoHeightEnabled: false, // 禁止自动增高，改用滚动条
            enableAutoSave: false, // 自动保存
        });
        if (ueEditorUtil.ueEditorMap.length == 1) {
            UE.Editor.prototype._bkGetActionUrl = UE.Editor.prototype.getActionUrl;
            UE.Editor.prototype.getActionUrl = function (action) {
                if (action == 'uploadimage' || action == 'uploadfile' || action == 'uploadvideo' || action == 'uploadimage') {//上传单个图片,上传附件,上传视频,多图上传
                    return reqBasePath + '/upload/editUploadController/uploadContentPic';
                } else if (action == 'listimage') {
                    return reqBasePath + '/upload/editUploadController/downloadContentPic';
                } else {
                    return this._bkGetActionUrl.call(this, action);
                }
            };
        }
        return ueEditorUtil.ueEditorMap[id];
    },

};