/*!
 * Copyright 2014, 2014 ywang1724 and other contributors
 * Released under the MIT license
 * http://ywang1724.com
 *
 * Date: 2014-09-02
 */

/**
 * 弹出层类	PopLayer
 * 参数说明：args obj
 * @param	title		弹出层标题
 * @param	content		弹出层内容html
 * @param 	isModal		弹出层是否模态
 * @param 	moveable 	弹出层可否移动
 * @param   document	上下文文档对象
 */
 // var lala;
(function() {
	
	function TimerPopLayer(args) {
		//初始化参数
		this.title = args.title || "";
		this.content = args.content || "";
		this.isModal = (typeof args.isModal === "boolean") ? args.isModal : true;
		this.moveable = (typeof args.moveable === "boolean") ? args.moveable : true;
		this.document = args.document || document;
		//辅助参数
		this.isDown = false;  //鼠标是否在弹层标题栏按下
		this.offset = {
            "width": 0, 
            "height": 0
        };
		//模态加遮罩层
		var modal = this.getElement();
		if (this.isModal) {
			this.myModal = modal.myModal;
		}
		this.myPop = modal.myPop;
		//初始化
		this.init();
	};
	
	TimerPopLayer.prototype = {
		
		init: function() {
			this.initContent();//初始化内容
			this.initEvent();//初始化行为
		},
		
		initContent: function() {
			if (this.isModal) {
                $("body", this.document).append(this.myModal);
                this.myModal.show();
            }
			$("body", this.document).append(this.myPop);
            $(".TimerPop-title-value", this.myPop).html(this.title);//设置标题
            this.myPop.css("top", (this.document.documentElement.clientHeight - this.myPop.height()) / 2 + "px");
			this.myPop.css("left", (this.document.documentElement.clientWidth - this.myPop.width()) / 2 + "px");
            this.myPop.show();
		},
		
		initEvent: function() {
			var $this = this;
			//鼠标按下事件
			$(".TimerPop-title", this.myPop).on("mousedown", function(e) {
				$this.isDown = true;
				var event = window.event || e;
				//记录按下时鼠标距离弹出层位置
				$this.offset.height = event.clientY - $this.myPop.offset().top;
				$this.offset.width = event.clientX - $this.myPop.offset().left;
                return false;
			});
			//鼠标拖动事件
			$(this.document).mousemove(function(e) {
				 if ($this.isDown && $this.moveable) {
			        var event = window.event || e;
			        //偏移位置
			        var top = event.clientY - $this.offset.height,
                        left = event.clientX - $this.offset.width,
                        maxL = $this.document.documentElement.clientWidth - $this.myPop.width(),
                        maxT = $this.document.documentElement.clientHeight - $this.myPop.height();        
                    left = left < 0 ? 0 : left;
                    left = left > maxL ? maxL : left;      
                    top = top < 0 ? 0 : top;
                    top = top > maxT ? maxT : top;
					$this.myPop.css("top", top + "px");
					$this.myPop.css("left", left + "px");
				}
                return false;
			}).mouseup(function(e) {
				if ($this.isDown) {
					$this.isDown = false;
				}
                return false;
            });
			//关闭事件
			$(".TimerPop-close", this.myPop).on('click', function() {
                $this.destroy();
                return false;
            });
        	//minimize
		    $(".TimerPop-minimize").on('click',function() {
		    	$('.TimerModal').hide();
		    	$('.TimerPop').hide();
		    	$('.mini').show();
		    	$('.Timerpop').attr('disabled',true);
		    });
		},
        
		getElement: function() {
			return {
				"myModal": $("<div class='TimerModal'></div>", this.document),
				"myPop": $("<div class='TimerPop'>" +
                                "<h2 class='TimerPop-title'>" +
                                    "<span class='TimerPop-title-value'></span>" +
                                    "<span class='TimerPop-close'><svg style='width:25px;fill:#131414; margin:10px 10px -10px 0' viewBox='0 0 24 24'><path d='M19 6.41l-1.41-1.41-5.59 5.59-5.59-5.59-1.41 1.41 5.59 5.59-5.59 5.59 1.41 1.41 5.59-5.59 5.59 5.59 1.41-1.41-5.59-5.59z'/><path d='M0 0h24v24h-24z' fill='none'/></svg></span>" + 
                                    "<span class='TimerPop-minimize'><svg viewBox='0 0 294.8 294.8' style='width:18px;fill:#131414;'><g><path d='M288.8,0H47.4c-3.3,0-6,2.7-6,6v17.4c0,3.3,2.7,6,6,6s6-2.7,6-6V12h229.4v229.4h-11.4c-3.3,0-6,2.7-6,6s2.7,6,6,6h17.4c3.3,0,6-2.7,6-6V6C294.8,2.7,292.1,0,288.8,0z'/><path d='M247.4,41.4H6c-3.3,0-6,2.7-6,6v241.4c0,3.3,2.7,6,6,6h241.4c3.3,0,6-2.7,6-6V47.4C253.4,44.1,250.7,41.4,247.4,41.4zM241.4,282.8H12V53.4h229.4V282.8z'/></g></svg></span>" +
                                "</h2>" + 
                                "<div class='TimerPop-content'>" + this.content + "</div>" + 
                           "</div>", this.document)
			};
		},
		
		destroy: function() {
			//清除显示层
			this.myPop.remove();
			//清除存在的遮罩层
			if(this.isModal){
				this.myModal.remove();
			}
		}
	};
	

		
	top.TimerPopLayer = TimerPopLayer;
	// lala = TimerPopLayer;

    
})();


$(function() {
    $(document).delegate('#minimize', 'click', function(event) {
    	$('.TimerModal').show();
    	$('.TimerPop').show();
    	$('.mini').hide();
    	$('.Timerpop').attr('disabled',false);
    });
});      


$(function() {
    $(document).delegate('#play', 'click', function(event) {
    	frame = $('#frame').contents();
    	frame.find('.example_b').click();
    });
});


$(function() {
    $(document).delegate('#pause', 'click', function(event) {
   		frame = $('#frame').contents();
    	frame.find('.example_a').click();
    });
});


function syn(){
	frame = $('#frame').contents();
	$('#minutes').text(frame.find('.minutes').text());
	$('#seconds').text(frame.find('.seconds').text());
	if($('#minutes').text() == "00" && $('#seconds').text() == "00")
	{
		$('#separator').text("");
	}
};

var interval = setInterval(syn,500);

$(function(){
    document.oncontextmenu = function(){
        return false;
    }
    document.onselectstart = function() {
        return false;
    }
    document.onselectstart = function(){
        return false;
    }
});