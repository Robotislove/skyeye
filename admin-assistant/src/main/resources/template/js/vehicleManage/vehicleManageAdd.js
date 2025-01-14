
var userList = new Array();//选择用户返回的集合或者进行回显的集合

// 车辆信息
layui.config({
	base: basePath, 
	version: skyeyeVersion
}).extend({
    window: 'js/winui.window'
}).define(['window', 'jquery', 'winui', 'fileUpload', 'tagEditor', 'laydate'], function (exports) {
	winui.renderColor();
	layui.use(['form'], function (form) {
		var index = parent.layer.getFrameIndex(window.name);
	    var $ = layui.$,
	    	laydate = layui.laydate;
	    
 		// 初始化上传
 		$("#vehicleImg").upload(systemCommonUtil.uploadCommon003Config('vehicleImg', 6, '', 1));
 		
 		// 生产日期
 		laydate.render({elem: '#manufactureTime', type: 'date', max: getYMDFormatDate(), trigger: 'click'});
 		
 		// 采购日期
 		laydate.render({elem: '#purchaseTime', type: 'date', max: getYMDFormatDate(), trigger: 'click'});
 		
 		// 下次年检时间
 		laydate.render({elem: '#nextInspectionTime', type: 'date', trigger: 'click'});
 		
 		// 保险截止期限
 		laydate.render({elem: '#insuranceDeadline', type: 'date', trigger: 'click'});
 		
 		// 上次保养日期
 		laydate.render({elem: '#prevMaintainTime', type: 'date', trigger: 'click'});

		skyeyeEnclosure.init('enclosureUpload');
 		matchingLanguage();
 		form.render();
 	    form.on('submit(formAddBean)', function (data) {
 	        if (winui.verifyForm(data.elem)) {
 	        	var params = {
 	        		vehicleName: $("#vehicleName").val(),
 	        		licensePlate: $("#licensePlate").val(),
 	        		specifications: $("#specifications").val(),
 	        		oilConsumption: $("#oilConsumption").val(),
 	        		unitPrice: $("#unitPrice").val(),
 	        		vehicleColor: $("#vehicleColor").val(),
 	        		manufacturer: $("#manufacturer").val(),
 	        		manufactureTime: $("#manufactureTime").val(),
 	        		supplier: $("#supplier").val(),
 	        		purchaseTime: $("#purchaseTime").val(),
 	        		engineNumber: $("#engineNumber").val(),
 	        		frameNumber: $("#frameNumber").val(),
 	        		storageArea: $("#storageArea").val(),
 	        		roomAddDesc: $("#roomAddDesc").val(),
 	        		nextInspectionTime: $("#nextInspectionTime").val(),
 	        		insuranceDeadline: $("#insuranceDeadline").val(),
 	        		prevMaintainTime: $("#prevMaintainTime").val(),
					enclosureInfo: skyeyeEnclosure.getEnclosureIdsByBoxId('enclosureUpload'),
					vehicleAdmin: systemCommonUtil.tagEditorGetItemData('vehicleAdmin', userList)
 	        	};
 	        	params.vehicleImg = $("#vehicleImg").find("input[type='hidden'][name='upload']").attr("oldurl");
				if (isNull(params.vehicleImg)) {
					winui.window.msg('请上传车辆图片', {icon: 2, time: 2000});
					return false;
				}
 	        	AjaxPostUtil.request({url: flowableBasePath + "vehicle002", params: params, type: 'json', callback: function(json) {
					parent.layer.close(index);
					parent.refreshCode = '0';
	 	   		}});
 	        }
 	        return false;
 	    });
 	    
 	    // 车辆管理人
	    $('#vehicleAdmin').tagEditor({
	        initialTags: [],
	        placeholder: '请选择车辆管理人',
			editorTag: false,
	        beforeTagDelete: function(field, editor, tags, val) {
				userList = [].concat(arrayUtil.removeArrayPointName(userList, val));
	        }
	    });
	    // 车辆管理人选择
		$("body").on("click", "#userNameSelPeople", function(e) {
			systemCommonUtil.userReturnList = [].concat(userList);
			systemCommonUtil.chooseOrNotMy = "1"; // 人员列表中是否包含自己--1.包含；其他参数不包含
			systemCommonUtil.chooseOrNotEmail = "2"; // 人员列表中是否必须绑定邮箱--1.必须；其他参数没必要
			systemCommonUtil.checkType = "2"; // 人员选择类型，1.多选；其他。单选
			systemCommonUtil.openSysUserStaffChoosePage(function (userReturnList) {
				// 重置数据
				userList = [].concat(systemCommonUtil.tagEditorResetData('vehicleAdmin', userReturnList));
			});
		});

	    $("body").on("click", "#cancle", function() {
	    	parent.layer.close(index);
	    });
	});
});