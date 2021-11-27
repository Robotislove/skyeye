/*******************************************************************************
 * Copyright 卫志强 QQ：598748873@qq.com Inc. All rights reserved. 开源地址：https://gitee.com/doc_wei01/skyeye
 ******************************************************************************/
package com.skyeye.eve.service.impl;

import com.skyeye.common.object.InputObject;
import com.skyeye.common.object.OutputObject;
import com.skyeye.common.util.DateUtil;
import com.skyeye.common.util.ToolUtil;
import com.skyeye.eve.dao.PlanProjectFlowDao;
import com.skyeye.eve.service.PlanProjectFlowService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@Service
public class PlanProjectFlowServiceImpl implements PlanProjectFlowService{
	
	@Autowired
	private PlanProjectFlowDao planProjectFlowDao;

	/**
	 * 
	     * @Title: queryPlanProjectFlowList
	     * @Description: 获取项目规划-项目流程图表列表
	     * @param inputObject
	     * @param outputObject
	     * @throws Exception    参数
	     * @return void    返回类型
	     * @throws
	 */
	@Override
	public void queryPlanProjectFlowList(InputObject inputObject, OutputObject outputObject) throws Exception {
		Map<String, Object> map = inputObject.getParams();
		List<Map<String, Object>> beans = planProjectFlowDao.queryPlanProjectFlowList(map);
		if(!beans.isEmpty()){
			beans.forEach(bean -> {
				if("1".equals(bean.get("isParent").toString())){
					bean.put("isParent", true);
				}else{
					bean.put("isParent", false);
				}
			});
			outputObject.setBeans(beans);
			outputObject.settotal(beans.size());
		}
	}

	/**
	 * 
	     * @Title: insertPlanProjectFlowMation
	     * @Description: 添加项目规划-项目流程图表信息
	     * @param inputObject
	     * @param outputObject
	     * @throws Exception    参数
	     * @return void    返回类型
	     * @throws
	 */
	@Override
	@Transactional(value="transactionManager")
	public void insertPlanProjectFlowMation(InputObject inputObject, OutputObject outputObject) throws Exception {
		Map<String, Object> map = inputObject.getParams();
		Map<String, Object> bean = planProjectFlowDao.queryPlanProjectFlowMationByName(map);
		if(bean == null){
			Map<String, Object> user = inputObject.getLogParams();
			map.put("id", ToolUtil.getSurFaceId());
			map.put("createId", user.get("id"));
			map.put("createTime", DateUtil.getTimeAndToString());
			planProjectFlowDao.insertPlanProjectFlowMation(map);
		}else{
			outputObject.setreturnMessage("该项目规划-项目流程图表名称已存在，不可进行二次保存");
		}
	}

	/**
	 * 
	     * @Title: deletePlanProjectFlowMationById
	     * @Description: 删除项目规划-项目流程图表信息
	     * @param inputObject
	     * @param outputObject
	     * @throws Exception    参数
	     * @return void    返回类型
	     * @throws
	 */
	@Override
	@Transactional(value="transactionManager")
	public void deletePlanProjectFlowMationById(InputObject inputObject, OutputObject outputObject) throws Exception {
		Map<String, Object> map = inputObject.getParams();
		Map<String, Object> bean = planProjectFlowDao.queryChildNumMationById(map);
		if(Integer.parseInt(bean.get("childNum").toString()) == 0){//判断是否有子项
			planProjectFlowDao.deletePlanProjectFlowMationById(map);
		}else{
			outputObject.setreturnMessage("该目录下存在子项，无法直接删除。");
		}
		
	}

	/**
	 * 
	     * @Title: queryPlanProjectFlowMationToEditById
	     * @Description: 编辑项目规划-项目流程图表信息时进行回显
	     * @param inputObject
	     * @param outputObject
	     * @throws Exception    参数
	     * @return void    返回类型
	     * @throws
	 */
	@Override
	public void queryPlanProjectFlowMationToEditById(InputObject inputObject, OutputObject outputObject) throws Exception {
		Map<String, Object> map = inputObject.getParams();
		Map<String, Object> bean = planProjectFlowDao.queryPlanProjectFlowMationToEditById(map);
		outputObject.setBean(bean);
		outputObject.settotal(1);
	}

	/**
	 * 
	     * @Title: editPlanProjectFlowMationById
	     * @Description: 编辑项目规划-项目流程图表信息
	     * @param inputObject
	     * @param outputObject
	     * @throws Exception    参数
	     * @return void    返回类型
	     * @throws
	 */
	@Override
	@Transactional(value="transactionManager")
	public void editPlanProjectFlowMationById(InputObject inputObject, OutputObject outputObject) throws Exception {
		Map<String, Object> map = inputObject.getParams();
		Map<String, Object> bean = planProjectFlowDao.queryPlanProjectFlowMationByNameAndId(map);
		if(bean == null){
			planProjectFlowDao.editPlanProjectFlowMationById(map);
		}else{
			outputObject.setreturnMessage("该项目规划-项目流程图表名称已存在，不可进行二次保存");
		}
	}

	/**
	 * 
	     * @Title: queryPlanProjectFlowJsonContentMationById
	     * @Description: 获取项目流程图内容进行设计
	     * @param inputObject
	     * @param outputObject
	     * @throws Exception    参数
	     * @return void    返回类型
	     * @throws
	 */
	@Override
	public void queryPlanProjectFlowJsonContentMationById(InputObject inputObject, OutputObject outputObject) throws Exception {
		Map<String, Object> map = inputObject.getParams();
		Map<String, Object> bean = planProjectFlowDao.queryPlanProjectFlowJsonContentMationById(map);
		outputObject.setBean(bean);
	}

	/**
	 * 
	     * @Title: editPlanProjectFlowJsonContentMationById
	     * @Description: 设计项目流程图
	     * @param inputObject
	     * @param outputObject
	     * @throws Exception    参数
	     * @return void    返回类型
	     * @throws
	 */
	@Override
	@Transactional(value="transactionManager")
	public void editPlanProjectFlowJsonContentMationById(InputObject inputObject, OutputObject outputObject) throws Exception {
		Map<String, Object> map = inputObject.getParams();
		planProjectFlowDao.editPlanProjectFlowJsonContentMationById(map);
	}
	
}
