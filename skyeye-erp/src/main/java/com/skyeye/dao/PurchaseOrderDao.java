/*******************************************************************************
 * Copyright 卫志强 QQ：598748873@qq.com Inc. All rights reserved. 开源地址：https://gitee.com/doc_wei01/skyeye
 ******************************************************************************/

package com.skyeye.dao;

import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

/**
 *
 * @ClassName: PurchaseOrderDao
 * @Description: 采购订单管理数据层
 * @author: skyeye云系列--卫志强
 * @date: 2021/8/7 18:48
 *
 * @Copyright: 2021 https://gitee.com/doc_wei01/skyeye Inc. All rights reserved.
 * 注意：本内容仅限购买后使用.禁止私自外泄以及用于其他的商业目的
 */
public interface PurchaseOrderDao {

	public List<Map<String, Object>> queryPurchaseOrderToList(Map<String, Object> params) throws Exception;

	public int editPurchaseOrderStateToExamineById(Map<String, Object> map) throws Exception;

	public List<Map<String, Object>> queryPurchaseOrderNormsToTurnPutById(Map<String, Object> map) throws Exception;

	public List<Map<String, Object>> queryMationToExcel(Map<String, Object> params) throws Exception;

	public Map<String, Object> queryPurchaseOrderToTurnPutById(@Param("orderId") String orderId, @Param("orderType")  String orderType) throws Exception;

}
