/*******************************************************************************
 * Copyright 卫志强 QQ：598748873@qq.com Inc. All rights reserved. 开源地址：https://gitee.com/doc_wei01/skyeye
 ******************************************************************************/
package com.skyeye.eve.dao;

import java.util.List;
import java.util.Map;

public interface PlanProjectFlowDao {

	public List<Map<String, Object>> queryPlanProjectFlowList(Map<String, Object> map) throws Exception;

	public int insertPlanProjectFlowMation(Map<String, Object> map) throws Exception;

	public Map<String, Object> queryPlanProjectFlowMationByName(Map<String, Object> map) throws Exception;

	public int deletePlanProjectFlowMationById(Map<String, Object> map) throws Exception;

	public Map<String, Object> queryPlanProjectFlowMationToEditById(Map<String, Object> map) throws Exception;

	public Map<String, Object> queryPlanProjectFlowMationByNameAndId(Map<String, Object> map) throws Exception;

	public int editPlanProjectFlowMationById(Map<String, Object> map) throws Exception;

	public Map<String, Object> queryChildNumMationById(Map<String, Object> map) throws Exception;

	public Map<String, Object> queryPlanProjectFlowJsonContentMationById(Map<String, Object> map) throws Exception;

	public int editPlanProjectFlowJsonContentMationById(Map<String, Object> map) throws Exception;

}
