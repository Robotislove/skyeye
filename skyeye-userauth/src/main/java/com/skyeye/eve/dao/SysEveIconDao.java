/*******************************************************************************
 * Copyright 卫志强 QQ：598748873@qq.com Inc. All rights reserved. 开源地址：https://gitee.com/doc_wei01/skyeye
 ******************************************************************************/

package com.skyeye.eve.dao;

import java.util.List;
import java.util.Map;

public interface SysEveIconDao {

	public List<Map<String, Object>> querySysIconList(Map<String, Object> map) throws Exception;

	public int insertSysIconMation(Map<String, Object> map) throws Exception;

	public Map<String, Object> querySysIconMationByIconClass(Map<String, Object> map) throws Exception;

	public int deleteSysIconMationById(Map<String, Object> map) throws Exception;

	public Map<String, Object> querySysIconMationToEditById(Map<String, Object> map) throws Exception;

	public Map<String, Object> querySysIconMationByIconClassAndId(Map<String, Object> map) throws Exception;

	public int editSysIconMationById(Map<String, Object> map) throws Exception;

	public List<Map<String, Object>> querySysIconListToMenu(Map<String, Object> map) throws Exception;

}
