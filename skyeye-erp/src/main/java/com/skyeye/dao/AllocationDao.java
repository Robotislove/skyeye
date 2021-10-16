/*******************************************************************************
 * Copyright 卫志强 QQ：598748873@qq.com Inc. All rights reserved. 开源地址：https://gitee.com/doc_wei01/skyeye
 ******************************************************************************/

package com.skyeye.dao;

import java.util.List;
import java.util.Map;

public interface AllocationDao {

	public List<Map<String, Object>> queryAllocationToList(Map<String, Object> params) throws Exception;

	public List<Map<String, Object>> queryMationToExcel(Map<String, Object> params) throws Exception;

}
