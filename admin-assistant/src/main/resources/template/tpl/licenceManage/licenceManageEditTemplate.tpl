{{#bean}}
	<div class="layui-form-item">
        <label class="layui-form-label">证照名称<i class="red">*</i></label>
        <div class="layui-input-block">
            <input type="text" id="licenceName" name="licenceName" win-verify="required" placeholder="请输入证照名称" class="layui-input" value="{{licenceName}}"/>
        </div>
    </div>
    <div class="layui-form-item">
        <label class="layui-form-label">证照编号<i class="red">*</i></label>
        <div class="layui-input-block">
            <input type="text" id="licenceNum" name="licenceNum" win-verify="required" placeholder="请输入证照编号" class="layui-input" value="{{licenceNum}}"/>
        </div>
    </div>
    <div class="layui-form-item">
        <label class="layui-form-label">签发机关<i class="red">*</i></label>
        <div class="layui-input-block">
            <input type="text" id="issuingOrganization" name="issuingOrganization" win-verify="required" placeholder="请输入签发机关" class="layui-input" value="{{issuingOrganization}}"/>
        </div>
    </div>
    <div class="layui-form-item">
        <label class="layui-form-label">签发时间<i class="red">*</i></label>
        <div class="layui-input-block">
            <input type="text" id="issueTime" name="issueTime" win-verify="required" placeholder="请选择签发时间" class="layui-input" value="{{issueTime}}"/>
        </div>
    </div>
    <div class="layui-form-item">
        <label class="layui-form-label">是否年审<i class="red">*</i></label>
        <div class="layui-input-block winui-radio">
            <input type="radio" name="annualReview" value="1" title="是" lay-filter="annualReview" />
            <input type="radio" name="annualReview" value="2" title="否" lay-filter="annualReview" />
        </div>
    </div>
    <div class="layui-form-item" id="nextTime">
        <label class="layui-form-label">下次年审时间</label>
        <div class="layui-input-block">
            <input type="text" id="nextAnnualReview" name="nextAnnualReview" placeholder="请选择下次年审时间" class="layui-input" value="{{nextAnnualReview}}"/>
        </div>
    </div>
    <div class="layui-form-item">
        <label class="layui-form-label">有效期<i class="red">*</i></label>
        <div class="layui-input-block winui-radio">
            <input type="radio" name="termOfValidity" value="1" title="永久" lay-filter="termOfValidity" />
            <input type="radio" name="termOfValidity" value="2" title="非永久" lay-filter="termOfValidity" />
        </div>
    </div>
    <div class="layui-form-item layui-hide" id="termTime">
        <label class="layui-form-label">有效期至</label>
        <div class="layui-input-block">
            <input type="text" id="termOfValidityTime" name="termOfValidityTime" placeholder="请选择有效期截止时间"  class="layui-input" value="{{termOfValidityTime}}"/>
        </div>
    </div>
    <div class="layui-form-item">
        <label class="layui-form-label">管理人</label>
        <div class="layui-input-block">
        	<input type="text" id="licenceAdmin" name="licenceAdmin" placeholder="请选择管理人" class="layui-input"/>
		    <i class="fa fa-user-plus input-icon" id="userNameSelPeople"></i>
        </div>
    </div>
    <div class="layui-form-item">
        <label class="layui-form-label">借用人</label>
        <div class="layui-input-block">
        	<input type="text" id="borrowId" name="borrowId" placeholder="请选择借用人" class="layui-input"/>
		    <i class="fa fa-user-plus input-icon" id="borrowNameSelPeople"></i>
        </div>
    </div>
    <div class="layui-form-item">
        <label class="layui-form-label">相关描述</label>
        <div class="layui-input-block">
        	<textarea id="roomAddDesc" name="roomAddDesc"  placeholder="请输入相关描述" class="layui-textarea" style="height: 100px;" maxlength="200">{{roomAddDesc}}</textarea>
        </div>
    </div>
    <div class="layui-form-item">
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