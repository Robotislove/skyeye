
//计算总价
function calculatedTotalPrice() {
	var allPrice = 0, taxLastMoneyPrice = 0;
	$.each(initTableChooseUtil.getDataRowIndex('productList'), function(i, item) {
		//获取行坐标
		var rowNum = item;
		//获取数量
		var rkNum = parseInt(isNull($("#rkNum" + rowNum).val()) ? 0 : $("#rkNum" + rowNum).val());
		//获取单价
		var unitPrice = parseFloat(isNull($("#unitPrice" + rowNum).val()) ? 0 : $("#unitPrice" + rowNum).val());
		//获取税率
		var taxRate = parseFloat(isNull($("#taxRate" + rowNum).val()) ? 0 : $("#taxRate" + rowNum).val()) / 100;
		
		if('rkNum' === showTdByEdit){//数量
			//输出金额
			$("#amountOfMoney" + rowNum).val((rkNum * unitPrice).toFixed(2));
			//输出税额=数量*税率*单价
			$("#taxMoney" + rowNum).val((rkNum * taxRate * unitPrice).toFixed(2));
			//输出含税单价
			$("#taxUnitPrice" + rowNum).val((taxRate * unitPrice + unitPrice).toFixed(2));
			//输出合计价税
			$("#taxLastMoney" + rowNum).val((rkNum * taxRate * unitPrice + rkNum * unitPrice).toFixed(2));
		}else if('unitPrice' === showTdByEdit){//单价
			//输出金额
			$("#amountOfMoney" + rowNum).val((rkNum * unitPrice).toFixed(2));
			//输出税额=数量*税率*单价
			$("#taxMoney" + rowNum).val((rkNum * taxRate * unitPrice).toFixed(2));
			//输出含税单价
			$("#taxUnitPrice" + rowNum).val((taxRate * unitPrice + unitPrice).toFixed(2));
			//输出合计价税
			$("#taxLastMoney" + rowNum).val((rkNum * taxRate * unitPrice + rkNum * unitPrice).toFixed(2));
		}else if('amountOfMoney' === showTdByEdit){//金额
			//获取金额
			var amountOfMoney = parseFloat(isNull($("#amountOfMoney" + rowNum).val()) ? 0 : $("#amountOfMoney" + rowNum).val());
			//输出税额=金额*税率
			$("#taxMoney" + rowNum).val((amountOfMoney * taxRate).toFixed(2));
			//输出单价,含税单价,合计价税
			if(rkNum != 0){
				$("#unitPrice" + rowNum).val((amountOfMoney / rkNum).toFixed(2));
				$("#taxUnitPrice" + rowNum).val((amountOfMoney / rkNum * taxRate + amountOfMoney / rkNum).toFixed(2));
				$("#taxLastMoney" + rowNum).val((amountOfMoney * taxRate + amountOfMoney).toFixed(2));
			} else {
				$("#unitPrice" + rowNum).val('0.00');
				$("#taxUnitPrice" + rowNum).val('0.00');
				$("#taxLastMoney" + rowNum).val('0.00');
			}
		}else if('taxRate' === showTdByEdit){//税率
			//输出金额
			$("#amountOfMoney" + rowNum).val((rkNum * unitPrice).toFixed(2));
			//输出税额=数量*税率*单价
			$("#taxMoney" + rowNum).val((rkNum * taxRate * unitPrice).toFixed(2));
			//输出含税单价
			$("#taxUnitPrice" + rowNum).val((taxRate * unitPrice + unitPrice).toFixed(2));
			//输出合计价税
			$("#taxLastMoney" + rowNum).val((rkNum * taxRate * unitPrice + rkNum * unitPrice).toFixed(2));
		}else if('taxMoney' === showTdByEdit){//税额
			//获取税额
			var taxMoney = parseFloat(isNull($("#taxMoney" + rowNum).val()) ? 0 : $("#taxMoney" + rowNum).val());
			//输出金额
			$("#amountOfMoney" + rowNum).val((rkNum * unitPrice).toFixed(2));
			//获取金额
			var amountOfMoney = parseFloat(isNull($("#amountOfMoney" + rowNum).val()) ? 0 : $("#amountOfMoney" + rowNum).val());
			//输出含税单价,合计价税,税率
			if(rkNum != 0){
				if(unitPrice != 0){
					$("#taxUnitPrice" + rowNum).val((taxMoney / rkNum + unitPrice).toFixed(2));
					$("#taxRate" + rowNum).val((taxMoney / unitPrice / rkNum * 100).toFixed(2));
				} else {
					$("#taxUnitPrice" + rowNum).val('0.00');
					$("#taxRate" + rowNum).val('0.00');
					$("#unitPrice" + rowNum).val('0.00');
					$("#amountOfMoney" + rowNum).val('0.00');
				}
				if(amountOfMoney != 0){
					$("#taxLastMoney" + rowNum).val((amountOfMoney + taxMoney).toFixed(2));
				} else {
					$("#taxLastMoney" + rowNum).val('0.00');
				}
			} else {
				$("#taxUnitPrice" + rowNum).val('0.00');
				$("#taxLastMoney" + rowNum).val('0.00');
			}
		}else if('taxUnitPrice' === showTdByEdit){//含税单价
			//获取含税单价
			var taxUnitPrice = parseFloat(isNull($("#taxUnitPrice" + rowNum).val()) ? 0 : $("#taxUnitPrice" + rowNum).val());
			if(taxUnitPrice == 0){
				$("#taxLastMoney" + rowNum).val('0.00');
				$("#unitPrice" + rowNum).val('0.00');
				$("#amountOfMoney" + rowNum).val('0.00');
				$("#taxMoney" + rowNum).val('0.00');
				$("#taxRate" + rowNum).val('0.00');
				return;
			}
			//输出合计价税,税额,税率
			if(unitPrice != 0){
				if(rkNum != 0 ){
					$("#taxLastMoney" + rowNum).val((taxUnitPrice * rkNum).toFixed(2));
					$("#amountOfMoney" + rowNum).val((unitPrice * rowNum).toFixed(2));
				} else {
					$("#taxLastMoney" + rowNum).val('0.00');
					$("#amountOfMoney" + rowNum).val('0.00');
				}
				$("#taxMoney" + rowNum).val((taxUnitPrice - unitPrice).toFixed(2));
				$("#taxRate" + rowNum).val(((taxUnitPrice / unitPrice - 1) * 100).toFixed(2));
				
			} else {
				$("#taxLastMoney" + rowNum).val('0.00');
				$("#unitPrice" + rowNum).val('0.00');
				$("#amountOfMoney" + rowNum).val('0.00');
				$("#taxMoney" + rowNum).val('0.00');
				$("#taxRate" + rowNum).val('0.00');
			}
		}else if('taxLastMoney' === showTdByEdit){//合计价税
			//获取合计价税
			var taxLastMoney = parseFloat(isNull($("#taxLastMoney" + rowNum).val()) ? 0 : $("#taxLastMoney" + rowNum).val());
			if(taxLastMoney == 0){
				$("#taxUnitPrice" + rowNum).val('0.00');
				$("#unitPrice" + rowNum).val('0.00');
				$("#amountOfMoney" + rowNum).val('0.00');
				$("#taxMoney" + rowNum).val('0.00');
				$("#taxRate" + rowNum).val('0.00');
				return;
			}
			//输出含税单价,税额,税率
			if(rkNum != 0 ){
				if(unitPrice != 0){
					$("#taxUnitPrice" + rowNum).val((taxLastMoney / rkNum).toFixed(2));
					$("#taxMoney" + rowNum).val((taxLastMoney / rkNum - unitPrice).toFixed(2));
					$("#taxRate" + rowNum).val(((taxLastMoney / rkNum / unitPrice - 1 ) * 100).toFixed(2));
					$("#amountOfMoney" + rowNum).val((unitPrice * rkNum).toFixed(2));
				} else {
					$("#amountOfMoney" + rowNum).val('0.00');
					$("#taxMoney" + rowNum).val('0.00');
					$("#taxUnitPrice" + rowNum).val('0.00');
					$("#unitPrice" + rowNum).val('0.00');
				}
			} else {
				$("#taxUnitPrice" + rowNum).val('0.00');
				$("#unitPrice" + rowNum).val('0.00');
				$("#amountOfMoney" + rowNum).val('0.00');
				$("#taxMoney" + rowNum).val('0.00');
				$("#taxRate" + rowNum).val('0.00');
			}
		}
		allPrice += parseFloat($("#amountOfMoney" + rowNum).val());
		taxLastMoneyPrice += parseFloat($("#taxLastMoney" + rowNum).val());
	});
	$("#allPrice").html(allPrice.toFixed(2));
	$("#taxLastMoneyPrice").html(taxLastMoneyPrice.toFixed(2));
	
	//优惠率计算
	var discount = parseFloat(isNull($("#discount").val()) ? 0 : $("#discount").val());
	//输出优惠金额
	var discountMoney = (taxLastMoneyPrice * discount / 100).toFixed(2);
	$("#discountMoney").val(discountMoney);
	//输出优惠后的金额
	$("#discountLastMoney").html((taxLastMoneyPrice - discountMoney).toFixed(2));
	//输出本次付款
	$("#changeAmount").val((taxLastMoneyPrice - discountMoney).toFixed(2));
	//输出欠款金额
	$("#arrears").html('0.00');
}

layui.define(["jquery"], function(exports) {
	var jQuery = layui.jquery;
	(function($) {
		//数量变化,税率变化
		$("body").on("input", ".rkNum, .unitPrice, .amountOfMoney, .taxRate, .taxMoney, .taxUnitPrice, .taxLastMoney", function() {
			if($(this).attr("class").replace("layui-input change-input ", "") != showTdByEdit){
				showTdByEdit = $(this).attr("class").replace("layui-input change-input ", "");
				$(".change-input").parent().removeAttr("style");
				$("." + showTdByEdit).parent().css({'background-color': '#e6e6e6'});
			}
			calculatedTotalPrice();
		});
		$("body").on("change", ".rkNum, .unitPrice, .amountOfMoney, .taxRate, .taxMoney, .taxUnitPrice, .taxLastMoney", function() {
			if($(this).attr("class").replace("layui-input change-input ", "") != showTdByEdit){
				showTdByEdit = $(this).attr("class").replace("layui-input change-input ", "");
				$(".change-input").parent().removeAttr("style");
				$("." + showTdByEdit).parent().css({'background-color': '#e6e6e6'});
			}
			calculatedTotalPrice();
		});
		
		//优惠率变化
		$("body").on("input", "#discount", function() {
			//获取价格合计
			var taxLastMoneyPrice = parseFloat(isNull($("#taxLastMoneyPrice").html()) ? 0 : $("#taxLastMoneyPrice").html());
			var discount = parseFloat(isNull($(this).val()) ? 0 : $(this).val());
			//输出优惠金额
			$("#discountMoney").val((taxLastMoneyPrice * discount / 100).toFixed(2));
			//输出优惠后的金额
			$("#discountLastMoney").html((taxLastMoneyPrice - (taxLastMoneyPrice * discount / 100)).toFixed(2));
			//输出本次付款
			$("#changeAmount").val((taxLastMoneyPrice - (taxLastMoneyPrice * discount / 100)).toFixed(2));
		});
		$("body").on("change", "#discount", function() {
			//获取价格合计
			var taxLastMoneyPrice = parseFloat(isNull($("#taxLastMoneyPrice").html()) ? 0 : $("#taxLastMoneyPrice").html());
			var discount = parseFloat(isNull($(this).val()) ? 0 : $(this).val());
			//输出优惠金额
			$("#discountMoney").val((taxLastMoneyPrice * discount / 100).toFixed(2));
			//输出优惠后的金额
			$("#discountLastMoney").html((taxLastMoneyPrice - (taxLastMoneyPrice * discount / 100)).toFixed(2));
			//输出本次付款
			$("#changeAmount").val((taxLastMoneyPrice - (taxLastMoneyPrice * discount / 100)).toFixed(2));
		});
		
		//优惠金额变化
		$("body").on("input", "#discountMoney", function() {
			//获取价格合计
			var taxLastMoneyPrice = parseFloat(isNull($("#taxLastMoneyPrice").html()) ? 0 : $("#taxLastMoneyPrice").html());
			var discountMoney = parseFloat(isNull($(this).val()) ? 0 : $(this).val());
			//输出优惠率
			$("#discount").val((discountMoney / taxLastMoneyPrice * 100).toFixed(2));
			//输出优惠后的金额
			$("#discountLastMoney").html((taxLastMoneyPrice - discountMoney).toFixed(2));
			//输出本次付款
			$("#changeAmount").val((taxLastMoneyPrice - discountMoney).toFixed(2));
		});
		$("body").on("change", "#discountMoney", function() {
			//获取价格合计
			var taxLastMoneyPrice = parseFloat(isNull($("#taxLastMoneyPrice").html()) ? 0 : $("#taxLastMoneyPrice").html());
			var discountMoney = parseFloat(isNull($(this).val()) ? 0 : $(this).val());
			//输出优惠率
			$("#discount").val((discountMoney / taxLastMoneyPrice * 100).toFixed(2));
			//输出优惠后的金额
			$("#discountLastMoney").html((taxLastMoneyPrice - discountMoney).toFixed(2));
			//输出本次付款
			$("#changeAmount").val((taxLastMoneyPrice - discountMoney).toFixed(2));
		});
		
		//本次付款变化
		$("body").on("input", "#changeAmount", function() {
			//获取优惠后的金额
			var discountLastMoney = parseFloat(isNull($("#discountLastMoney").html()) ? 0 : $("#discountLastMoney").html());
			var changeAmount = parseFloat(isNull($("#changeAmount").val()) ? 0 : $("#changeAmount").val());
			//输出欠款金额
			$("#arrears").html((discountLastMoney - changeAmount).toFixed(2));
		});
		$("body").on("change", "#changeAmount", function() {
			//获取优惠后的金额
			var discountLastMoney = parseFloat(isNull($("#discountLastMoney").html()) ? 0 : $("#discountLastMoney").html());
			var changeAmount = parseFloat(isNull($("#changeAmount").val()) ? 0 : $("#changeAmount").val());
			//输出欠款金额
			$("#arrears").html((discountLastMoney - changeAmount).toFixed(2));
		});
	})(jQuery);
});

//判断选中的商品是否也在数组中
function inTableDataArrayByAssetarId(materialId, unitId, array) {
	var isIn = false;
	$.each(array, function(i, item) {
		if(item.mUnitId === unitId && item.materialId === materialId) {
			isIn = true;
			return false;
		}
	});
	return isIn;
}
