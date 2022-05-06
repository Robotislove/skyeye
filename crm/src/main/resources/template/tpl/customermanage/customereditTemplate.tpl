{{#bean}}
	<div class="layui-form-item layui-col-xs12">
		<span class="hr-title">基本信息</span><hr>
	</div>
    <div class="layui-form-item layui-col-xs6">
        <label class="layui-form-label">客户名称<i class="red">*</i></label>
        <div class="layui-input-block">
            <input type="text" id="name" name="name" win-verify="required" placeholder="请输入客户名称" class="layui-input" maxlength="50" value="{{name}}"/>
        </div>
    </div>
    <div class="layui-form-item layui-col-xs6">
        <label class="layui-form-label">拼音</label>
        <div class="layui-input-block">
            <input type="text" id="combine" name="combine" placeholder="请输入拼音" class="layui-input" maxlength="100" value="{{combine}}"/>
        </div>
    </div>
    <div class="layui-form-item layui-col-xs6">
        <label class="layui-form-label">分类<i class="red">*</i></label>
        <div class="layui-input-block">
			<select id="typeId" name="typeId" win-verify="required" lay-filter="typeId" lay-search="">
				
			</select>
        </div>
    </div>
    <div class="layui-form-item layui-col-xs6">
        <label class="layui-form-label">客户来源<i class="red">*</i></label>
        <div class="layui-input-block">
			<select id="fromId" name="fromId" win-verify="required" lay-filter="fromId" lay-search="">
				
			</select>
        </div>
    </div>
    <div class="layui-form-item layui-col-xs6">
        <label class="layui-form-label">客户分组<i class="red">*</i></label>
        <div class="layui-input-block">
			<select id="groupId" name="groupId" win-verify="required" lay-filter="fromId" lay-search="">
				
			</select>
        </div>
    </div>
    <div class="layui-form-item layui-col-xs6">
        <label class="layui-form-label">所属行业<i class="red">*</i></label>
        <div class="layui-input-block">
			<select id="industryId" name="industryId" win-verify="required" lay-filter="industryId" lay-search="">
				
			</select>
        </div>
    </div>
    <div class="layui-form-item layui-col-xs6">
        <label class="layui-form-label">客户网址</label>
        <div class="layui-input-block">
            <input type="text" id="cusUrl" name="cusUrl" placeholder="请输入客户网址" win-verify="url" class="layui-input" maxlength="100" value="{{cusUrl}}"/>
        </div>
    </div>
    <div class="layui-form-item layui-col-xs6">
        <label class="layui-form-label">国家/地区</label>
        <div class="layui-input-block">
            <input type="text" id="country" name="country" placeholder="请输入国家/地区" class="layui-input" maxlength="15" value="{{country}}"/>
        </div>
    </div>
    <div class="layui-form-item layui-col-xs6">
        <label class="layui-form-label">所在城市</label>
        <div class="layui-input-block">
            <input type="text" id="city" name="city" placeholder="请输入所在城市" class="layui-input" maxlength="15" value="{{city}}"/>
        </div>
    </div>
    <div class="layui-form-item layui-col-xs12">
        <label class="layui-form-label">详细地址</label>
        <div class="layui-input-block">
            <input type="text" id="detailAddress" name="detailAddress" placeholder="请输入详细地址" class="layui-input" maxlength="75" value="{{detailAddress}}"/>
        </div>
    </div>
    <div class="layui-form-item layui-col-xs6">
        <label class="layui-form-label">邮政编码</label>
        <div class="layui-input-block">
            <input type="text" id="postalCode" name="postalCode" win-verify="postcode" placeholder="请输入邮政编码" class="layui-input" maxlength="10" value="{{postalCode}}"/>
        </div>
    </div>
    <div class="layui-form-item layui-col-xs6">
        <label class="layui-form-label">传真</label>
        <div class="layui-input-block">
            <input type="text" id="fax" name="fax" placeholder="请输入传真" class="layui-input" maxlength="20" value="{{fax}}"/>
        </div>
    </div>
    <div class="layui-form-item layui-col-xs6">
        <label class="layui-form-label">客户负责人</label>
        <div class="layui-input-block">
        	<input type="text" id="relationUserId" name="relationUserId" placeholder="请选择客户负责人" class="layui-input" readonly="readonly"/>
		    <i class="fa fa-user-plus input-icon" id="userNameSelPeople"></i>
        </div>
    </div>
    <div class="layui-form-item layui-col-xs6">
        <label class="layui-form-label">操机工</label>
        <div class="layui-input-block">
            <input type="text" id="mechanicName" name="mechanicName" placeholder="请输入操机工" class="layui-input" maxlength="10" value="{{mechanicName}}"/>
        </div>
    </div>
    <div class="layui-form-item layui-col-xs6">
        <label class="layui-form-label">操机工电话</label>
        <div class="layui-input-block">
            <input type="text" id="mechanicPhone" name="mechanicPhone" placeholder="请输入操机工电话" win-verify="phone" class="layui-input" maxlength="11" value="{{mechanicPhone}}"/>
        </div>
    </div>
    <div class="layui-form-item layui-col-xs6">
        <label class="layui-form-label">法人代表</label>
        <div class="layui-input-block">
            <input type="text" id="corRepresentative" name="corRepresentative" placeholder="请输入法人代表" class="layui-input" maxlength="15" value="{{corRepresentative}}"/>
        </div>
    </div>
    <div class="layui-form-item layui-col-xs6">
        <label class="layui-form-label">注册资本</label>
        <div class="layui-input-block">
            <input type="text" id="regCapital" name="regCapital" placeholder="请输入注册资本" class="layui-input" maxlength="15" value="{{regCapital}}"/>
        </div>
    </div>
    <div class="layui-form-item layui-col-xs12">
        <label class="layui-form-label">附加说明</label>
        <div class="layui-input-block">
        	<textarea id="addDesc" name="addDesc"  placeholder="请输入附加说明" class="layui-textarea" style="height: 100px;" maxlength="200">{{addDesc}}</textarea>
        </div>
    </div>
    <div class="layui-form-item layui-col-xs12">
        <label class="layui-form-label">附件资料</label>
        <div class="layui-input-block" id="enclosureUpload">
        </div>
    </div>
    <div class="layui-form-item layui-col-xs12">
		<span class="hr-title">财务信息</span><hr>
	</div>
	<div class="layui-form-item layui-col-xs6">
        <label class="layui-form-label">银行账户</label>
        <div class="layui-input-block">
            <input type="text" id="bankAccount" name="bankAccount" placeholder="请输入银行账号" class="layui-input" maxlength="30" value="{{bankAccount}}"/>
        </div>
    </div>
    <div class="layui-form-item layui-col-xs6">
        <label class="layui-form-label">开户名称</label>
        <div class="layui-input-block">
            <input type="text" id="accountName" name="accountName" placeholder="请输入开户名称" class="layui-input" maxlength="50" value="{{accountName}}"/>
        </div>
    </div>
    <div class="layui-form-item layui-col-xs6">
        <label class="layui-form-label">开户银行</label>
        <div class="layui-input-block">
            <input type="text" id="bankName" name="bankName" placeholder="请输入开户银行" class="layui-input" maxlength="20" value="{{bankName}}"/>
        </div>
    </div>
    <div class="layui-form-item layui-col-xs6">
        <label class="layui-form-label">银行地址</label>
        <div class="layui-input-block">
            <input type="text" id="bankAddress" name="bankAddress" placeholder="请输入银行地址" class="layui-input" maxlength="50" value="{{bankAddress}}"/>
        </div>
    </div>
    <div class="layui-form-item layui-col-xs6">
        <label class="layui-form-label">税号</label>
        <div class="layui-input-block">
            <input type="text" id="dutyParagraph" name="dutyParagraph" placeholder="请输入税号" class="layui-input" maxlength="15" value="{{dutyParagraph}}"/>
        </div>
    </div>
    <div class="layui-form-item layui-col-xs6">
        <label class="layui-form-label">电话</label>
        <div class="layui-input-block">
            <input type="text" id="financePhone" win-verify="tel" name="financePhone" placeholder="请输入电话" class="layui-input" maxlength="20" value="{{financePhone}}"/>
        </div>
    </div>
    <div class="layui-form-item layui-col-xs12">
		<div class="layui-input-block">
			<button class="winui-btn" id="cancle"><language showName="com.skyeye.cancel"></language></button>
			<button class="winui-btn" lay-submit lay-filter="formEditBean"><language showName="com.skyeye.save"></language></button>
		</div>
	</div>
{{/bean}}