/*******************************************************************************
 * Copyright 卫志强 QQ：598748873@qq.com Inc. All rights reserved. 开源地址：https://gitee.com/doc_wei01/skyeye
 ******************************************************************************/

package com.skyeye.activiti.service.impl;

import com.skyeye.activiti.service.ActivitiModelService;
import com.skyeye.activiti.service.ActivitiTaskService;
import com.skyeye.activiti.service.CounterSignService;
import com.skyeye.annotation.transaction.ActivitiAndBaseTransaction;
import com.skyeye.common.constans.ActivitiConstants;
import com.skyeye.common.object.InputObject;
import com.skyeye.common.object.OutputObject;
import net.sf.json.JSONArray;
import org.flowable.bpmn.model.MultiInstanceLoopCharacteristics;
import org.flowable.bpmn.model.UserTask;
import org.flowable.common.engine.impl.el.ExpressionManager;
import org.flowable.engine.ProcessEngine;
import org.flowable.engine.RepositoryService;
import org.flowable.engine.RuntimeService;
import org.flowable.engine.TaskService;
import org.flowable.engine.impl.bpmn.behavior.MultiInstanceActivityBehavior;
import org.flowable.engine.impl.bpmn.behavior.ParallelMultiInstanceBehavior;
import org.flowable.engine.impl.bpmn.behavior.SequentialMultiInstanceBehavior;
import org.flowable.engine.impl.bpmn.behavior.UserTaskActivityBehavior;
import org.flowable.engine.impl.cfg.ProcessEngineConfigurationImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * @ClassName: CounterSignServiceImpl
 * @Description: 会签相关服务类
 * @author: skyeye云系列--卫志强
 * @date: 2021/12/13 20:45
 * @Copyright: 2021 https://gitee.com/doc_wei01/skyeye Inc. All rights reserved.
 * 注意：本内容仅限购买后使用.禁止私自外泄以及用于其他的商业目的
 */
@Service
public class CounterSignServiceImpl implements CounterSignService {

    @Autowired
    private ProcessEngine processEngine;

    @Autowired
    private TaskService taskService;

    @Autowired
    private RepositoryService repositoryService;

    @Autowired
    private RuntimeService runtimeService;

    @Autowired
    private ActivitiTaskService activitiTaskService;

    @Autowired
    private ActivitiModelService activitiModelService;

    /**
     * 将 普通节点转换成为会签 任务
     *
     * @param inputObject
     * @param outputObject
     * @throws Exception
     */
    @Override
    @ActivitiAndBaseTransaction(value = {"transactionManager"})
    public void covertToMultiInstance(InputObject inputObject, OutputObject outputObject) throws Exception {
        Map<String, Object> params = inputObject.getParams();
        String taskId = params.get("taskId").toString();
        boolean sequential = Boolean.parseBoolean(params.get("sequential").toString());
        List<String> userIds = JSONArray.fromObject(params.get("userIds").toString());
        this.covertToMultiInstance(taskId, sequential, userIds);
        activitiModelService.queryProHighLighted(params.get("processInstanceId").toString());
    }

    /**
     * 创建多实例 循环解释器
     *
     * @param isSequential    是否串行
     * @param assigneeListExp 用户组表达
     * @param assignee        用户标识
     * @return
     */
    @Override
    public MultiInstanceLoopCharacteristics createMultiInstanceLoopCharacteristics(boolean isSequential, String assigneeListExp, String assignee) {
        MultiInstanceLoopCharacteristics multiInstanceLoopCharacteristics = new MultiInstanceLoopCharacteristics();
        // 是否串行
        multiInstanceLoopCharacteristics.setSequential(isSequential);
        // 审批人集合参数
        multiInstanceLoopCharacteristics.setInputDataItem(assigneeListExp);
        // 迭代集合
        multiInstanceLoopCharacteristics.setElementVariable(assignee);
        // 完成条件 已完成数等于实例数${nrOfActiveInstances == nrOfInstances}
        multiInstanceLoopCharacteristics.setCompletionCondition("${nrOfActiveInstances == nrOfInstances}");
        return multiInstanceLoopCharacteristics;
    }

    /**
     * 创建多实例 循环解释器
     *
     * @param isSequential 是否 串行
     * @return
     */
    @Override
    public MultiInstanceLoopCharacteristics createMultiInstanceLoopCharacteristics(boolean isSequential) {
        return this.createMultiInstanceLoopCharacteristics(isSequential, ActivitiConstants.DEFAULT_ASSIGNEE_LIST_EXP, ActivitiConstants.ASSIGNEE_USER);
    }

    /**
     * 创建 多实例 行为解释器
     *
     * @param currentTask 当前任务节点
     * @param sequential 是否串行
     * @return
     */
    @Override
    public MultiInstanceActivityBehavior createMultiInstanceBehavior(UserTask currentTask, boolean sequential) {
        return createMultiInstanceBehavior(currentTask, sequential, ActivitiConstants.DEFAULT_ASSIGNEE_LIST_EXP,
            ActivitiConstants.ASSIGNEE_USER);
    }

    /**
     * 创建多实例行为解释器
     *
     * @param currentTask 当前任务节点
     * @param sequential 是否串行
     * @param assigneeListExp 用户组表达
     * @param assigneeExp 用户标识
     * @return
     */
    @Override
    public MultiInstanceActivityBehavior createMultiInstanceBehavior(UserTask currentTask, boolean sequential,
                                                                     String assigneeListExp, String assigneeExp) {
        ProcessEngineConfigurationImpl processEngineConfiguration = (ProcessEngineConfigurationImpl) processEngine.getProcessEngineConfiguration();
        /**
         *  创建解释器
         */
        UserTaskActivityBehavior userTaskActivityBehavior = processEngineConfiguration.getActivityBehaviorFactory()
            .createUserTaskActivityBehavior(currentTask);

        MultiInstanceActivityBehavior behavior = null;
        if (sequential) {
            behavior = new SequentialMultiInstanceBehavior(currentTask, userTaskActivityBehavior);
        } else {
            behavior = new ParallelMultiInstanceBehavior(currentTask, userTaskActivityBehavior);
        }

        /**
         *   注入表达式 解释器
         */
        ExpressionManager expressionManager = processEngineConfiguration.getExpressionManager();

        /**
         * 设置表达式变量
         */
        behavior.setCollectionExpression(expressionManager.createExpression(assigneeListExp));
        behavior.setCollectionElementVariable(assigneeExp);

        return behavior;
    }

    /**
     * 将 普通节点转换成为会签 任务
     *
     * @param taskId 任务id
     * @param sequential 是否串行
     * @param userIds 用户id
     */
    @Override
    public void covertToMultiInstance(String taskId, boolean sequential, List<String> userIds) {
        this.covertToMultiInstance(taskId, sequential, ActivitiConstants.ASSIGNEE_USER_EXP, userIds);
    }

    /**
     * 将 普通节点转换成为会签 任务
     *
     * @param taskId 任务id
     * @param sequential 是否串行
     * @param assigneeExp 任务执行人表达式
     * @param userIds 用户id
     */
    @Override
    public void covertToMultiInstance(String taskId, boolean sequential, String assigneeExp, List<String> userIds) {
        UserTask currentTaskNode = activitiTaskService.getCurrentUserTaskByTaskId(taskId);
        currentTaskNode.setAssignee(assigneeExp);
        // 设置多实例属性
        currentTaskNode.setLoopCharacteristics(createMultiInstanceLoopCharacteristics(sequential));
        currentTaskNode.setAssignee(ActivitiConstants.ASSIGNEE_USER_EXP);
        // 设置监听器
        // 这里需要注意一下，当用户节点设置了多实例属性后，设置监听器时是设置executionListeners而不是taskListeners。
        // 类要实现ExecutionListener或者JavaDelegate，普通用户节点实现TaskListener。
        // 还有多实例属性中loopCardinality和inputDataItem两个必须设置一个，这个在部署流程似有校验
//        currentTaskNode.setExecutionListeners(this.getActivitiListener());
        // 设置审批人
        currentTaskNode.setCandidateUsers(userIds);

    }

//    private List<ActivitiListener> getActivitiListener(){
//        List<ActivitiListener> activitiListener = new ArrayList<>();
//        Map<String, String> listeners = new HashMap<>();
//        // 完成时回调
//        listeners.put(ExecutionListener.EVENTNAME_TAKE, "com.skyeye.activiti.listener.MultiInstanceloopListener");
//        for (String key: listeners.keySet()) {
//            ActivitiListener listener = new ActivitiListener();
//            listener.setEvent(key);
//            // Spring配置以变量形式调用无法写入，只能通过继承TaskListener方法，
//            listener.setImplementationType("class");
//            listener.setImplementation(listeners.get(key));
//            activitiListener.add(listener);
//        }
//        return activitiListener;
//    }

}