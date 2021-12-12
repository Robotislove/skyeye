/*******************************************************************************
 * Copyright 卫志强 QQ：598748873@qq.com Inc. All rights reserved. 开源地址：https://gitee.com/doc_wei01/skyeye
 ******************************************************************************/

package com.skyeye.eve.service;

import com.skyeye.common.object.InputObject;
import com.skyeye.common.object.OutputObject;

/**
 * @ClassName: LicenceApplyRevertService
 * @Description: 证照归还申请服务接口层
 * @author: skyeye云系列--卫志强
 * @date: 2021/8/1 10:49
 * @Copyright: 2021 https://gitee.com/doc_wei01/skyeye Inc. All rights reserved.
 * 注意：本内容仅限购买后使用.禁止私自外泄以及用于其他的商业目的
 */
public interface LicenceApplyRevertService {

    public void queryMyRevertLicenceList(InputObject inputObject, OutputObject outputObject) throws Exception;

    public void insertRevertLicenceMation(InputObject inputObject, OutputObject outputObject) throws Exception;

    public void queryRevertLicenceMationToDetails(InputObject inputObject, OutputObject outputObject) throws Exception;

    public void queryRevertLicenceMationToEdit(InputObject inputObject, OutputObject outputObject) throws Exception;

    public void updateRevertLicenceMationById(InputObject inputObject, OutputObject outputObject) throws Exception;

    public void editRevertLicenceToSubApproval(InputObject inputObject, OutputObject outputObject) throws Exception;

    public void updateRevertLicenceToCancellation(InputObject inputObject, OutputObject outputObject) throws Exception;

    public void updateRevertLicenceMationToRevoke(InputObject inputObject, OutputObject outputObject) throws Exception;

}
