{{#bean}}
	<div class="layui-form-item layui-col-xs12">
		<span class="hr-title">基础信息</span><hr>
	</div>
	<div class="layui-form-item layui-col-xs6">
        <label class="layui-form-label">服务类型<i class="red">*</i></label>
        <div class="layui-input-block">
			<select id="typeId" name="typeId" win-verify="required" lay-filter="typeId" lay-search="">
				
			</select>
        </div>
    </div>
    <div class="layui-form-item layui-col-xs6">
        <label class="layui-form-label">报单时间<i class="red">*</i></label>
        <div class="layui-input-block">
            <input type="text" id="declarationTime" name="declarationTime" win-verify="required" placeholder="请选择报单时间" class="layui-input" value="{{declarationTime}}"/>
        </div>
    </div>
    <div class="layui-form-item layui-col-xs6">
        <label class="layui-form-label">客户</label>
        <div class="layui-input-block">
			<input type="text" id="customName" name="customName" placeholder="请选择客户" class="layui-input" readonly="readonly"/>
		    <i class="fa fa-plus-circle input-icon" id="customMationSel"></i>
        </div>
    </div>
    <div class="layui-form-item layui-col-xs6">
        <label class="layui-form-label">联系人<i class="red">*</i></label>
        <div class="layui-input-block">
            <input type="text" id="contacts" name="contacts" win-verify="required" placeholder="请输入联系人" class="layui-input" maxlength="10" value="{{contacts}}"/>
        </div>
    </div>
    <div class="layui-form-item layui-col-xs6">
        <label class="layui-form-label">联系电话<i class="red">*</i></label>
        <div class="layui-input-block">
            <input type="text" id="phone" name="phone" win-verify="required|phone" placeholder="请输入联系电话" class="layui-input" maxlength="20" value="{{phone}}"/>
        </div>
    </div>
    <div class="layui-form-item layui-col-xs6">
        <label class="layui-form-label">邮箱</label>
        <div class="layui-input-block">
            <input type="text" id="email" name="email" win-verify="email" placeholder="请输入邮箱" class="layui-input" maxlength="50" value="{{email}}"/>
        </div>
    </div>
    <div class="layui-form-item layui-col-xs6">
        <label class="layui-form-label">QQ</label>
        <div class="layui-input-block">
            <input type="text" id="qq" name="qq" placeholder="请输入QQ" class="layui-input" maxlength="15" value="{{qq}}"/>
        </div>
    </div>
    <div class="layui-form-item layui-col-xs12">
        <label class="layui-form-label">所在地区<i class="red">*</i></label>
        <div class="layui-input-block" id="lockParentSel">
        </div>
    </div>
    <div class="layui-form-item layui-col-xs12">
        <label class="layui-form-label">详细地址<i class="red">*</i></label>
        <div class="layui-input-block">
        	<input type="text" id="addressDetailed" name="addressDetailed" win-verify="required" placeholder="请输入公司详细地址" class="layui-input" maxlength="50" value="{{addressDetailed}}"/>
        </div>
    </div>
    
    <div class="layui-form-item layui-col-xs12">
		<span class="hr-title">商品信息</span><hr>
	</div>
    <div class="layui-form-item layui-col-xs6">
        <label class="layui-form-label">商品名称</label>
        <div class="layui-input-block">
            <input type="text" id="productName" name="productName" placeholder="请输入商品名称" class="layui-input" maxlength="50" value="{{materialName}}" readonly="readonly"/>
            <i class="fa fa-plus-circle input-icon" id="productNameSel"></i>
        </div>
    </div>
    <div class="layui-form-item layui-col-xs6">
        <label class="layui-form-label">规格型号</label>
        <div class="layui-input-block">
            <input type="text" id="productNorms" name="productNorms" placeholder="请输入规格型号" class="layui-input" maxlength="50" value="{{materialModel}}"/>
        </div>
    </div>
    <div class="layui-form-item layui-col-xs6">
        <label class="layui-form-label">序列号</label>
        <div class="layui-input-block">
            <input type="text" id="productSerialNum" name="productSerialNum" placeholder="请输入序列号" class="layui-input" maxlength="100" value="{{productSerialNum}}"/>
        </div>
    </div>
    <div class="layui-form-item layui-col-xs6">
        <label class="layui-form-label">质保类型</label>
        <div class="layui-input-block">
            <select id="productWarranty" name="productWarranty" lay-search="">
				<option value="">请选择</option>
				<option value="1">保内</option>
				<option value="2">保外</option>
			</select>
        </div>
    </div>
    
    <div class="layui-form-item layui-col-xs12">
		<span class="hr-title">工单信息</span><hr>
	</div>
	<div class="layui-form-item layui-col-xs6">
        <label class="layui-form-label">紧急程度<i class="red">*</i></label>
        <div class="layui-input-block">
			<select id="urgencyId" name="urgencyId" win-verify="required" lay-search="">
				
			</select>
        </div>
    </div>
    <div class="layui-form-item layui-col-xs6">
        <label class="layui-form-label">处理方式<i class="red">*</i></label>
        <div class="layui-input-block">
			<select id="modeId" name="modeId" win-verify="required" lay-search="">
				
			</select>
        </div>
    </div>
    <div class="layui-form-item layui-col-xs12">
        <label class="layui-form-label">服务内容<i class="red">*</i></label>
        <div class="layui-input-block">
			<textarea id="content" name="content" win-verify="required" placeholder="请输入服务内容" class="layui-textarea" style="height: 100px;" maxlength="400">{{content}}</textarea>
        </div>
    </div>
    <div class="layui-form-item layui-col-xs6">
        <label class="layui-form-label">工单接收人</label>
        <div class="layui-input-block">
        	<input type="text" id="serviceUserId" name="serviceUserId" placeholder="请选择工单接收人" disabled class="layui-input"/>
		    <i class="fa fa-user-plus input-icon" id="serviceUserIdSelPeople"></i>
        </div>
    </div>
    <div class="layui-form-item layui-col-xs6">
        <label class="layui-form-label">指定预约时间</label>
        <div class="layui-input-block">
            <input type="text" id="pointSubscribeTime" name="pointSubscribeTime" win-verify="" placeholder="请选择指定预约时间" class="layui-input" value="{{pointSubscribeTime}}"/>
        </div>
    </div>
    <div class="layui-form-item layui-col-xs12">
        <label class="layui-form-label">工单协助人</label>
        <div class="layui-input-block">
        	<input type="text" id="cooperationUserId" name="cooperationUserId" placeholder="请选择工单协助人" class="layui-input"/>
		    <i class="fa fa-user-plus input-icon" id="cooperationUserIdSelPeople"></i>
        </div>
    </div>
    <div class="layui-form-item layui-col-xs12">
        <label class="layui-form-label">相关照片</label>
        <div class="layui-input-block">
        	<div class="upload" id="sheetPicture"></div>
        </div>
    </div>
    <div class="layui-form-item layui-col-xs12">
        <label class="layui-form-label">相关附件</label>
        <div class="layui-input-block" id="enclosureUpload">
        </div>
    </div>
    <div class="layui-form-item layui-col-xs12">
		<div class="layui-input-block">
			<button class="winui-btn" id="cancle"><language showName="com.skyeye.cancel"></language></button>
			<button class="winui-btn" lay-submit lay-filter="formEditBean"><language showName="com.skyeye.save"></language></button>
		</div>
	</div>
{{/bean}}