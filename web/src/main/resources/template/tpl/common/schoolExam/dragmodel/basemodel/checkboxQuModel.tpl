<li id="checkboxQuModel">
	<!-- 多选题模板 -->
	<div class="dwToolbar_icon">
		<img src="../../assets/images/question_checkbox_icon.png"/>
		<span>多选题</span>
	</div>
	<div class="dwQuTypeModel">
		<div class="surveyQuItemBody quDragBody" checkNameIn="{{checkNameIn}}">
			<div class="initLine"></div>
			<div class="quInputCase" style="display: none;">
				<input type="hidden" name="quType" value="CHECKBOX" >
				<input type="hidden" name="quId" value="">
				<input type="hidden" name="orderById" value="0"/>
				<input type="hidden" name="fraction" value="1">
				<input type="hidden" name="saveTag" value="0">
				<input type="hidden" name="hoverTag" value="0">
				<input type="hidden" name="hv" value="2">
				<input type="hidden" name="randOrder" value="0">
				<input type="hidden" name="cellCount" value="0">
				<input type="hidden" name="contactsAttr" value="0">
				<input type="hidden" name="contactsField" value="0">
				<div class="quLogicInputCase">
				<input type="hidden" name="quLogicItemNum" value="0">
				</div>
			</div>
			<div class="surveyQuItem">
				<div class="surveyQuItemLeftTools">
					<ul class="surveyQuItemLeftToolsUl">
						<li title="移动排序" class="dwQuMove"><div class="dwQuIcon"></div></li>
						<li title="设置" class="dwQuSet"><div class=dwQuIcon></div></li>
						<li title="逻辑" class="dwQuLogic"><div class="dwQuIcon"><div class="quLogicInfo"></div></div></li>
						<li title="知识点" class="knowledgeQuLogic"><div class="dwQuIcon"><div class="quKnowledgeInfo"></div></div></li>
						<li title="删除" class="dwQuDelete"><div class="dwQuIcon"></div></li>
					</ul>
				</div>
				<div class="surveyQuItemRightTools">
					<ul class="surveyQuItemRightToolsUl">
						<li class="questionUp"><div class="dwQuIcon"></div></li>
						<li class="questionDown"><div class="dwQuIcon"></div></li>
					</ul>
				</div>
				<div class="surveyQuItemContent">
					<div class="quCoTitle">
						<div class="quCoNum">1、</div>
						<div class="editAble quCoTitleEdit" >题标题？</div>
						<input type="hidden" name="quTitleSaveTag" value="0">
					</div>
					<div class="layui-tab layui-tab-brief" lay-filter="tab{{checkNameIn}}">
	          			<ul class="layui-tab-title">
	            			<li id="tab0" class="layui-this">默认</li>
	            			<li id="tab1" class=""><img src="../../assets/images/icon-vedio.png" class="layui-title-icon"/>插入视频</li>
							<li id="tab2" class=""><img src="../../assets/images/icon-audio.png" class="layui-title-icon"/>插入音频</li>
	            			<li id="tab3" class=""><img src="../../assets/images/icon-picture.png" class="layui-title-icon"/>插入图片</li>
	          			</ul>
	          			<div class="layui-tab-content">
	            			<div class="layui-tab-item layui-show">不插入任何内容</div>
	            			<div class="layui-tab-item">
			        			<div class="upload questionVedio" id="questionVedio{{checkNameIn}}"></div>
							</div>
							<div class="layui-tab-item">
								<div class="upload questionAudio" id="questionAudio{{checkNameIn}}"></div>
							</div>
	            			<div class="layui-tab-item">
								<div class="upload questionPicture" id="questionPicture{{checkNameIn}}"></div>
							</div>
	          			</div>
	        		</div>
					<div class="quCoItem"><ul>
						<li class="quCoItemUlLi">
							<input type="checkbox" name="checkBoxName{{checkNameIn}}">
							<label class="editAble quCoOptionEdit">选项1</label>
							<div class="quItemInputCase">
								<input type="hidden" name="quItemId" value="">
								<input type="hidden" name="quItemSaveTag" value="0">
								<input type="hidden" name="isNote" value="0">
								<input type="hidden" name="checkType" value="NO">
								<input type="hidden" name="isRequiredFill" value="0">
							</div>
						</li>
						<li class="quCoItemUlLi">
							<input type="checkbox" name="checkBoxName{{checkNameIn}}">
							<label class="editAble quCoOptionEdit">选项2</label>
							<div class="quItemInputCase">
								<input type="hidden" name="quItemId" value="">
								<input type="hidden" name="quItemSaveTag" value="0">
								<input type="hidden" name="isNote" value="0">
								<input type="hidden" name="checkType" value="NO">
								<input type="hidden" name="isRequiredFill" value="0">
							</div>
						</li>
						<li class="quCoItemUlLi">
							<input type="checkbox" name="checkBoxName{{checkNameIn}}">
							<label class="editAble quCoOptionEdit">选项3</label>
							<div class="quItemInputCase">
								<input type="hidden" name="quItemId" value="">
								<input type="hidden" name="quItemSaveTag" value="0">
								<input type="hidden" name="isNote" value="0">
								<input type="hidden" name="checkType" value="NO">
								<input type="hidden" name="isRequiredFill" value="0">
							</div>
						</li>
					</ul></div>
					<div class="quCoBottomTools" >
						<ul class="quCoBottomToolsUl" >
							<li class="addOption" title="添加"><div class="dwQuIcon"></div></li>
							<li class="addMoreOption" title="批量添加"><div class="dwQuIcon" ></div></li>
						</ul>
					</div>
					<fieldset class="layui-elem-field site-demo-button">
						<legend>是否允许拍照/上传图片</legend>
	  					<div>
	    					<div class="layui-input-block winui-radio">
	            				<input type="radio" name="whetherUpload{{checkNameIn}}" value="1" title="是" lay-filter="whetherUpload{{checkNameIn}}"/>
	            				<input type="radio" name="whetherUpload{{checkNameIn}}" value="2" title="否" lay-filter="whetherUpload{{checkNameIn}}" checked="true"/>
	        				</div>
	  					</div>
					</fieldset>
				</div>
			</div>
		</div>
	</div>
</li>