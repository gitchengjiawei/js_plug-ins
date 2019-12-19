; (function ($, window, document, undefined) {
    $.fn.extend({
        select: function (options) {

            //默认参数
            var defaults = {
				fontFamily: "'Helvetica Neue', arial, sans-serif",    //字体种类
				placeholder: "请选择",    //选择显示框的默认文字
				display:'inline-block',
				
				/* 输入框的显示样式 */
                width: "180px",            //生成的select框宽度
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
				icon:'../img/xiala.svg',
				
				/* 下拉列表样式 */
                listMaxHeight:"200px",     //生成的下拉列表最大高度
                listBackground: "#00003e",    //背景颜色
                listColor: "#fff",        //字体颜色
                listFontSize:"14px",           //字体大小
                listHoverBg: "deepskyblue", //移动选择时，每一行的hover底色
                listHoverColor: "#fff",   //移动选择时，每一行的字体hover颜色 
				/* listPadding:'0', */
				listRowHeight:'20px',
				listContainerMargin:'10px 5px',
				
				/* 滚动条样式 */
				scrollBarWidth:'4px',
				scrollBarColor:'deepskyblue',
				scrollBarBorderRadius:'2px',
				stepSize:'20',
            }

            //将默认的参数对象和传进来的参数对象合并在一起
            var opts = $.extend(defaults, options); 

            //重新为原select标签对象命名
            var $this = this;

            //隐藏原select标签，并且在其后添加需要的html元素
            $this.hide();
            $this.after('\
                    <div class="select_container_nw" val="" text="">\
					<input type="hidden" class="select-replace-input" />\
                        <div class="select_main">\
                           <span class="select_content">'+ opts.placeholder + '</span>\
                           <span class="select_arrow"></span>\
                           <span class="select_arrow_after"></span>\
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

            //灌入原select的数据
            $this.find("option").each(function (index, element) {
                var $li = $('<li val=' + $(element).val() + '>' + $(element).text() + '</li>');
                if ($(element).prop("selected")) {
                    $li.addClass("list_current");
                    $This.find(".select_content").text($(element).text());
					$This.find(".select-replace-input").val($(element).val());
                }
                $This.find(".no_result").before($li);
            });
			
			if($this.find("option").length > 0){
				$This.find(".no_result").hide();
			}
			
			$This.find(".select_list_ul").css({'-moz-user-select':'none','-webkit-user-select':'none','user-select':'none'})
			
			//初始化一些非自定义必须的样式
			$This.find('.select_list').hide();
			$This.find(".select_list_ul").css({'list-style':'none','padding':'3px 0','margin':'0'});
			$This.find(".select_list_body").find("li").css({'padding':'0 5px'});
			$This.find(".select_list_body").css({'overflow-y':'hidden','cursor':'pointer','height':'100%'})
			$This.find(".select_content").css({'width':'fill-available','padding':'0 5px','overflow-x': 'hidden','text-overflow':'ellipsis','white-space': 'nowrap','width': 'max-content','display':'inline-block'});
			
			
            //传进来的参数操作
			if(opts.display.trim() != "")
				$This.css('display',opts.display.trim());
            if (opts.width.trim() != ""){
				$This.css("width", opts.width.trim());
				if(opts.icon.trim() != "" && opts.icon.trim() != 'none'){
					$This.find('.select_arrow').css('background','url(' + opts.icon.trim() + ')');
					$This.find('.select_arrow').css({'display':'inline-block','height':'100%'});
				}
			}
			if(opts.height.trim() != ""){
				$This.css('height',opts.height.trim());
				$This.css("line-height", opts.height.trim());
				$This.find('.select_main').css('height',opts.height.trim());
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
			
			//获取此时列表的高度
			var list_height = $This.find(".select_list").height();
			var list_ul_height = 0;
			var scrollBarHeight = 0;
			$This.find('.select_main').click(function(){
				$This.find(".select_list").toggleClass('list_open');
				if($This.find(".select_list").hasClass('list_open')){
					$This.find(".select_list").addClass("list_open").css({ "height": "0px" }).show().animate({ "height": list_height + "px" }, 200);
					list_ul_height = $This.find(".select_list_ul").innerHeight();
					$This.find(".list_current").css({'background':opts.listHoverBg.trim(),
						'color':opts.listHoverColor.trim()})
					showScroll();
				}
				else{
					$This.find(".select_list").removeClass("list_open").animate({ "height": "0px" }, 200,function(){
						$This.find(".select_list").hide();
					});
				}
			});

            //为每一行元素添加点击事件
            $This.find(".select_list_body").delegate("li", "click", function () {
				if ($(this).hasClass("no_result"))
				    return;
                $This.find(".select_list_body li").removeClass("list_current");
				$(this).addClass("list_current");
                $This.find(".select_content").text($(this).text());
                $This.find('.select-replace-input').attr({ "val": $(this).attr("val") == null ? '' : $(this).attr("val")});
                $this.val($(this).attr("val"));

                $This.find(".select_content").trigger("click");
            });
			
			function showScroll(){
				//获取此时列表的高度
				/* list_height = $This.find(".select_list").height(); */
				
				if(list_ul_height > list_height){
					$This.find(".select_list").find(".scroll_bar").remove();
					$This.find(".select_list").append('\
						<div class="scroll_bar_container">\
							<div class="scroll_bar"></div>\
						</div>\
					')
					
					$This.find(".select_list").css('position','relative');
					
					
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
					
					$This.find(".select_list").hover(function(){
						window.onmousewheel = document.onmousewheel = scrollEvent;
						mouseMoveEvent();
					},function(){
						window.onmousewheel = document.onmousewheel = {};
					})
					
				}
			}
			var margintop = 0;
			var scrollTop = 5;
			function scrollEvent(e){
				var maxMoveSize = (list_ul_height - list_height);
				// console.info(list_ul_height + " : " + list_height + " : " + maxMoveSize)
				var direct = 0;
				e = e || window.event;
				var step = 0;
				var moveSize = 0;
				var stepSize = 10;
				if(e.wheelDelta){	//IE 或者 谷歌
					step = e.wheelDelta/120; 
					moveSize = stepSize * step;
					margintop += moveSize;
					if(margintop > 0 ){
						margintop = 0;
					}else if(margintop < - maxMoveSize){
						margintop = - maxMoveSize;
					}
					$This.find(".select_list_ul").animate({
						'margin-top': margintop
					},0);
					scrollTop = margintop / list_ul_height * (list_height - 10) - 5;
					$This.find(".scroll_bar").animate({
						'margin-top': -scrollTop
					},0);
				}
			}
			
			var y = 0;
			var isDrop = false;
			function mouseMoveEvent(){
				$This.find(".scroll_bar").mousedown(function(e){
					var e = e || window.event;
					y = e.clientY - $This.find(".scroll_bar")[0].offsetTop;
					isDrop = true;
					$This.find(".scroll_bar_container").bind("mousemove",function(es){
						
						if(isDrop){
							var es = es || window.event;
							var moveY = es.clientY - y
							var scrollmove = moveY;
							scrollTop = scrollmove;
							console.info(scrollmove + " : " + scrollTop);
							var maxScrollTop = (list_height - scrollBarHeight - 10);
							if(scrollTop < 5){
								scrollTop = 5;
							}else if(scrollTop > maxScrollTop){
								scrollTop = maxScrollTop;
							}
							
							$This.find(".scroll_bar").animate({
								'margin-top': scrollTop
							},0);
							
							margintop = (scrollTop - 5)/maxScrollTop * (list_ul_height - list_height + 10);
							$This.find(".select_list_ul").animate({
								'margin-top': -margintop
							},0);
						}
					});
				});
				document.onmouseup = function() {
					isDrop = false; //设置为false不可移动
				}
			}
			

            //返回原jquery对象,保持链式调用
            return $this;

            //////////////////////////////////////////////////////////代码内部
        }
    });
})(jQuery, window, document)
