; (function ($, window, document, undefined) {
    $.fn.extend({
        mySelect: function (options) {

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
				icon:'',
				
				/* 下拉列表样式 */
                listMaxHeight:"200px",     //生成的下拉列表最大高度
                listBackground: "#00003e",    //背景颜色
                listColor: "#fff",        //字体颜色
                listFontSize:"14px",           //字体大小
				listBorder:"1px solid 536f80",           //字体大小
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
				arrow:''
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
					/* console.info($This.find(".select_list_body").find('li').length) */
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
			$This.css({'vertical-align':'middle','cursor':'default'});
			$This.css({'position':'relative'});
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
					
					$This.find(".select_list").removeClass("list_open").animate({ "height": "0px" }, 200,function(){
						$This.find(".select_list").hide();
						$This.find(".select_list_ul").css('margin-top','0');
						$This.find(".select_list_ul").css('margin-top','0');
					});
					margintop = 0;
					scrollTop = 5;
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
					list_ul_height = $This.find(".select_list_ul").innerHeight();
					$This.find(".list_current").css({'background':opts.listHoverBg.trim(),
						'color':opts.listHoverColor.trim()})
					$This.find(".select_list").addClass("list_open");
					showScroll();
				}
			});
			
			//原select的值发生变化，就重新灌注select数据
			/* $this.change(function(){
				$This.find('.select_list_ul').find('li').not('.no_result').remove();
				$this.find("option").each(function (index, element) {
				    var $li = $('<li val=' + $(element).val() + '>' + $(element).text() + '</li>');
				    if ($(element).prop("selected")) {
				        $li.addClass("list_current");
				        $This.find(".select_content").text($(element).text());
						// $This.find(".select-replace-input").val($(element).val());
				    }
				    $This.find(".no_result").before($li);
				});
			}); */

            //为每一行元素添加点击事件
            $This.find(".select_list_body").delegate("li", "click", function () {
				if ($(this).hasClass("no_result"))
				    return;
                $This.find(".select_list_body").find('li').removeClass("list_current");
				$This.find(".select_list_body").find('li').css({'background':opts.listBackground,'color':opts.listColor});
				console.info($This.find(".select_list_body").find('li').length)
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
					
					$This.find(".select_list").hover(function(){
						/* window.onmousewheel = document.onmousewheel = scrollEvent; */
						if (window.addEventListener) {  
							/** DOMMouseScroll is for mozilla. */  
							window.addEventListener('DOMMouseScroll', scrollEvent, false);  
						}  
						/** IE/Opera. */  
						window.onmousewheel = document.onmousewheel = scrollEvent; 
						mouseMoveEvent();
					},function(){
						if (window.addEventListener) {
							/** DOMMouseScroll is for mozilla. */  
							window.addEventListener('DOMMouseScroll', function(){}, false);  
						}  
						/** IE/Opera. */  
						window.onmousewheel = document.onmousewheel = function(){}; 
					})
					
				}
			}
			
			// var margintop = 0;
			// var scrollTop = 5;;
			function scrollEvent(e){
				
				var maxMoveSize = (list_ul_height - list_height);
				// console.info(list_ul_height + " : " + list_height + " : " + maxMoveSize)
				var direct = 0;
				e = e || window.event;
				var step = 0;
				var moveSize = 0;
				var stepSize = 10;
				console.info(e.detail + "0000")
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
				}else if(e.detail){
					console.info("e.detail : " + e.detail)
					step = -e.detail / 3; ;
					console.info("e.detail step : " + step)
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
					$This.find(".select_list").bind("mousemove",function(es){
						
						if(isDrop){
							var es = es || window.event;
							var moveY = es.clientY - y
							var scrollmove = moveY;
							scrollTop = scrollmove;
							// console.info(scrollmove + " : " + scrollTop);
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
                    	margintop = 0;
                    	scrollTop = 5;
                    });
                }
            });
			
            //返回原jquery对象,保持链式调用
            return $this;

            //////////////////////////////////////////////////////////代码内部
        }
    });
})(jQuery, window, document)
