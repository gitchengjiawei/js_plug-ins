; (function ($, window, document, undefined) {
	$.fn.extend({
		mySelect: function (options) {

			//默认参数
			var defaults = {
				fontFamily: "'Helvetica Neue', arial, sans-serif",	//字体种类
				placeholder: "请选择",	//选择显示框的默认文字
				display:'inline-block',
				
				/* 输入框的显示样式 */
				width: "180px",			//生成的select框宽度
				height: "30px",				//select 高度
				border: "1px solid deepskyblue",	//边框
				background: "bottom",		//背景色
				borderRadius:'0',			//边框弧度
				fontSize: "14px",			//字体大小
				color: "#000",				//字体颜色
				fontWeight: "normal",		//字体粗细
				textSize: '-1',			//最大的显示文字
				/* paddingLeft:'5px', */
				/* icon:'none', */
				icon:'',
				
				/* 下拉列表样式 */
				listMaxHeight:"200px",	 //生成的下拉列表最大高度
				listBackground: "#00003e",	//背景颜色
				listColor: "#fff",		//字体颜色
				listFontSize:"14px",			//字体大小
				listBorder:"1px solid #536f80",			
				listHoverBg: "#1E90FF", //移动选择时，每一行的hover底色
				listHoverColor: "#fff",	//移动选择时，每一行的字体hover颜色 
				/* listPadding:'0', */
				listRowHeight:'20px',
				listContainerMargin:'10px 5px',
				
				/* 滚动条样式 */
				scrollBarWidth:'6px',
				scrollBarColor:'rgb(32, 134, 234)',
				scrollBarBorderRadius:'2px',
				stepSize:10,
				
				arrow:'',
				arrowTip:'img',
				animate:0
			}

			//将默认的参数对象和传进来的参数对象合并在一起
			var opts = $.extend(defaults, options); 

			//重新为原select标签对象命名
			var $this = this;

			//隐藏原select标签，并且在其后添加需要的html元素
			$this.hide();
			$this.after('\
					<div class="select_container_nw" val="" text="">\
						<div class="select_main">\
							<span class="select_content">'+ opts.placeholder + '</span>\
							<span class="select_arrow"></span>\
						</div>\
						<div class="select_list">\
							<div class="select_list_body">\
								<ul class="select_list_ul">\
									<li class="no_result">'+ opts.placeholder +'</li>\
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
			
			var thisVal = $this.val();
			
			setInterval(function(){
				var tmp = $this.val();
				if(tmp !== thisVal){
					thisVal = tmp;
					$This.find(".select_list_body").find('li').removeClass("list_current");
					$This.find(".select_list_body").find('li').css({'background':opts.listBackground,'color':opts.listColor});
					
					var $newSelected = $This.find(".select_list_body").find('li[val=\"' + thisVal + '\"]');
					$newSelected.addClass("list_current");
					$This.find(".select_content").text($newSelected.text());
				}
			},100);
			
			$This.closest('form').on('reset',function () {
				
				var $firstOption = $This.find('.select_list_body').find('li').first();
				
				$This.find(".select_list_body").find('li').removeClass("list_current");
				$This.find(".select_list_body").find('li').css({'background':opts.listBackground,'color':opts.listColor});
				$firstOption.addClass("list_current");
				$This.find(".select_content").text($firstOption.text());
			});
			
			if($this.find("option").length > 0){
				$This.find(".no_result").hide();
			}
			
			$This.find(".select_list_ul").css({'-moz-user-select':'none','-webkit-user-select':'none','user-select':'none'})
			
			//初始化一些非自定义必须的样式
			$This.css({'vertical-align':'middle','cursor':'default','box-sizing':'border-box','position':'relative'});
			$This.find('.select_list').hide();
			$This.find('.select_content').css({'overflow':'hidden'});
			$This.find('.select_list').css({'position':'absolute','min-width':opts.width.trim(),'z-index':'99999'});
			$This.find(".select_list_ul").css({'list-style':'none','padding':'3px 0','margin':'0'});
			$This.find(".select_list_body").find("li").css({'padding':'0 5px','text-overflow': 'ellipsis','white-space': 'nowrap'});
			$This.find(".select_list_body").css({'overflow-y':'hidden','cursor':'pointer','height':'100%'})
			$This.find(".select_content").css({'width':'-webkit-fill-available','padding':'0 5px','overflow-x': 'hidden','text-overflow':'ellipsis','white-space': 'nowrap','display':'inline-block'});
			
			
			//传进来的参数操作
			if(opts.display.trim() != "")
				$This.css('display',opts.display.trim());
			if (opts.width.trim() != ""){
				$This.find('.select_main').css("width", opts.width.trim());
				$This.find('.select_list').css("min-width", opts.width.trim());
			}
			if(opts.height.trim() != ""){
				$This.css('height',opts.height.trim());
				$This.css("line-height", opts.height.trim());
				$This.find('.select_main').css('height',opts.height.trim());
				if(opts.arrow.trim() != ""){
					$This.find('.select_main').css({'position':'relative'});
					$This.find('.select_arrow').css({'height':opts.height.trim(),'position':'absolute','top':'0','right':'0'});
					$This.find('.select_arrow').html(opts.arrow.trim());
					$This.find('.select_arrow').children().css({'display':'block','user-select':'none'});
					$This.find('.select_arrow').find(opts.arrowTip.trim()).load(function(){
						var arrowWidth = $This.find('.select_arrow').outerWidth(true);
						var textboxWidth = $This.find('.select_main').innerWidth();
						$This.find('.select_content').css({'width':(textboxWidth-arrowWidth) + 'px'});
					})
				}
			}
			if(opts.border.trim() != "")
				$This.css('border',opts.border.trim());
			if(opts.background.trim() != "")
				$This.css('backgroud',opts.background.trim());
			/* if(opts.paddingLeft.trim() != ""){
				$This.css('padding-left',opts.paddingLeft.trim());
			} */
			if(opts.borderRadius.trim() != "")
				$This.css('border-radius',opts.borderRadius.trim());
			if(opts.fontSize.trim() != "")
				$This.find(".select_content").css('font-size',opts.fontSize.trim());
			if(opts.color.trim() != "")
				$This.find(".select_content").css('color',opts.color.trim());
			if(opts.fontWeight.trim() != "")
				$This.find(".select_content").css('font-weight',opts.fontWeight.trim());
			
			if (opts.listMaxHeight.trim() != "")
				$This.find(".select_list_body").css("max-height", opts.listMaxHeight.trim());
			if (opts.listBackground.trim() != "")
				$This.find(".select_list_body").css("background", opts.listBackground.trim());
			if(opts.listColor.trim() != "")
				$This.find(".select_list_body").css("color", opts.listColor.trim());
			if(opts.listFontSize.trim() != "")
				$This.find(".select_list_body").css("font-size", opts.listFontSize.trim());
			if(opts.listHoverBg.trim() != "" && opts.listHoverColor.trim() != "")
				$This.find(".select_list_body").find("li").hover(function () {
					$(this).css({ "color": opts.listHoverColor.trim() });
					$(this).css({ "background": opts.listHoverBg.trim() });
				}, function () {
					if(!$(this).hasClass("list_current")){
						$(this).css({ "color": opts.listColor.trim() });
						$(this).css({ "background": opts.listBackground.trim() });
					}
				})
			if(opts.listRowHeight.trim() != ""){
				$This.find(".select_list_body").find("li").css('height',opts.listRowHeight.trim());
				$This.find(".select_list_body").find("li").css('line-height',opts.listRowHeight.trim());
			}
			
			if(opts.listBorder.trim() != ""){
				$This.find(".select_list_body").css('border',opts.listBorder.trim());
			}
			
			//获取此时列表的高度
			var list_height = $This.find(".select_list").height();
			var list_ul_height = 0;
			var scrollBarHeight = 0;
			var margintop = 0;
			var scrollTop = 5;;
			$This.find('.select_main').click(function(){
				
				// $This.find(".select_list").toggleClass('list_open');
				if($This.find(".select_list").hasClass('list_open')){
					
					$This.find(".select_list").removeClass("list_open").animate({ "height": "0px" }, opts.animate,function(){
						$This.find(".select_list").hide();
						$This.find(".select_list_ul").css('margin-top','0');
						$This.find(".select_list_ul").css('margin-top','0');
					});
					margintop = 0;
					scrollTop = 5;
				}
				else{
					var $openSelect = $('.select_container_nw').find('.list_open');
					
					if($openSelect.length > 0){
						$openSelect.each(function (index, element) {
							
							$(element).siblings('.select_main').trigger("click");
						});
					}
					$This.find(".select_list").css({ "height": "0px" }).show().animate({ "height": list_height + "px" }, opts.animate);
					list_ul_height = $This.find(".select_list_ul").innerHeight();
					$This.find(".list_current").css({'background':opts.listHoverBg.trim(),
						'color':opts.listHoverColor.trim()})
					$This.find(".select_list").addClass("list_open");
					showScroll();
				}
			});

			//为每一行元素添加点击事件
			$This.find(".select_list_body").delegate("li", "click", function () {
				if ($(this).hasClass("no_result"))
					return;
				$This.find(".select_list_body").find('li').removeClass("list_current");
				$This.find(".select_list_body").find('li').css({'background':opts.listBackground,'color':opts.listColor});
				
				$(this).addClass("list_current");
				$This.find(".select_content").text($(this).text());
				$this.val($(this).attr("val"));
				$this.trigger("change");
				$This.find(".select_main").trigger("click");
			});
			
			function showScroll(){
				//获取此时列表的高度
				/* list_height = $This.find(".select_list").height(); */
				
				if(list_ul_height > list_height){
					$This.find(".select_list").find(".scroll_bar").remove();
					$This.find(".scroll_bar_container").remove();
					$This.find(".select_list").append('\
						<div class="scroll_bar_container">\
							<div class="scroll_bar"></div>\
						</div>\
					')

					if(opts.scrollBarWidth.trim() != "")
						$This.find(".scroll_bar").css({'width':opts.scrollBarWidth.trim()});
					scrollHeight = list_height - 10;
					scrollBarHeight = (list_height / list_ul_height) * (list_height - 10);
					$This.find(".scroll_bar_container").css({'background':'rgba(0,0,0,0)','position':'absolute','height':scrollHeight + 'px','padding':'5px 3px','top':'0','right':'0'});
					$This.find(".scroll_bar").css({'height':scrollBarHeight + 'px','margin':'0'});
					if(opts.scrollBarColor.trim() != "")
						$This.find(".scroll_bar").css({'background':opts.scrollBarColor.trim()});
					if(opts.scrollBarBorderRadius.trim() != "")
						$This.find(".scroll_bar").css({'border-radius':opts.scrollBarBorderRadius.trim()});
					
					//防止多次添加 鼠标滚动事件，使得滚动条速度越来越快
					$This.find(".select_list").hover(function(){
						var objEvt = getElementEvent($This.find(".select_list")[0],'mousewheel DOMMouseScroll');
						if(objEvt.length == 0){
							$This.find(".select_list").on('mousewheel DOMMouseScroll', scrollEvent);
						}
						mouseMoveEvent();
					},function(){
						var objEvt = getElementEvent($This.find(".select_list")[0],'mousewheel DOMMouseScroll');
						if(objEvt.length > 0){
							$This.find(".select_list").unbind('mousewheel DOMMouseScroll');
						}
					})
				}
			}
			
			//获取dom元素绑定事件(兼容全部版本jquery)
			function getElementEvent(obj,event){
				var events =  $.data(obj,'events') || $._data(obj,'events');
				
				var result = [];
				if(event){
					var arr = event.trim().split(/\s+/);
					$.each(arr,function(index,value){
						var one = events[value];
						if(one){
							result.push(one)
						}
					});
				}
				
				return result;
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
				var size = opts.stepSize;
				
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
					$This.find(".select_list").removeClass("list_open").animate({ "height": "0px" }, opts.animate,function(){
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
