
layui.config({
	base: basePath, 
	version: skyeyeVersion
}).extend({
    window: 'js/winui.window'
}).define(['window', 'jquery', 'winui', 'laydate', 'fileUpload'], function (exports) {
	winui.renderColor();
	layui.use(['form'], function (form) {
		var index = parent.layer.getFrameIndex(window.name);
	    var $ = layui.$,
		    form = layui.form,
		    laydate = layui.laydate;
	    
		var rowNum = 1; //表格的序号
		var usetableTemplate = $("#usetableTemplate").html();
		var schoolId = "";//学校id
		
		showGrid({
		 	id: "showForm",
		 	url: schoolBasePath + "studentmation006",
		 	params: {rowId: parent.rowId},
		 	pagination: false,
		 	template: $("#editTemplate").html(),
		 	ajaxSendLoadBefore: function(hdb) {
		 	},
		 	ajaxSendAfter:function (json) {
		 		schoolId = json.bean.schoolId;
		 		// 哪一届
				laydate.render({elem: '#sessionYear', type: 'year', max: 'date' });
				
				// 入校时间
				laydate.render({elem: '#joinTime', type: 'date'});

				// 初始化上传
				$("#userPhoto").upload(systemCommonUtil.uploadCommon003Config('userPhoto', 15, json.bean.userPhoto, 1));

		        $("input:radio[name=userSex][value=" + json.bean.userSex + "]").attr("checked", true);
		        $("input:radio[name=idcardType][value=" + json.bean.idcardType + "]").attr("checked", true);
		        $("input:radio[name=state][value=" + json.bean.state + "]").attr("checked", true);
		        $("input:radio[name=residenceType][value=" + json.bean.residenceType + "]").attr("checked", true);
		        $("input:radio[name=stuType][value=" + json.bean.stuType + "]").attr("checked", true);
		        $("input:radio[name=outsideSchool][value=" + json.bean.outsideSchool + "]").attr("checked", true);
		        $("input:radio[name=foreignStudents][value=" + json.bean.foreignStudents + "]").attr("checked", true);
		        $("input:radio[name=onlyChild][value=" + json.bean.onlyChild + "]").attr("checked", true);
		        $("input:radio[name=behindChildren][value=" + json.bean.behindChildren + "]").attr("checked", true);
		        $("input:radio[name=floatingPopulation][value=" + json.bean.floatingPopulation + "]").attr("checked", true);
		        $("input:radio[name=singleParentFamily][value=" + json.bean.singleParentFamily + "]").attr("checked", true);
		        $("input:radio[name=entranceType][value=" + json.bean.entranceType + "]").attr("checked", true);
		        $("input:radio[name=schoolChoiceStudents][value=" + json.bean.schoolChoiceStudents + "]").attr("checked", true);
		        $("input:radio[name=attendType][value=" + json.bean.attendType + "]").attr("checked", true);
		        $("input:radio[name=healthCondition][value=" + json.bean.healthCondition + "]").attr("checked", true);
		        $("input:radio[name=overseasChinese][value=" + json.bean.overseasChinese + "]").attr("checked", true);
		        $("input:radio[name=bloodType][value=" + json.bean.bloodType + "]").attr("checked", true);
		        $("input:radio[name=orphan][value=" + json.bean.orphan + "]").attr("checked", true);
		        $("input:radio[name=preschoolEducation][value=" + json.bean.preschoolEducation + "]").attr("checked", true);
		        if(json.bean.preschoolEducation != 1){
		        	$("#preschoolSchoolBox").hide();
		        }
		        $("input:radio[name=preferential][value=" + json.bean.preferential + "]").attr("checked", true);
		 		$("input:radio[name=onePatch][value=" + json.bean.onePatch + "]").attr("checked", true);
		 		$("input:radio[name=schoolBus][value=" + json.bean.schoolBus + "]").attr("checked", true);
		 		$("input:radio[name=vaccination][value=" + json.bean.vaccination + "]").attr("checked", true);
		        
		        //加载年级
    	 		initGradeId();
    	 		//加载交通方式
	 			initTransportationId();
	 			//加载家庭情况
	 			initHomeSituationId();
	 			//加载身心障碍
	 			initBodyMindId();
	 			//加载家庭成员
	 			initDataToShow(json.bean.stuParents);
	 			
		 		//所属年级
			    function initGradeId(){
				    showGrid({
			    	 	id: "gradeId",
			    	 	url: schoolBasePath + "grademation006",
			    	 	params: {schoolId: schoolId},
			    	 	pagination: false,
			    	 	template: getFileContent('tpl/template/select-option.tpl'),
			    	 	ajaxSendLoadBefore: function(hdb) {
			    	 	},
			    	 	ajaxSendAfter:function(data) {
			    	 		$("#gradeId").val(json.bean.gradeId);
			    	 		loadThisGradeNowYear();
			    	 		form.render('select');
			    	 	}
			        });
			    }
			    
			    //加载交通方式
			    function initTransportationId(){
				    showGrid({
			    	 	id: "modeOfTransportation",
			    	 	url: schoolBasePath + "schooltransportation006",
			    	 	params: {schoolId: schoolId},
			    	 	pagination: false,
			    	 	template: getFileContent('tpl/template/select-option.tpl'),
			    	 	ajaxSendLoadBefore: function(hdb) {
			    	 	},
			    	 	ajaxSendAfter:function(data) {
			    	 		$("#modeOfTransportation").val(json.bean.modeOfTransportation);
			    	 		form.render('select');
			    	 	}
			        });
			    }
			    
			    //加载家庭情况
			    function initHomeSituationId(){
			    	showGrid({
			    	 	id: "homeSituation",
			    	 	url: schoolBasePath + "schoolfamilysituation006",
			    	 	params: {schoolId: schoolId},
			    	 	pagination: false,
			    	 	template: getFileContent('tpl/template/checkbox-property.tpl'),
			    	 	ajaxSendLoadBefore: function(hdb) {
			    	 	},
			    	 	ajaxSendAfter:function(data) {
			    	 		var homeSituation = json.bean.homeSituation;
					 		for(var i = 0; i < homeSituation.length; i++){
								$('#homeSituation input:checkbox[rowId="' + homeSituation[i].situationId + '"]').attr("checked", true);
							}
			    	 		form.render('checkbox');
			    	 	}
			        });
			    }
			    
			    //加载身心障碍
			    function initBodyMindId(){
			    	showGrid({
			    	 	id: "bodyMind",
			    	 	url: schoolBasePath + "schoolbodymind006",
			    	 	params: {schoolId: schoolId},
			    	 	pagination: false,
			    	 	template: getFileContent('tpl/template/checkbox-property.tpl'),
			    	 	ajaxSendLoadBefore: function(hdb) {
			    	 	},
			    	 	ajaxSendAfter:function(data) {
			    	 		var bodyMind = json.bean.bodyMind;
					 		for(var i = 0; i < bodyMind.length; i++){
								$('#bodyMind input:checkbox[rowId="' + bodyMind[i].bodyMindId + '"]').attr("checked", true);
							}
			    	 		form.render('checkbox');
			    	 	}
			        });
			    }
			    
			    //年级监听事件
				form.on('select(gradeId)', function(data) {
					if(isNull(data.value) || data.value === '请选择'){
				 		$("#classId").html("");
						form.render('select');
					} else {
						//加载班级
						loadThisGradeNowYear();
					}
				});
				
				//学前教育变化事件
				form.on('radio(preschoolEducation)', function(data) {
					if (data.value == 1){
						$("#preschoolSchoolBox").show();
					} else {
						$("#preschoolSchoolBox").hide();
					}
				});
				
				//加载当前选中的年级是哪一届的以及这一届的班级信息
				function loadThisGradeNowYear(){
					showGrid({
					 	id: "classId",
					 	url: schoolBasePath + "grademation009",
					 	params: {gradeId: $("#gradeId").val()},
					 	pagination: false,
					 	template: getFileContent('tpl/template/select-option.tpl'),
					 	ajaxSendLoadBefore: function(hdb) {},
					 	ajaxSendAfter:function(data) {
					 		$("#classId").val(json.bean.classId);
					 		form.render('select');
					 	},
					 	ajaxSendErrorAfter: function (json) {
					 		$("#classId").html("");
					 		form.render('select');
					 	}
				    });
				}
		 		
				matchingLanguage();
		 		form.render();
		        
		 		form.on('submit(formEditBean)', function (data) {
			    	
			        if (winui.verifyForm(data.elem)) {
			        	var userPhoto = $("#userPhoto").find("input[type='hidden'][name='upload']").attr("oldurl");
			        	var params = {
		        			studentName: $("#studentName").val(),
		        			userPhoto: isNull(userPhoto) ? "" : userPhoto,
		        			nameUseBefore: $("#nameUseBefore").val(),
		        			studentNo: $("#studentNo").val(),
		        			userSex: $("input[name='userSex']:checked").val(),
		        			nation: $("#nation").val(),
		        			idcardType: $("input[name='idcardType']:checked").val(),
		        			idCard: $("#idCard").val(),
		        			schoolId: schoolId,
		        			gradeId: $("#gradeId").val(),
		        			classId: $("#classId").val(),
		        			state: $("input[name='state']:checked").val(),
		        			residenceType: $("input[name='residenceType']:checked").val(),
		        			residenceNo: $("#residenceNo").val(),
		        			residencePoliceStation: $("#residencePoliceStation").val(),
		        			joinTime: $("#joinTime").val(),
		        			sessionYear: $("#sessionYear").val(),
		        			homeAddress: $("#homeAddress").val(),
		        			homePostalCode: $("#homePostalCode").val(),
		        			homeContact: $("#homeContact").val(),
		        			homePhone: $("#homePhone").val(),
		        			speciality: $("#speciality").val(),
		        			guardian: $("#guardian").val(),
		        			guardianIdcard: $("#guardianIdcard").val(),
		        			localContact: $("#localContact").val(),
		        			contactRelationship: $("#contactRelationship").val(),
		        			contactPhone: $("#contactPhone").val(),
		        			homeMemberStr: "",//家庭成员json串
		        			bodyMind: "",//身心障碍json串
		        			stuType: $("input[name='stuType']:checked").val(),
		        			outsideSchool: $("input[name='outsideSchool']:checked").val(),
		        			foreignStudents: $("input[name='foreignStudents']:checked").val(),
		        			onlyChild: $("input[name='onlyChild']:checked").val(),
		        			behindChildren: $("input[name='behindChildren']:checked").val(),
		        			floatingPopulation: $("input[name='floatingPopulation']:checked").val(),
		        			singleParentFamily: $("input[name='singleParentFamily']:checked").val(),
		        			entranceType: $("input[name='entranceType']:checked").val(),
		        			schoolChoiceStudents: $("input[name='schoolChoiceStudents']:checked").val(),
		        			attendType: $("input[name='attendType']:checked").val(),
		        			healthCondition: $("input[name='healthCondition']:checked").val(),
		        			overseasChinese: $("input[name='overseasChinese']:checked").val(),
		        			homeSituation: "",//家庭情况
		        			bloodType: $("input[name='bloodType']:checked").val(),
		        			preschoolEducation: $("input[name='preschoolEducation']:checked").val(),
		        			preschoolSchool: "",//学前教育学校
		        			orphan: $("input[name='orphan']:checked").val(),
		        			preferential: $("input[name='preferential']:checked").val(),
		        			onePatch: $("input[name='onePatch']:checked").val(),
		        			modeOfTransportation: $("#modeOfTransportation").val(),
		        			schoolBus: $("input[name='schoolBus']:checked").val(),
		        			vaccination: $("input[name='vaccination']:checked").val(),
		        			rowId: parent.rowId
			        	};
			        	
			        	//获取家庭成员json信息
			        	var rowTr = $("#useTable tr");
						var tableData = new Array();
						$.each(rowTr, function(i, item) {
							//获取行编号
							var rowNum = $(item).attr("trcusid").replace("tr", "");
							var row = {
								name: $("#name" + rowNum).val(),
								idcard: $("#idcard" + rowNum).val(),
								unit: $("#unit" + rowNum).val(),
								phone: $("#phone" + rowNum).val(),
								nation: $("#nation" + rowNum).val(),
								residenceNo: $("#residenceNo" + rowNum).val(),
								callName: $("#callName" + rowNum).val(),
								speciality: $("#speciality" + rowNum).val()
							};
							tableData.push(row);
						});
						params.homeMemberStr = JSON.stringify(tableData);
						
						//学前教育学校
						if(params.preschoolEducation == 1){
							params.preschoolSchool = $("#preschoolSchool").val();
						}
						
						//获取家庭情况信息
		 	        	var propertyIds = "";
			        	$.each($('#homeSituation input:checkbox:checked'),function(){
			        		propertyIds = propertyIds + $(this).attr("rowId") + ",";
			            });
			            params.homeSituation = propertyIds;
			            
			            //获取身心障碍信息
		 	        	var bodyMindIds = "";
			        	$.each($('#bodyMind input:checkbox:checked'),function(){
			        		bodyMindIds = bodyMindIds + $(this).attr("rowId") + ",";
			            });
			            params.bodyMind = bodyMindIds;
			        	
			        	AjaxPostUtil.request({url:schoolBasePath + "studentmation007", params: params, type: 'json', callback: function (json) {
							parent.layer.close(index);
							parent.refreshCode = '0';
			 	   		}});
			        }
			        return false;
			    });
		 		
		 	}
	    });
	    
	    //渲染家庭成员数据到页面
		function initDataToShow(stuParents){
			//渲染列表项
			$.each(stuParents, function(i, item) {
				addRow();
				$("#name" + (rowNum - 1)).val(item.name);//姓名回显
				$("#idcard" + (rowNum - 1)).val(item.idcard);//身份证号回显
				$("#unit" + (rowNum - 1)).val(item.unit);//工作单位回显
				$("#phone" + (rowNum - 1)).val(item.phone);//手机号回显
				$("#nation" + (rowNum - 1)).val(item.nation);//民族回显
				$("#residenceNo" + (rowNum - 1)).val(item.residenceNo);//户口所在地编码回显
				$("#callName" + (rowNum - 1)).val(item.callName);//称呼回显
				$("#speciality" + (rowNum - 1)).val(item.speciality);//特长回显
			});
			//渲染
 			form.render();
		}
	    
	    //新增行
		$("body").on("click", "#addRow", function() {
			addRow();
		});

		//删除行
		$("body").on("click", "#deleteRow", function() {
			deleteRow();
		});

		//新增行
		function addRow() {
			var par = {
				id: "row" + rowNum.toString(), //checkbox的id
				trId: "tr" + rowNum.toString(), //行的id
				name: "name" + rowNum.toString(), //姓名
				idcard: "idcard" + rowNum.toString(), //身份证号
				unit: "unit" + rowNum.toString(), //工作单位
				phone: "phone" + rowNum.toString(), //手机号
				nation: "nation" + rowNum.toString(), //民族
				residenceNo: "residenceNo"  + rowNum.toString(), //户口所在地编码
				callName: "callName"  + rowNum.toString(), //称呼
				speciality: "speciality" + rowNum.toString() //特长
			};
			$("#useTable").append(getDataUseHandlebars(usetableTemplate, par));
			form.render('checkbox');
			rowNum++;
		}

		//删除行
		function deleteRow() {
			var checkRow = $("#useTable input[type='checkbox'][name='tableCheckRow']:checked");
			if(checkRow.length > 0) {
				$.each(checkRow, function(i, item) {
					$(item).parent().parent().remove();
				});
			} else {
				winui.window.msg('请选择要删除的行', {icon: 2, time: 2000});
			}
		}
	    
	    // 取消
	    $("body").on("click", "#cancle", function() {
	    	parent.layer.close(index);
	    });
	    
	});
	    
});