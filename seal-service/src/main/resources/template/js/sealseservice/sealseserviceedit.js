
//工单接收人信息
var serviceUser = {};

// 工单信息
layui.config({
	base: basePath, 
	version: skyeyeVersion
}).extend({
    window: 'js/winui.window'
}).define(['window', 'jquery', 'winui', 'laydate', 'tagEditor', 'fileUpload', 'textool'], function (exports) {
	winui.renderColor();
	layui.use(['form'], function (form) {
		var index = parent.layer.getFrameIndex(window.name);
	    var $ = layui.$,
	    	laydate = layui.laydate,
	    	textool = layui.textool;
	    
	    var cooperationUser = new Array();//工单协助人集合

	    showGrid({
		 	id: "showForm",
		 	url: flowableBasePath + "sealseservice012",
		 	params: {rowId: parent.rowId},
		 	pagination: false,
		 	template: getFileContent('tpl/sealseservice/sealseserviceeditTemplate.tpl'),
		 	ajaxSendLoadBefore: function(hdb) {
		 	},
		 	ajaxSendAfter: function (json) {
				erpOrderUtil.chooseProductMation.materialId = json.bean.materialId;
		 		
		 		textool.init({eleId: 'content', maxlength: 200});
		 		// 报单时间
		 		laydate.render({elem: '#declarationTime', type: 'datetime', trigger: 'click'});
		 		
		 		// 指定预约时间
		 		laydate.render({elem: '#pointSubscribeTime', type: 'datetime', trigger: 'click'});

				// 初始化上传
				$("#sheetPicture").upload(systemCommonUtil.uploadCommon003Config('sheetPicture', 14, json.bean.sheetPicture, 10));

		        // 质保类型
		        $("#productWarranty").val(json.bean.productWarranty);
		        
		        //客户信息赋值
				sysCustomerUtil.customerMation = {
					id: json.bean.customerId,
					customName: json.bean.customerName
				};
		       	$("#customName").val(sysCustomerUtil.customerMation.customName);

				// 售后服务类型
				sysDictDataUtil.showDictDataListByDictTypeCode(sysDictData["amsServiceType"]["key"], 'select', "typeId", json.bean.typeId, form);

				// 工单紧急程度
				sysDictDataUtil.showDictDataListByDictTypeCode(sysDictData["amsServiceUrgency"]["key"], 'select', "urgencyId", json.bean.urgencyId, form);

				// 售后服务方式
				sysDictDataUtil.showDictDataListByDictTypeCode(sysDictData["amsServiceMode"]["key"], 'select', "modeId", json.bean.modeId, form);

				// 加载省级行政区划
				initArea(json.bean);
		 		
		 		//工单接收人
		 		if(json.bean.serviceUserId.length > 0){
		 			serviceUser = {
		 				userId: json.bean.serviceUserId[0].id,
		 				userName: json.bean.serviceUserId[0].name
		 			};
				    $('#serviceUserId').val(json.bean.serviceUserId[0].name);
		 		}
			    
			    var userNames = [];
		 		cooperationUser = [].concat(json.bean.cooperationUserId);
		 		$.each(json.bean.cooperationUserId, function(i, item) {
		 			userNames.push(item.name);
		 		});
			    //工单协助人
			    $('#cooperationUserId').tagEditor({
			        initialTags: userNames,
			        placeholder: '请选择工单协助人',
                    editorTag: false,
			        beforeTagDelete: function(field, editor, tags, val) {
						cooperationUser = [].concat(arrayUtil.removeArrayPointName(cooperationUser, val));
			        }
			    });

				// 附件回显
				skyeyeEnclosure.initTypeISData({'enclosureUpload': json.bean.enclosureInfo});

 	        	matchingLanguage();
		 		form.render();
		 	    form.on('submit(formEditBean)', function (data) {
		 	        if (winui.verifyForm(data.elem)) {
		 	        	var provinceId = "", cityId = "", areaId = "", townshipId = "";
			        	if (!isNull($("#provinceId").val())) {
			        		provinceId = $("#provinceId").val();
			        	} else {
			        		winui.window.msg('请选择所在省.', {icon: 2, time: 2000});
			        		return false;
			        	}
			        	if (!isNull($("#cityId").val())) {
			        		cityId = $("#cityId").val();
			        	}
			        	if (!isNull($("#areaId").val())) {
			        		areaId = $("#areaId").val();
			        	}
			        	if (!isNull($("#townshipId").val())) {
			        		townshipId = $("#townshipId").val();
			        	}
			        	//相关图片
			        	var picUrl = $("#sheetPicture").find("input[type='hidden'][name='upload']").attr("oldurl");
		 	        	var params = {
		        			typeId: $("#typeId").val(),//服务类型，不可为空
		        			declarationTime: $("#declarationTime").val(),//报单时间，不可为空
		        			customerId: sysCustomerUtil.customerMation.id,//客户-可为空
		        			contacts: $("#contacts").val(),//联系人，不可为空
		        			phone: $("#phone").val(),//联系电话，不可为空
		        			email: $("#email").val(),//联系邮箱，不可为空
		        			qq: $("#qq").val(),//联系QQ，不可为空
		        			provinceId: provinceId,//省，不可为空
		        			cityId: cityId,//市，可为空
		        			areaId: areaId,//区县，可为空
		        			townshipId: townshipId,//乡镇，可为空
		        			addressDetailed: $("#addressDetailed").val(),//详细地址，不可为空
		        			productId: isNull(erpOrderUtil.chooseProductMation.materialId) ? '' : erpOrderUtil.chooseProductMation.materialId,//商品id，可为空
		        			productName: $("#productName").val(),//商品名称，可为空
		        			productNorms: $("#productNorms").val(),//规格型号，可为空
		        			productSerialNum: $("#productSerialNum").val(),//序列号，可为空
		        			productWarranty: $("#productWarranty").val(),//质保类型，可为空
		        			urgencyId: $("#urgencyId").val(),//紧急程度，不可为空
		        			modeId: $("#modeId").val(),//处理方式，不可为空
		        			content: $("#content").val(),//服务内容，不可为空
		        			serviceUserId: isNull(serviceUser.userId) ? "" : serviceUser.userId,//工单接收人，可为空
							cooperationUserId: systemCommonUtil.tagEditorGetAllData('cooperationUserId', cooperationUser),//工单协助人，可为空
		        			sheetPicture: isNull(picUrl) ? "" : picUrl,//相关照片，可为空
							enclosureInfo: skyeyeEnclosure.getEnclosureIdsByBoxId('enclosureUpload'),//附件，可为空
		        			rowId: parent.rowId,
		        			pointSubscribeTime: $("#pointSubscribeTime").val() //指定预约时间
		 	        	};
	 	 	        	AjaxPostUtil.request({url: flowableBasePath + "sealseservice015", params: params, type: 'json', callback: function (json) {
							parent.layer.close(index);
							parent.refreshCode = '0';
	 		 	   		}});
		 	        }
		 	        return false;
		 	    });
		 	}
		});

	    //工单接收人选择
		$("body").on("click", "#serviceUserIdSelPeople", function (e) {
			_openNewWindows({
 				url: "../../tpl/serviceworker/serviceworkershowlist.html", 
 				title: "选择接收人",
 				pageId: "serviceworkershowlist",
 				area: ['90vw', '90vh'],
 				callBack: function (refreshCode) {
					$("#serviceUserId").val(serviceUser.userName);
 				}});
		});
		
		//工单协助人选择
		$("body").on("click", "#cooperationUserIdSelPeople", function (e) {
			systemCommonUtil.userReturnList = [].concat(cooperationUser);
			systemCommonUtil.chooseOrNotMy = "1"; // 人员列表中是否包含自己--1.包含；其他参数不包含
			systemCommonUtil.chooseOrNotEmail = "2"; // 人员列表中是否必须绑定邮箱--1.必须；其他参数没必要
			systemCommonUtil.checkType = "1"; // 人员选择类型，1.多选；其他。单选
			systemCommonUtil.openSysUserStaffChoosePage(function (userReturnList) {
				// 重置数据
				cooperationUser = [].concat(systemCommonUtil.tagEditorResetData('cooperationUserId', userReturnList));
			});
		});
		
		form.on('select(areaProvince)', function(data) {
	    	layui.$(data.elem).parent('dd').nextAll().remove();
	    	if(isNull(data.value) || data.value == '请选择'){
	    	} else {
	    		loadChildCityArea();
	    	}
 		});
	    form.on('select(areaCity)', function(data) {
	    	layui.$(data.elem).parent('dd').nextAll().remove();
	    	if(isNull(data.value) || data.value == '请选择'){
	    	} else {
	    		loadChildArea();
	    	}
 		});
	    form.on('select(area)', function(data) {
	    	layui.$(data.elem).parent('dd').nextAll().remove();
	    	if(isNull(data.value) || data.value == '请选择'){
	    	} else {
	    		loadChildAreaTownShip();
	    	}
 		});
 		
 		//初始化行政区划-省
		function initArea(bean){
			AjaxPostUtil.request({url: reqBasePath + "queryAreaListByPId", params: {pId: 0}, type: 'json', callback: function (json) {
				var str = '<dd class="layui-col-xs3"><select id="provinceId" win-verify="required" lay-filter="areaProvince" lay-search=""><option value="">请选择</option>';
				for(var i = 0; i < json.rows.length; i++){
					str += '<option value="' + json.rows[i].id + '">' + json.rows[i].name + '</option>';
				}
				str += '</select></dd>';
				$("#lockParentSel").append(str);
				if (!isNull(bean.provinceId)){
					$("#provinceId").val(bean.provinceId);
					initAreaCity(bean);
				}
				form.render('select');
 	   		}});
		}
		
		//初始化行政区划-市
		function initAreaCity(bean){
			AjaxPostUtil.request({url: reqBasePath + "queryAreaListByPId", params: {pId: $("#provinceId").val()}, type: 'json', callback: function (json) {
				var str = '<dd class="layui-col-xs3"><select id="cityId" lay-filter="areaCity" lay-search=""><option value="">请选择</option>';
				for(var i = 0; i < json.rows.length; i++){
					str += '<option value="' + json.rows[i].id + '">' + json.rows[i].name + '</option>';
				}
				str += '</select></dd>';
				$("#lockParentSel").append(str);
				if (!isNull(bean.cityId)){
					$("#cityId").val(bean.cityId);
					initAreaChildArea(bean);
				}
				form.render('select');
 	   		}});
		}
		
		//初始化行政区划-县
		function initAreaChildArea(bean){
			AjaxPostUtil.request({url: reqBasePath + "queryAreaListByPId", params: {pId: $("#cityId").val()}, type: 'json', callback: function (json) {
				var str = '<dd class="layui-col-xs3"><select id="areaId" lay-filter="area" lay-search=""><option value="">请选择</option>';
				for(var i = 0; i < json.rows.length; i++){
					str += '<option value="' + json.rows[i].id + '">' + json.rows[i].name + '</option>';
				}
				str += '</select></dd>';
				$("#lockParentSel").append(str);
				if (!isNull(bean.areaId)){
					$("#areaId").val(bean.areaId);
					initAreaTownShip(bean);
				}
				form.render('select');
 	   		}});
		}
		
		//初始化行政区划-镇
		function initAreaTownShip(bean){
			AjaxPostUtil.request({url: reqBasePath + "queryAreaListByPId", params: {pId: $("#areaId").val()}, type: 'json', callback: function (json) {
				var str = '<dd class="layui-col-xs3"><select id="townshipId" lay-filter="areaTownShip" lay-search=""><option value="">请选择</option>';
				for(var i = 0; i < json.rows.length; i++){
					str += '<option value="' + json.rows[i].id + '">' + json.rows[i].name + '</option>';
				}
				str += '</select></dd>';
				$("#lockParentSel").append(str);
				if (!isNull(bean.townshipId)){
					$("#townshipId").val(bean.townshipId);
				}
				form.render('select');
 	   		}});
		}
	    
	    //省级行政区划
	    function loadChildProvinceArea(){
 	    	AjaxPostUtil.request({url: reqBasePath + "queryAreaListByPId", params: {pId: 0}, type: 'json', callback: function (json) {
				var str = '<dd class="layui-col-xs3"><select id="provinceId" win-verify="required" lay-filter="areaProvince" lay-search=""><option value="">请选择</option>';
				for(var i = 0; i < json.rows.length; i++){
					str += '<option value="' + json.rows[i].id + '">' + json.rows[i].name + '</option>';
				}
				str += '</select></dd>';
				$("#lockParentSel").append(str);
				form.render('select');
 	   		}});
 	    }
	    
	    //市级行政区划
	    function loadChildCityArea(){
 	    	AjaxPostUtil.request({url: reqBasePath + "queryAreaListByPId", params: {pId: $("#provinceId").val()}, type: 'json', callback: function (json) {
				var str = '<dd class="layui-col-xs3"><select id="cityId" lay-filter="areaCity" lay-search=""><option value="">请选择</option>';
				for(var i = 0; i < json.rows.length; i++){
					str += '<option value="' + json.rows[i].id + '">' + json.rows[i].name + '</option>';
				}
				str += '</select></dd>';
				$("#lockParentSel").append(str);
				form.render('select');
 	   		}});
 	    }
	    
	    //县级行政区划
	    function loadChildArea(){
 	    	AjaxPostUtil.request({url: reqBasePath + "queryAreaListByPId", params: {pId: $("#cityId").val()}, type: 'json', callback: function (json) {
				var str = '<dd class="layui-col-xs3"><select id="areaId" lay-filter="area" lay-search=""><option value="">请选择</option>';
				for(var i = 0; i < json.rows.length; i++){
					str += '<option value="' + json.rows[i].id + '">' + json.rows[i].name + '</option>';
				}
				str += '</select></dd>';
				$("#lockParentSel").append(str);
				form.render('select');
 	   		}});
 	    }
	    
	    //镇级行政区划
	    function loadChildAreaTownShip(){
 	    	AjaxPostUtil.request({url: reqBasePath + "queryAreaListByPId", params: {pId: $("#areaId").val()}, type: 'json', callback: function (json) {
				var str = '<dd class="layui-col-xs3"><select id="townshipId" lay-filter="areaTownShip" lay-search=""><option value="">请选择</option>';
				for(var i = 0; i < json.rows.length; i++){
					str += '<option value="' + json.rows[i].id + '">' + json.rows[i].name + '</option>';
				}
				str += '</select></dd>';
				$("#lockParentSel").append(str);
				form.render('select');
 	   		}});
 	    }
 	    
 	    //商品选择
 	    $("body").on("click", "#productNameSel", function (e) {
			erpOrderUtil.openMaterialChooseChoosePage(function (chooseProductMation) {
				$("#productName").val(chooseProductMation.materialName);
				$("#productNorms").val(chooseProductMation.materialModel);
			});
 	    });
 	    
 	    //客户选择
 	    $("body").on("click", "#customMationSel", function (e) {
			sysCustomerUtil.openSysCustomerChoosePage(function (customerMation) {
				$("#customName").val(customerMation.customName);
				$("#contacts").val(customerMation.contacts);
				$("#phone").val(customerMation.mobilePhone);
				$("#email").val(customerMation.email);
				$("#qq").val(customerMation.qq);
			});
 	    });
	    
	    $("body").on("click", "#cancle", function() {
	    	parent.layer.close(index);
	    });
	});
});