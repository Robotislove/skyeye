{{#bean}}
	<div class="layui-form-item layui-col-xs12">
		<span class="hr-title ver-center">
			{{jobTitle}}({{typeName}})
		</span>
		<hr>
	</div>
	
    <div class="layui-form-item layui-col-xs6">
        <label class="layui-form-label">收件人：</label>
        <div class="layui-input-block ver-center">
        	{{userName}}
        </div>
    </div>
    <div class="layui-form-item layui-col-xs12">
        <label class="layui-form-label">已完成工作：</label>
        <div class="layui-input-block ver-center" style="display: table;">
        	{{{completedJob}}}
        </div>
    </div>
    <div class="layui-form-item layui-col-xs12">
        <label class="layui-form-label">未完成工作：</label>
        <div class="layui-input-block ver-center" style="display: table;">
        	{{{incompleteJob}}}
        </div>
    </div>
    <div class="layui-form-item layui-col-xs12">
        <label class="layui-form-label">需协调工作：</label>
        <div class="layui-input-block ver-center" style="display: table;">
        	{{{coordinaJob}}}
        </div>
    </div>
    <div class="layui-form-item layui-col-xs12">
        <label class="layui-form-label">备注：</label>
        <div class="layui-input-block">
        	{{jobRemark}}
        </div>
    </div>
    <div class="layui-form-item layui-col-xs12">
        <label class="layui-form-label">附件：</label>
        <div class="layui-input-block ver-center" id="enclosureUploadBtn">
        </div>
    </div>
{{/bean}}