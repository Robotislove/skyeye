{{#bean}}
	<div class="layui-form-item layui-col-xs6">
        <label class="layui-form-label">名称<i class="red">*</i></label>
        <div class="layui-input-block">
        	<input type="text" id="taskName" name="taskName" value="{{taskName}}" placeholder="请输入任务名称" class="layui-input"  win-verify="required"  maxlength="100"/>
        </div>
    </div>
    <div class="layui-form-item layui-col-xs6">
        <label class="layui-form-label">类型<i class="red">*</i></label>
        <div class="layui-input-block">
			<select id="taskType" name="taskType" win-verify="required">
        		
        	</select>
        </div>
    </div>
    <div class="layui-form-item layui-col-xs6">
        <label class="layui-form-label">所属项目<i class="red">*</i></label>
        <div class="layui-input-block">
        	<select id="proId" name="proId" win-verify="required">
        		
        	</select>
        </div>
    </div>
    <div class="layui-form-item layui-col-xs6">
        <label class="layui-form-label">所属部门<i class="red">*</i></label>
        <div class="layui-input-block">
        	<select id="departments" name="departments" win-verify="required">
        		
        	</select>
        </div>
    </div>
    <div class="layui-form-item layui-col-xs6">
        <label class="layui-form-label">开始时间<i class="red">*</i></label>
        <div class="layui-input-block">
            <input type="text" id="startTime" name="startTime" value="{{taskName}}" placeholder="请选择开始时间" class="layui-input" win-verify="required"/>
        </div>
    </div>
    <div class="layui-form-item layui-col-xs6">
        <label class="layui-form-label">结束时间</label>
        <div class="layui-input-block">
            <input type="text" id="endTime" name="endTime" value="{{taskName}}" placeholder="请选择结束时间" class="layui-input" />
        </div>
    </div>
    <div class="layui-form-item layui-col-xs6">
        <label class="layui-form-label">执行人<i class="red">*</i></label>
        <div class="layui-input-block">
        	<input type="text" id="performId" name="performId" placeholder="请选择任务执行人" class="layui-input"/>
        	<i class="fa fa-user-plus input-icon" id="performIdSelPeople"></i>
        </div>
    </div>
    <div class="layui-form-item layui-col-xs6">
        <label class="layui-form-label">预估工作量<i class="red">*</i></label>
        <div class="layui-input-block">
        	<input type="text" id="estimatedWorkload" name="estimatedWorkload" value="{{estimatedWorkload}}" placeholder="完成工作需要多少天" class="layui-input" win-verify="required|number"/>
        </div>
    </div>
    <div class="layui-form-item layui-col-xs12">
        <label class="layui-form-label">任务说明<i class="red">*</i></label>
        <div class="layui-input-block">
        	<script id="taskInstructions" name="taskInstructions" type="text/plain"></script>
        </div>
    </div>
    <div class="layui-form-item layui-col-xs12">
        <label class="layui-form-label">附件</label>
        <div class="layui-input-block" id="enclosureUpload">
        	
        </div>
    </div>
    <div class="layui-form-item layui-col-xs12">
        <div class="layui-input-block">
            <button class="winui-btn" id="cancle"><language showName="com.skyeye.cancel"></language></button>
            <button class="winui-btn typeOne layui-hide" lay-submit lay-filter="formEditBean">保存为草稿</button>
            <button class="winui-btn typeOne layui-hide" lay-submit lay-filter="formSubBean">提交审批</button>
            <button class="winui-btn typeTwo layui-hide" lay-submit lay-filter="subBean"><language showName="com.skyeye.save"></language></button>
        </div>
    </div>
{{/bean}}