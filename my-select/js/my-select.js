; (function ($, window, document, undefined) {
	$.fn.extend({
		mySelect: function (options) {

			//默认参数
			var defaults = {
				
				itemStyle:{
					display:'inline-block'
				},
				
				/* 输入框的显示样式 */
				textbox:{
					font:{
						size:'14px',
						family: "'Helvetica Neue', arial, sans-serif",	//字体种类
						color:'#000',
						weight:'normal',
						placeholder: "请选择"	//选择显示框的默认文字
					},
					
					itemStyle:{
						width: "180px",			//生成的select框宽度
						height: "30px",				//select 高度
						border: "1px solid deepskyblue",	//边框
						background: "bottom",		//背景色
						borderRadius:'0',			//边框弧度
						padding:'0 3px',
					}
				},
				/* 下拉列表样式 */
				options:{
					option:{
						lineHeight: "25px",				//select 高度
						splitLine:'none',
						padding:'0 3px',
						
						normal:{
							background: "bottom",		//背景色
							color:'#fff'
						},
						highLight:{
							color:'#fff',
							background:'deepskyblue'
						}
					},
					
					font:{
						size:'14px',
						weight:'normal',
						align:'left'
					},
					
					itemStyle:{
						height:'250px',
						width:'150px',
						background:'#00003e',
						border:'1px solid #536f80',
						borderRadius:'0'
					}
				},
				/* 滚动条样式 */
				scroll:{
					color:'deepskyblue',
					width:'4px',
					border:'none',
					boederRadius:'2px',
					stepSize:10
				},
				/* 箭头样式 */
				arrow:{
					content:'▼',
					height:'100%',
					width:'max-content',
					html:'none'
				}
			};
			
			function checkOptions(obj)
			{
			    for (var a in obj) {
			        if (typeof (obj[a]) == "object") {
			            checkOptions(obj[a]); //递归遍历
			        }
			        else {
						if(obj[a].trim() == ''){
							delete obj.a;
							console.info('delete option : \'' + a + '\'');
						}
			        }
			    }
			}
			
			checkOptions(options);

			//将默认的参数对象和传进来的参数对象合并在一起
			var opts = $.extend(true,{},defaults, options); 

			//重新为原select标签对象命名
			var $this = this;

			//隐藏原select标签，并且在其后添加需要的html元素
			$this.hide();
			$this.after('\
					<div class="select_container_nw" val="" text="">\
						<div class="select_main">\
							<span class="select_content">'+ opts.textbox.font.placeholder + '</span>\
							<span class="select_arrow"></span>\
						</div>\
						<div class="select_list">\
							<div class="select_list_body">\
								<ul class="select_list_ul">\
									<li class="no_result">'+ '没有选项' +'</li>\
								</ul>\
							</div>\
						</div>\
					</div>');

			//拿到新生成的对select替代的div
			var $This = $this.next();
			
			var selectName = $this.attr('name');
			$This.find('.select-replace-input').attr('name',selectName);

			//灌入原select的数据
			$this.find("option").each(function (index, element) {
				var $li = $('<li val=' + $(element).val() + '>' + $(element).text() + '</li>');
				if ($(element).prop("selected")) {
					$li.addClass("list_current");
					$This.find(".select_content").text($(element).text());
					// $This.find(".select-replace-input").val($(element).val());
				}
				$This.find(".no_result").before($li);
			});
			
			//监听原select的val变化(包括使用脚本修改val，和重置按钮事件)
			var thisVal = $this.val();
			setInterval(function(){
				var tmp = $this.val();
				if(tmp !== thisVal){
					thisVal = tmp;
					$This.find(".select_list_body").find('li').removeClass("list_current");
					$This.find(".select_list_body").find('li').css({'background':opts.options.itemStyle.background.trim(),'color':opts.options.option.normal.color.trim()});
					/* console.info($This.find(".select_list_body").find('li').length) */
					var $newSelected = $This.find(".select_list_body").find('li[val=\"' + thisVal + '\"]');
					$newSelected.addClass("list_current");
					$This.find(".select_content").text($newSelected.text());
				}
			},100);
			
			if($this.find("option").length > 0){
				$This.find(".no_result").hide();
			}
			
			/*初始化一些非自定义必须的样式*/
			$This.css({'position':'relative','vertical-align':'middle','cursor':'default'});
			$This.find('.select_content').css({'overflow':'hidden'});
			$This.find('.select_list').css({'position':'absolute','z-index':'99999'});
			$This.find(".select_list_ul").css({'list-style':'none','padding':'3px 0','margin':'0'});
			$This.find(".select_list_body").find("li").css({'padding':'0 5px','text-overflow': 'ellipsis','white-space': 'nowrap'});
			$This.find(".select_list_body").css({'overflow-y':'hidden','cursor':'pointer','height':'100%'})
			// 输入框的文字显示样式(过长字体隐藏，并且不遮挡右侧箭头)
			$This.find(".select_content").css({'width':'-webkit-fill-available','padding':'0 5px','overflow-x': 'hidden','text-overflow':'ellipsis','white-space': 'nowrap','display':'inline-block'});
			// 使得options中的选项文字不能被光标选中
			$This.find(".select_list_ul").css({'-moz-user-select':'none','-webkit-user-select':'none','user-select':'none'})
			
			/* 初始状态 option处于折叠状态 */
			$This.find('.select_list').hide();
			
			/* 根据传进来的参数，对select样式进行设置 */
			$This.css('display',opts.itemStyle.display.trim());
			
			/* 开始设置输入框样式 */
			$This.find('.select_main').css("width", opts.textbox.itemStyle.width.trim());
			$This.find('.select_list').css("min-width", opts.textbox.itemStyle.width.trim());
			
			$This.css('height',opts.textbox.itemStyle.height.trim());
			$This.css("line-height", opts.textbox.itemStyle.height.trim());
			$This.find('.select_main').css('height',opts.textbox.itemStyle.height.trim());
			if(opts.arrow.html.trim() == "none" && opts.arrow.content.trim() == "none"){
				$This.find('.select_main').hide();
			}else if(opts.arrow.html.trim() != "none"){
				$This.find('.select_arrow').html(opts.arrow.html.trim());
				$This.find('.select_main').css({'position':'relative'});
				$This.find('.select_arrow').css({'height':opts.arrow.height.trim(),width:opts.arrow.width.trim(),'position':'absolute','top':'0','right':'0'});
				$This.find('.select_arrow').children().css({'display':'block','-moz-user-select':'none','-webkit-user-select':'none','user-select':'none'});
				var arrowWidth = $This.find('.select_arrow').outerWidth(true);
				var textboxWidth = $This.find('.select_main').innerWidth();
				$This.find('.select_content').css({'width':(textboxWidth-arrowWidth) + 'px'});
			}else{
				$This.find('.select_arrow').text(opts.arrow.content.trim());
				$This.find('.select_main').css({'position':'relative'});
				$This.find('.select_arrow').css({'height':opts.arrow.height.trim(),width:opts.arrow.width.trim(),'position':'absolute','top':'0','right':'0'});
				$This.find('.select_arrow').children().css({'display':'block','-moz-user-select':'none','-webkit-user-select':'none','user-select':'none'});
				var arrowWidth = $This.find('.select_arrow').outerWidth(true);
				var textboxWidth = $This.find('.select_main').innerWidth();
				$This.find('.select_content').css({'width':(textboxWidth-arrowWidth) + 'px'});
			}
			
			$This.css('border',opts.textbox.itemStyle.border.trim());
			$This.css('backgroud',opts.textbox.itemStyle.background.trim());
			$This.css('border-radius',opts.textbox.itemStyle.borderRadius.trim());
			$This.find(".select_content").css('font-size',opts.textbox.font.size.trim());
			$This.find(".select_content").css('color',opts.textbox.font.color.trim());
			$This.find(".select_content").css('font-weight',opts.textbox.font.weight.trim());
			/* 设置输入框样式完成 */
			
			/* 开始设置options样式 */
			$This.find(".select_list").css({
				"max-height":opts.options.itemStyle.height.trim(),
				// "max-width":opts.options.itemStyle.width.trim(),
				"background":opts.options.itemStyle.background.trim(),
				"font-size":opts.options.font.size.trim(),
				"color":opts.options.option.normal.color.trim(),
				'border':opts.options.itemStyle.border.trim(),
				'border-radius':opts.options.itemStyle.borderRadius.trim()});
			//鼠标悬浮效果
			$This.find(".select_list_body").find("li").hover(function () {
				$(this).css({ "color": opts.options.option.highLight.color.trim() });
				$(this).css({ "background": opts.options.option.highLight.background.trim() });
			}, function () {
				if(!$(this).hasClass("list_current")){
					$(this).css({ "color": opts.options.option.normal.color.trim() });
					$(this).css({ "background": opts.options.option.normal.background.trim() });
				}
			})
			
			$This.find(".select_list_body").find("li").css({
				'height':opts.options.option.lineHeight.trim(),
				'line-height':opts.options.option.lineHeight.trim()
			});
			
			//获取此时列表的高度
			var list_height = $This.find(".select_list").innerHeight();
			var list_ul_height = 0;
			var scrollBarHeight = 0;
			$This.find('.select_main').click(function(){
				
				if($This.find(".select_list").hasClass('list_open')){
					
					$This.find(".select_list").removeClass("list_open").animate({ "height": "0px" }, 200,function(){
						$This.find(".select_list").hide();
						$This.find(".select_list_ul").css('margin-top','0');
						$This.find(".select_list_ul").css('margin-top','0');
					});
				}
				else{
					var $openSelect = $('.select_container_nw').find('.list_open');
					/* console.info($openSelect.length); */
					if($openSelect.length > 0){
						$openSelect.each(function (index, element) {
							/* console.info('index : ' + index); */
							$(element).siblings('.select_main').trigger("click");
							/* console.info('class : ' + $(element).attr('class')); */
						});
					}
					$This.find(".select_list").css({ "height": "0px" }).show().animate({ "height": list_height + "px" }, 200);
					list_ul_height = $This.find(".select_list_ul").outerHeight(true);
					$This.find(".list_current").css({
						'background':opts.options.option.highLight.background.trim(),
						'color':opts.options.option.highLight.color.trim()})
					$This.find(".select_list").addClass("list_open");
					showScroll();
				}
			});

			//为每一行元素添加点击事件
			$This.find(".select_list_body").delegate("li", "click", function () {
				if ($(this).hasClass("no_result"))
					return;
				$This.find(".select_list_body").find('li').removeClass("list_current");
				$This.find(".select_list_body").find('li').css({
					'background':opts.options.itemStyle.background.trim(),
					'color':opts.options.option.normal.color.trim()});
				$(this).addClass("list_current");
				$This.find(".select_content").text($(this).text());
				$this.val($(this).attr("val"));
				$this.trigger("change");
				$This.find(".select_main").trigger("click");
			});
			
			function showScroll(){
				//获取此时列表的高度
				
				if(list_ul_height > list_height){
					$This.find(".select_list").find(".scroll_bar").remove();
					$This.find(".scroll_bar_container").remove();
					$This.find(".select_list").append('\
						<div class="scroll_bar_container">\
							<div class="scroll_bar"></div>\
						</div>\
					')

					$This.find(".scroll_bar").css({'width':opts.scroll.width.trim()});
					scrollHeight = list_height - 10;
					scrollBarHeight = (list_height / list_ul_height) * (list_height - 10);
					$This.find(".scroll_bar_container").css({
						'background':'rgba(0,0,0,0)',
						'position':'absolute','height':scrollHeight + 'px',
						'padding':'5px 3px',
						'top':'0',
						'right':'0'});
					$This.find(".scroll_bar").css({
						'height':scrollBarHeight + 'px',
						'margin':'0',
						'background':opts.scroll.color.trim(),
						'border':opts.scroll.border.trim(),
						'border-radius':opts.scroll.borderRadius
					});
					
					$This.find(".select_list").hover(function(){
						$(document).on('mousewheel DOMMouseScroll', scrollEvent);
						mouseMoveEvent();
					},function(){
						$(document).on('mousewheel DOMMouseScroll', function(){});
					})
				}
			}
			
			function scrollEvent(e){
				
				var ulMarginTopNow = parseInt($This.find(".select_list_ul").css('margin-top'));
				var scrollMarginTopNow = parseInt($This.find(".select_list_ul").css('margin-top'));
				
				var maxMoveSize = (list_ul_height - list_height);
				var maxScrollMoveSize = (list_height - 10 - scrollBarHeight);
				var direct = 0;
				e = e || window.event;
				var step = 0;
				var moveSize = 0;
				var size = opts.scroll.stepSize;
				
				// IE 谷歌 || 火狐
				var wheel = e.originalEvent.wheelDelta || -e.originalEvent.detail;
				var delta = Math.max(-1, Math.min(1, wheel) );
				
				moveSize = size * delta;
				var margintop = ulMarginTopNow + moveSize;
				if(margintop > 0 ){
					margintop = 0;
				}else if(margintop < - maxMoveSize){
					margintop = - maxMoveSize;
				}
				$This.find(".select_list_ul").animate({
					'margin-top': margintop
				},0);
				
				var scrollTop = - maxScrollMoveSize * (margintop / maxMoveSize)
				$This.find(".scroll_bar").animate({
					'margin-top': scrollTop
				},0);
			}
			
			var y = 0;
			var isDrop = false;
			function mouseMoveEvent(){
				$This.find(".scroll_bar").mousedown(function(e){
					var e = e || window.event;
					y = e.clientY - $This.find(".scroll_bar")[0].offsetTop;
					isDrop = true;
					$This.find(".select_list").bind("mousemove",function(es){
						
						if(isDrop){
							var es = es || window.event;
							var moveY = es.clientY - y
							var scrollTop = moveY;
							var maxUlMoveSize = (list_ul_height - list_height);
							var maxScrollMoveSize = (list_height - 10 - scrollBarHeight);
							if(scrollTop < 5){
								scrollTop = 5;
							}else if(scrollTop > maxScrollMoveSize){
								scrollTop = maxScrollMoveSize;
							}
							
							$This.find(".scroll_bar").animate({
								'margin-top': scrollTop
							},0);
							
							var margintop = - maxUlMoveSize * ((scrollTop-5) / (maxScrollMoveSize + 5));
							$This.find(".select_list_ul").animate({
								'margin-top': margintop
							},0);
						}
					});
				});
				document.onmouseup = function() {
					$This.find(".scroll_bar_container").bind("mousemove",function(){})
					isDrop = false; //设置为false不可移动
				}
			}
			
			$(document).on('click', function (e) {
				var event = e || window.event;
				var element = event.target || e.srcElement;
				if ($(element).closest('.select_container_nw').length > 0) {
					e.stopPropagation();
				} else {
					$This.find(".select_list").removeClass("list_open").animate({ "height": "0px" }, 200,function(){
						$This.find(".select_list").hide();
						$This.find(".select_list_ul").css('margin-top','0');
						$This.find(".select_list_ul").css('margin-top','0');
					});
				}
			});
			
			//返回原jquery对象,保持链式调用
			return $this;

			//////////////////////////////////////////////////////////代码内部
		}
	});
})(jQuery, window, document)
