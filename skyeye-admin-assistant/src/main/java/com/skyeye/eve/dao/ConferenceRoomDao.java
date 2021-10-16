/*******************************************************************************
 * Copyright 卫志强 QQ：598748873@qq.com Inc. All rights reserved. 开源地址：https://gitee.com/doc_wei01/skyeye
 ******************************************************************************/

package com.skyeye.eve.dao;

import java.util.List;
import java.util.Map;

/**
 *
 * @ClassName: ConferenceRoomDao
 * @Description: 会议室管理数据层
 * @author: skyeye云系列--卫志强
 * @date: 2021/8/1 15:24
 *
 * @Copyright: 2021 https://gitee.com/doc_wei01/skyeye Inc. All rights reserved.
 * 注意：本内容仅限购买后使用.禁止私自外泄以及用于其他的商业目的
 */
public interface ConferenceRoomDao {

	public List<Map<String, Object>> selectAllConferenceRoomMation(Map<String, Object> map) throws Exception;

	public int insertConferenceRoomMation(Map<String, Object> map) throws Exception;

	public int deleteConferenceRoomById(Map<String, Object> map) throws Exception;

	public Map<String, Object> queryConferenceRoomState(Map<String, Object> map) throws Exception;

	public int updateConferenceRoomRepairById(Map<String, Object> map) throws Exception;

	public int updateConferenceRoomScrapById(Map<String, Object> map) throws Exception;

	public Map<String, Object> selectConferenceRoomDetailsById(Map<String, Object> map) throws Exception;

	public int updateConferenceRoomNormalById(Map<String, Object> map) throws Exception;

	public Map<String, Object> queryConferenceRoomMationById(Map<String, Object> map) throws Exception;

	public int editConferenceRoomMationById(Map<String, Object> map) throws Exception;
	
	public Map<String, Object> queryUserCompanyById(Map<String, Object> user) throws Exception;
	
	public List<Map<String, Object>> selectConferenceRoomListToChoose(Map<String, Object> map) throws Exception;
	
	public int updateLicenceBorrowMation(Map<String, Object> map) throws Exception;
	
}
