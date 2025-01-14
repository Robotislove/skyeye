
layui.config({
	base: basePath, 
	version: skyeyeVersion
}).extend({
    window: 'js/winui.window'
}).define(['window', 'table', 'jquery', 'winui', 'fileUpload', 'swiper'], function (exports) {
	winui.renderColor();
	layui.use(['form', 'codemirror', 'xml', 'clike', 'css', 'htmlmixed', 'javascript', 'nginx', 'solr', 'sql', 'vue'], function (form) {
		var index = parent.layer.getFrameIndex(window.name);
	    var $ = layui.$,
	    	form = layui.form;
	    var htmlContent, htmlJsContent, wxmlContent, wxmlJsDataContent, wxmlJsMethodContent, wxmlJsMethodCreateContent;
	    
	    showGrid({
		 	id: "showForm",
		 	url: sysMainMation.rmprogramBasePath + "rmxcx020",
		 	params: {rowId: parent.rowId},
		 	pagination: false,
		 	template: getFileContent('tpl/rmgroupmember/rmgroupmembereditTemplate.tpl'),
		 	ajaxSendLoadBefore: function(hdb) {
		 	},
		 	ajaxSendAfter:function (json) {
				// 初始化上传
				$("#printsPicUrl").upload(systemCommonUtil.uploadCommon003Config('printsPicUrl', 1, json.bean.printsPicUrl, 1));

		 		htmlContent = CodeMirror.fromTextArea(document.getElementById("htmlContent"), {
		            mode : "xml",  // 模式
		            theme : "eclipse",  // CSS样式选择
		            indentUnit : 4,  // 缩进单位，默认2
		            smartIndent : true,  // 是否智能缩进
		            tabSize : 4,  // Tab缩进，默认4
		            readOnly : false,  // 是否只读，默认false
		            showCursorWhenSelecting : true,
		            lineNumbers : true,  // 是否显示行号
		            styleActiveLine: true, //line选择是是否加亮
		            matchBrackets: true,
		        });
		 		
		 		htmlJsContent = CodeMirror.fromTextArea(document.getElementById("htmlJsContent"), {
		            mode : "text/javascript",  // 模式
		            theme : "eclipse",  // CSS样式选择
		            indentUnit : 4,  // 缩进单位，默认2
		            smartIndent : true,  // 是否智能缩进
		            tabSize : 4,  // Tab缩进，默认4
		            readOnly : false,  // 是否只读，默认false
		            showCursorWhenSelecting : true,
		            lineNumbers : true,  // 是否显示行号
		            styleActiveLine: true, //line选择是是否加亮
		            matchBrackets: true,
		        });
		 		
		 		wxmlContent = CodeMirror.fromTextArea(document.getElementById("wxmlContent"), {
		            mode : "xml",  // 模式
		            theme : "eclipse",  // CSS样式选择
		            indentUnit : 4,  // 缩进单位，默认2
		            smartIndent : true,  // 是否智能缩进
		            tabSize : 4,  // Tab缩进，默认4
		            readOnly : false,  // 是否只读，默认false
		            showCursorWhenSelecting : true,
		            lineNumbers : true,  // 是否显示行号
		            styleActiveLine: true, //line选择是是否加亮
		            matchBrackets: true,
		        });
		 		
		 		wxmlJsDataContent = CodeMirror.fromTextArea(document.getElementById("wxmlJsDataContent"), {
		            mode : "text/javascript",  // 模式
		            theme : "eclipse",  // CSS样式选择
		            indentUnit : 4,  // 缩进单位，默认2
		            smartIndent : true,  // 是否智能缩进
		            tabSize : 4,  // Tab缩进，默认4
		            readOnly : false,  // 是否只读，默认false
		            showCursorWhenSelecting : true,
		            lineNumbers : true,  // 是否显示行号
		            styleActiveLine: true, //line选择是是否加亮
		            matchBrackets: true,
		        });
		 		
		 		wxmlJsMethodContent = CodeMirror.fromTextArea(document.getElementById("wxmlJsMethodContent"), {
		            mode : "text/javascript",  // 模式
		            theme : "eclipse",  // CSS样式选择
		            indentUnit : 4,  // 缩进单位，默认2
		            smartIndent : true,  // 是否智能缩进
		            tabSize : 4,  // Tab缩进，默认4
		            readOnly : false,  // 是否只读，默认false
		            showCursorWhenSelecting : true,
		            lineNumbers : true,  // 是否显示行号
		            styleActiveLine: true, //line选择是是否加亮
		            matchBrackets: true,
		        });
		 		
		 		wxmlJsMethodCreateContent = CodeMirror.fromTextArea(document.getElementById("wxmlJsMethodCreateContent"), {
		            mode : "text/javascript",  // 模式
		            theme : "eclipse",  // CSS样式选择
		            indentUnit : 4,  // 缩进单位，默认2
		            smartIndent : true,  // 是否智能缩进
		            tabSize : 4,  // Tab缩进，默认4
		            readOnly : false,  // 是否只读，默认false
		            showCursorWhenSelecting : true,
		            lineNumbers : true,  // 是否显示行号
		            styleActiveLine: true, //line选择是是否加亮
		            matchBrackets: true,
		        });
		 		
		 		matchingLanguage();
		 		form.render();
			    form.on('submit(formEditBean)', function (data) {
			        if (winui.verifyForm(data.elem)) {
			        	if(isNull(htmlContent.getValue())){
		        			winui.window.msg("请填写HTML内容", {icon: 2, time: 2000});
		        		} else if (isNull(wxmlContent.getValue())){
		        			winui.window.msg("请填写WXML内容", {icon: 2, time: 2000});
		        		} else {
			 	   			var params = {
			 	   				htmlContent: encodeURI(htmlContent.getValue().replace(/\+/g, "%2B").replace(/\&/g, "%26")),
			 	   				htmlJsContent: encodeURI(htmlJsContent.getValue().replace(/\+/g, "%2B").replace(/\&/g, "%26")),
			 	   				wxmlContent: encodeURI(wxmlContent.getValue().replace(/\+/g, "%2B").replace(/\&/g, "%26")),
				 	   			wxmlJsDataContent: encodeURI(wxmlJsDataContent.getValue().replace(/\+/g, "%2B").replace(/\&/g, "%26")),
								wxmlJsMethodContent: encodeURI(wxmlJsMethodContent.getValue().replace(/\+/g, "%2B").replace(/\&/g, "%26")),
								wxmlJsMethodCreateContent: encodeURI(wxmlJsMethodCreateContent.getValue().replace(/\+/g, "%2B").replace(/\&/g, "%26")),
			        			rowId: parent.rowId,
				        	};
			 	   			
			 	   			params.img = $("#printsPicUrl").find("input[type='hidden'][name='upload']").attr("oldurl");
			 	   			
				        	AjaxPostUtil.request({url: sysMainMation.rmprogramBasePath + "rmxcx021", params: params, type: 'json', callback: function (json) {
								parent.layer.close(index);
								parent.refreshCode = '0';
				 	   		}});
		        		}
			        }
			        return false;
			    });
		 	}
	    });
	    
	    //HTML内容变化事件
	    htmlContent.on("change",function(){
	    	$("#printPic").html(htmlContent.getValue());
	    	$("#htmlJsContentScript").html('<script>layui.define(["jquery"], function(exports) {var jQuery = layui.jquery;(function($) {' + htmlJsContent.getValue() + '})(jQuery);});</script>');
		});
	    
	    //HTML-JS内容变化事件
	    htmlJsContent.on("change",function(){
	    	$("#printPic").html(htmlContent.getValue());
	    	$("#htmlJsContentScript").html('<script>layui.define(["jquery"], function(exports) {var jQuery = layui.jquery;(function($) {' + htmlJsContent.getValue() + '})(jQuery);});</script>');
		});
	    
	    // 取消
	    $("body").on("click", "#cancle", function() {
	    	parent.layer.close(index);
	    });
	    
	});
	    
});