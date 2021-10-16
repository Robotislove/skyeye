/*******************************************************************************
 * Copyright 卫志强 QQ：598748873@qq.com Inc. All rights reserved. 开源地址：https://gitee.com/doc_wei01/skyeye
 ******************************************************************************/

package com.skyeye.service.impl;

import com.skyeye.common.constans.ErpConstants;
import com.skyeye.common.object.InputObject;
import com.skyeye.common.object.OutputObject;
import com.skyeye.common.util.ExcelUtil;
import com.skyeye.common.util.ToolUtil;
import com.skyeye.dao.PurchaseReturnsDao;
import com.skyeye.factory.ErpRunFactory;
import com.skyeye.service.PurchaseReturnsService;
import com.skyeye.annotation.transaction.ActivitiAndBaseTransaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 *
 * @ClassName: PurchaseReturnsServiceImpl
 * @Description: 采购退货单管理服务类
 * @author: skyeye云系列--卫志强
 * @date: 2021/7/8 21:14
 *
 * @Copyright: 2021 https://gitee.com/doc_wei01/skyeye Inc. All rights reserved.
 * 注意：本内容仅限购买后使用.禁止私自外泄以及用于其他的商业目的
 */
@Service
public class PurchaseReturnsServiceImpl implements PurchaseReturnsService{
	
	@Autowired
	private PurchaseReturnsDao purchaseReturnsDao;
	
	/**
	 * 采购退货单类型
	 */
	private static final String ORDER_TYPE = ErpConstants.DepoTheadSubType.OUT_IS_PURCHASE_RETURNS.getType();

	/**
     * 获取采购退货列表信息
     * @param inputObject
     * @param outputObject
     * @throws Exception
     */
	@Override
	public void queryPurchaseReturnsToList(InputObject inputObject, OutputObject outputObject) throws Exception {
		ErpRunFactory.run(inputObject, outputObject, ORDER_TYPE).queryOrderList();
	}

	/**
     * 新增采购退货信息
     * @param inputObject
     * @param outputObject
     * @throws Exception
     */
	@Override
	@ActivitiAndBaseTransaction(value = {"activitiTransactionManager", "transactionManager"})
	public void insertPurchaseReturnsMation(InputObject inputObject, OutputObject outputObject) throws Exception {
		ErpRunFactory.run(inputObject, outputObject, ORDER_TYPE).insertOrderMation();
	}

	/**
     * 编辑采购退货信息时进行回显
     * @param inputObject
     * @param outputObject
     * @throws Exception
     */
	@Override
	public void queryPurchaseReturnsMationToEditById(InputObject inputObject, OutputObject outputObject) throws Exception {
		ErpRunFactory.run(inputObject, outputObject, ORDER_TYPE).queryOrderMationToEditById();
	}

	/**
     * 编辑采购退货信息
     * @param inputObject
     * @param outputObject
     * @throws Exception
     */
	@Override
	@ActivitiAndBaseTransaction(value = {"activitiTransactionManager", "transactionManager"})
	public void editPurchaseReturnsMationById(InputObject inputObject, OutputObject outputObject) throws Exception {
		ErpRunFactory.run(inputObject, outputObject, ORDER_TYPE).editOrderMationById();
	}

	/**
     * 导出Excel
     * @param inputObject
     * @param outputObject
     * @throws Exception
     */
	@Override
	public void queryMationToExcel(InputObject inputObject, OutputObject outputObject) throws Exception {
		Map<String, Object> params = inputObject.getParams();
        List<Map<String, Object>> beans = purchaseReturnsDao.queryMationToExcel(params);
        String defaultNumber, linkNumber, status;
        for(Map<String, Object> bean : beans){
        	defaultNumber = bean.get("defaultNumber").toString();
        	linkNumber = bean.get("linkNumber").toString();
        	status = bean.get("status").toString();
        	if(!ToolUtil.isBlank(linkNumber)){
        		defaultNumber += "[转]";
        		if("2".equals(status)){
        			defaultNumber += "[正常]";
        		}else{
        			defaultNumber += "[预警]";
        		}
        	}
        	bean.put("defaultNumber", defaultNumber);
        }
        String[] key = new String[]{"defaultNumber", "supplierName", "materialNames", "totalPrice", "taxMoney", "discountLastMoney", "changeAmount", "operPersonName", "operTime"};
        String[] column = new String[]{"单据编号", "供应商", "关联产品", "合计金额", "含税合计", "优惠后金额", "付款", "操作人", "单据日期"};
        String[] dataType = new String[]{"", "data", "data", "data", "data", "data", "data", "data", "data"};
        //采购退货单信息导出
        ExcelUtil.createWorkBook("采购退货单", "采购退货单详细", beans, key, column, dataType, inputObject.getResponse()); 
	}
	
}
