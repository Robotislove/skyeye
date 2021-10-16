/*******************************************************************************
 * Copyright 卫志强 QQ：598748873@qq.com Inc. All rights reserved. 开源地址：https://gitee.com/doc_wei01/skyeye
 ******************************************************************************/

package com.skyeye.dao;

import java.util.List;
import java.util.Map;

public interface CrmDocumentaryTypeDao {

    public int insertCrmDocumentaryType(Map<String, Object> map) throws Exception;

    public List<Map<String, Object>> queryCrmDocumentaryTypeList(Map<String, Object> map) throws Exception;

    public Map<String, Object> queryCrmDocumentaryTypeMationById(Map<String, Object> map) throws Exception;

    public Map<String, Object> queryStateById(Map<String, Object> map) throws  Exception;

    public List<Map<String, Object>> queryStateUpList(Map<String, Object> map) throws Exception;

    public Map<String, Object> queryCrmDocumentaryTypeByName(Map<String, Object> map) throws Exception;

    public Map<String, Object> queryCrmDocumentaryTypeByIdAndName(Map<String, Object> map) throws Exception;

    public int editCrmDocumentaryTypeById(Map<String, Object> map) throws Exception;

    public int editStateUpById(Map<String, Object> map) throws Exception;

    public int editStateDownById(Map<String, Object> map) throws Exception;

    public int deleteCrmDocumentaryTypeById(Map<String, Object> map) throws Exception;

}
