layui.config({
	base: basePath, 
	version: skyeyeVersion
}).extend({
    window: 'js/winui.window'
}).define(['window', 'jquery', 'winui', 'codemirror', 'xml', 'clike', 'css', 'htmlmixed', 'javascript', 'nginx', 'solr', 'sql', 'vue'], function (exports) {
	winui.renderColor();
	layui.use(['form'], function (form) {
		var index = parent.layer.getFrameIndex(window.name);
	    var $ = layui.$,
	    	form = layui.form;
	    var htmlModelContent, jsModelContent, htmlContent, jsContent, jsRelyOnContent;
	    
		showGrid({
		 	id: "showForm",
		 	url: sysMainMation.rmprogramBasePath + "rmproperty004",
		 	params: {rowId: parent.rowId},
		 	pagination: false,
		 	template: getFileContent('tpl/rmproperty/rmpropertyeditTemplate.tpl'),
		 	ajaxSendLoadBefore: function(hdb) {
		 	},
		 	ajaxSendAfter:function (json) {
		 		
		 		htmlModelContent = CodeMirror.fromTextArea(document.getElementById("htmlModelContent"), {
		            mode : "xml",  // 模式
		            theme : "eclipse",  // CSS样式选择
		            indentUnit : 4,  // 缩进单位，默认2
		            smartIndent : true,  // 是否智能缩进
		            tabSize : 4,  // Tab缩进，默认4
		            readOnly : true,  // 是否只读，默认false
		            showCursorWhenSelecting : true,
		            lineNumbers : true,  // 是否显示行号
		            styleActiveLine: true, //line选择是是否加亮
		            matchBrackets: true,
		        });
		      	
		      	jsModelContent = CodeMirror.fromTextArea(document.getElementById("jsModelContent"), {
		            mode : "text/javascript",  // 模式
		            theme : "eclipse",  // CSS样式选择
		            indentUnit : 4,  // 缩进单位，默认2
		            smartIndent : true,  // 是否智能缩进
		            tabSize : 4,  // Tab缩进，默认4
		            readOnly : true,  // 是否只读，默认false
		            showCursorWhenSelecting : true,
		            lineNumbers : true,  // 是否显示行号
		            styleActiveLine: true, //line选择是是否加亮
		            matchBrackets: true,
		        });
		      	
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
		      	
		      	jsContent = CodeMirror.fromTextArea(document.getElementById("jsContent"), {
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
		      	
		      	jsRelyOnContent = CodeMirror.fromTextArea(document.getElementById("jsRelyOnContent"), {
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
		      	
		      	$("input:radio[name=propertyOut][value=" + json.bean.propertyOut + "]").prop("checked", true);
		      	$("input:radio[name=selChildData][value=" + json.bean.selChildData + "]").prop("checked", true);
		      	
		      	if(json.bean.selChildData == '1'){//是
		      		$("#dataShowModel").show();
		      		showGrid({
		    		 	id: "displayTemplateId",
		    		 	url: flowableBasePath + "dsformdisplaytemplate006",
		    		 	params: {},
		    		 	pagination: false,
						method: 'GET',
		    		 	template: getFileContent('tpl/template/select-option.tpl'),
		    		 	ajaxSendLoadBefore: function(hdb) {
		    		 	},
		    		 	ajaxSendAfter:function(json1){
		    		 		$("#displayTemplateId").val(json.bean.displayTemplateId);
		    		 		form.render('select');
		    		 	}
		    		});
		      	} else {
		      		$("#dataShowModel").hide();
		      	}
		 		
		 		//子查询变化
		 		form.on('radio(selChildData)', function (data) {
		 			var val = data.value;
			    	if(val == '1'){//是
			    		$("#dataShowModel").show();
			    		showGrid({
			    		 	id: "displayTemplateId",
			    		 	url: flowableBasePath + "dsformdisplaytemplate006",
			    		 	params: {},
			    		 	pagination: false,
							method: 'GET',
			    		 	template: getFileContent('tpl/template/select-option.tpl'),
			    		 	ajaxSendLoadBefore: function(hdb) {
			    		 	},
			    		 	ajaxSendAfter:function (json) {
			    		 		form.render('select');
			    		 	}
			    		});
			    	} else if (val == '2'){//否
			    		$("#dataShowModel").hide();
			    	} else {
			    		winui.window.msg('状态值错误', {icon: 2, time: 2000});
			    	}
		        });
		 		
		        matchingLanguage();
		 		form.render();
		 		
		 		//展现形式
		      	showGrid({
		    	 	id: "dsFormContentId",
		    	 	url: reqBasePath + "queryAllDsFormComponentList",
		    	 	params: {},
		    	 	pagination: false,
					method: 'GET',
		    	 	template: getFileContent('tpl/template/select-option.tpl'),
		    	 	ajaxSendLoadBefore: function(hdb) {
		    	 	},
		    	 	ajaxSendAfter:function(data) {
		    	 		$("#dsFormContentId").val(json.bean.dsFormContentId);
		    	 		form.render('select');
		    	 	}
		        });

				// 根据类型获取部分功能的使用说明
				systemCommonUtil.queryExplainMationByType(4, function (json) {
					$("#exexplaintormpropertyTitle").html(json.bean.title);
					$("#exexplaintormpropertyContent").html(json.bean.content);
				});

              	form.on('select(selectParent)', function(data) {
              		AjaxPostUtil.request({url: flowableBasePath + "queryDsFormContentMationById", params: {id: data.value}, type: 'json', method: 'GET', callback: function (json) {
						htmlModelContent.setValue(json.bean.htmlContent);
						jsModelContent.setValue(json.bean.jsContent);
						htmlContent.setValue(json.bean.htmlContent);
						jsContent.setValue(json.bean.jsContent);
            		}});
				});
		 		
		 		form.on('submit(formEditBean)', function (data) {
			        if (winui.verifyForm(data.elem)) {
			        	var params = {
		        			title: $("#title").val(),
		        			propertyTag: $("#propertyTag").val(),
		        			propertyUnit: encodeURI($("#propertyUnit").val()),
		        			dsFormContentId: $("#dsFormContentId").val(),
		        			propertyOut:data.field.propertyOut,
		        			selChildData:data.field.selChildData,
		        			htmlContent: encodeURI(htmlContent.getValue().replace(/\+/g, "%2B").replace(/\&/g, "%26")),
		        			jsContent: encodeURI(jsContent.getValue().replace(/\+/g, "%2B").replace(/\&/g, "%26")),
		        			jsRelyOn: encodeURI(jsRelyOnContent.getValue().replace(/\+/g, "%2B").replace(/\&/g, "%26")),
		        			rowId:parent.rowId
			        	};
			        	if (data.field.selChildData == '1'){
			        		if(isNull($("#displayTemplateId").val())) {
			        			winui.window.msg('请选择子查询数据展示模板', {icon: 2, time: 2000});
			        			return false;
			        		} else {
			        			params.displayTemplateId = $("#displayTemplateId").val();
			        		}
			        	} else {
			        		params.displayTemplateId = "";
			        	}
			        	
			        	AjaxPostUtil.request({url: sysMainMation.rmprogramBasePath + "rmproperty005", params: params, type: 'json', callback: function (json) {
							parent.layer.close(index);
							parent.refreshCode = '0';
			 	   		}});
			        }
			        return false;
			    });
		 		
		 	}
	    });
		
	    // 取消
	    $("body").on("click", "#cancle", function() {
	    	parent.layer.close(index);
	    });
	    
	});
	    
});