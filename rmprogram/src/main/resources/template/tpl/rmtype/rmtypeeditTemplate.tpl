{{#bean}}
    <div class="layui-form-item">
        <label class="layui-form-label">分类名<i class="red">*</i></label>
        <div class="layui-input-block">
        	<input type="text" id="rmTypeName" name="rmTypeName" win-verify="required" placeholder="请输入小程序分类名" class="layui-input" value="{{rmTypeName}}" maxlength="20"/>
        </div>
    </div>
    <div class="layui-form-item">
        <div class="layui-input-block">
            <button class="winui-btn" id="cancle"><language showName="com.skyeye.cancel"></language></button>
            <button class="winui-btn" lay-submit lay-filter="formEditBean"><language showName="com.skyeye.save"></language></button>
        </div>
    </div>
{{/bean}}