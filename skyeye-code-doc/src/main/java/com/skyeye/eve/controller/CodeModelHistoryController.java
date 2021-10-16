/*******************************************************************************
 * Copyright 卫志强 QQ：598748873@qq.com Inc. All rights reserved. 开源地址：https://gitee.com/doc_wei01/skyeye
 ******************************************************************************/
package com.skyeye.eve.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.skyeye.common.object.InputObject;
import com.skyeye.common.object.OutputObject;
import com.skyeye.eve.service.CodeModelHistoryService;

@Controller
public class CodeModelHistoryController {
	
	@Autowired
	private CodeModelHistoryService codeModelHistoryService;
	
	/**
	 * 
	     * @Title: queryCodeModelHistoryList
	     * @Description: 获取模板生成历史列表
	     * @param inputObject
	     * @param outputObject
	     * @throws Exception    参数
	     * @return void    返回类型
	     * @throws
	 */
	@RequestMapping("/post/CodeModelHistoryController/queryCodeModelHistoryList")
	@ResponseBody
	public void queryCodeModelHistoryList(InputObject inputObject, OutputObject outputObject) throws Exception{
		codeModelHistoryService.queryCodeModelHistoryList(inputObject, outputObject);
	}
	
	/**
	 * 
	     * @Title: insertCodeModelHistoryCreate
	     * @Description: 重新生成文件
	     * @param inputObject
	     * @param outputObject
	     * @throws Exception    参数
	     * @return void    返回类型
	     * @throws
	 */
	@RequestMapping("/post/CodeModelHistoryController/insertCodeModelHistoryCreate")
	@ResponseBody
	public void insertCodeModelHistoryCreate(InputObject inputObject, OutputObject outputObject) throws Exception{
		codeModelHistoryService.insertCodeModelHistoryCreate(inputObject, outputObject);
	}
	
	/**
	 * 
	     * @Title: downloadCodeModelHistory
	     * @Description: 下载文件
	     * @param inputObject
	     * @param outputObject
	     * @throws Exception    参数
	     * @return void    返回类型
	     * @throws
	 */
	@RequestMapping("/post/CodeModelHistoryController/downloadCodeModelHistory")
	@ResponseBody
	public void downloadCodeModelHistory(InputObject inputObject, OutputObject outputObject) throws Exception{
		codeModelHistoryService.downloadCodeModelHistory(inputObject, outputObject);
	}
	
	
}
