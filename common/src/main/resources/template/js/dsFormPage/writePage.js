
layui.config({
	base: basePath, 
	version: skyeyeVersion
}).extend({
    window: 'js/winui.window'
}).define(['window', 'jquery', 'winui', 'form'], function (exports) {
	winui.renderColor();
	var index = parent.layer.getFrameIndex(window.name);
	var $ = layui.$,
		form = layui.form;
	var selOption = getFileContent('tpl/template/select-option.tpl');
	var pageHtml = {
		'simpleTable': `<div class="layui-form-item layui-col-xs6">
							<label class="layui-form-label">是否分页<i class="red">*</i></label>
							<div class="layui-input-block" id="isPage">
								
							</div>
						</div>
						<div class="layui-form-item layui-col-xs6">
							<label class="layui-form-label">搜索框提示语<i class="red">*</i></label>
							<div class="layui-input-block">
								<input type="text" id="searchTips" name="searchTips" win-verify="required" placeholder="请输入提示语" class="layui-input"/>
							</div>
						</div>`
	};

	$("#serviceStr").html(getDataUseHandlebars(selOption, {rows: serviceMap}));

	if (!isNull(parent.rowId)) {
		AjaxPostUtil.request({url: reqBasePath + "dsformpage006", params: {id: parent.rowId}, type: 'json', method: 'GET', callback: function (json) {
			$("#name").val(json.bean.name);
			$("#remark").val(json.bean.remark);
			skyeyeClassEnumUtil.showEnumDataListByClassName("dsFormPageType", 'select', "type", json.bean.type, form);
			$("#type").attr("disabled", true);

			var businessApi = json.bean.businessApi;
			$("#serviceStr").val(businessApi.serviceStr);
			$("#api").val(businessApi.api);
			skyeyeClassEnumUtil.showEnumDataListByClassName("httpMethodEnum", 'select', "method", businessApi.method, form);

			loadOperate(json.bean.operateIdList);
			// 加载其他的dom
			initOtherDom(json.bean.type, json.bean);
		}});
	} else {
		skyeyeClassEnumUtil.showEnumDataListByClassName("dsFormPageType", 'select', "type", '', form);
		skyeyeClassEnumUtil.showEnumDataListByClassName("httpMethodEnum", 'select', "method", '', form);
		loadOperate(null);
	}

	function loadOperate(defaultValue) {
		AjaxPostUtil.request({url: reqBasePath + "queryOperateList", params: {className: parent.objectId}, type: 'json', method: 'POST', callback: function (json) {
			var value = isNull(defaultValue) ? '' : defaultValue.toString();
			dataShowType.showData(json, 'verificationSelect', 'operateIdList', value, form);
		}});
	}

	form.on('select(type)', function(data) {
		initOtherDom(data.value, {});
	});

	function initOtherDom(type, data) {
		if (type == 'simpleTable') {
			$('#otherDom').html(pageHtml[type]);
			skyeyeClassEnumUtil.showEnumDataListByClassName("whetherEnum", 'radio', "isPage", data.isPage, form);
			$("#searchTips").val(data.searchTips);
		} else {
			$('#otherDom').html('');
		}
	}

	matchingLanguage();
	form.render();
	form.on('submit(formWriteBean)', function (data) {
		if (winui.verifyForm(data.elem)) {
			var params = {
				id: isNull(parent.rowId) ? '' : parent.rowId,
				name: $("#name").val(),
				remark: $("#remark").val(),
				type: $("#type").val(),
				className: parent.objectId,
				operateIdList: isNull($('#operateIdList').attr('value')) ? [] : $('#operateIdList').attr('value')
			};

			if (params.type == 'simpleTable') {
				params['isPage'] = $("#isPage input:radio:checked").val();
				params['searchTips'] = $("#searchTips").val();
			}

			var businessApi = {
				serviceStr: $("#serviceStr").val(),
				api: $("#api").val(),
				method: $("#method").val()
			};
			params.businessApi = JSON.stringify(businessApi);
			AjaxPostUtil.request({url: reqBasePath + "writeDsFormPage", params: params, type: 'json', method: "POST", callback: function (json) {
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