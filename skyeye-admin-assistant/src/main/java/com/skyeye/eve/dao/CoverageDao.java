/*******************************************************************************
 * Copyright 卫志强 QQ：598748873@qq.com Inc. All rights reserved. 开源地址：https://gitee.com/doc_wei01/skyeye
 ******************************************************************************/

package com.skyeye.eve.dao;

import java.util.List;
import java.util.Map;

/**
 *
 * @ClassName: CoverageDao
 * @Description: 车辆险种管理数据层
 * @author: skyeye云系列--卫志强
 * @date: 2021/8/7 20:50
 *
 * @Copyright: 2021 https://gitee.com/doc_wei01/skyeye Inc. All rights reserved.
 * 注意：本内容仅限购买后使用.禁止私自外泄以及用于其他的商业目的
 */
public interface CoverageDao {

	public List<Map<String, Object>> selectAllCoverageMation(Map<String, Object> map) throws Exception;

	public int insertCoverageMation(Map<String, Object> map) throws Exception;

	public int deleteCoverageById(Map<String, Object> map) throws Exception;

	public Map<String, Object> queryCoverageMationById(Map<String, Object> map) throws Exception;

	public int editCoverageMationById(Map<String, Object> map) throws Exception;
	
	public List<Map<String, Object>> queryAllCoverageToChoose(Map<String, Object> map) throws Exception;
	
}
