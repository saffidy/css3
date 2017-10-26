(function(){
    //其实都是直接写出来再提炼出想修改的样式 成为插件
    "use strict";
    $.Toast = function(title, message, type, options){
        var defaultOptions = {
            appendTo: "body",
            stack: false,
            position_class: "toast-bottom-right",
            fullscreen:false,
            width: 250,
            spacing:20,
            timeout: 4000,
            has_close_btn:true,
            has_icon:true,
            sticky:false,
            border_radius:6,
            has_progress:false,
            rtl:false
        }

        /*
            变量名都是以$打头 为了强调是$元素
        */

        var $element = null;

        var $options = $.extend(true, {}, defaultOptions, options);  //$.extend 

        var spacing = $options.spacing;

        var css = {
            //将$options中的属性值转换为对应的css样式  最外面的wrapper要用的样式
            "position":($options.appendTo == "body") ? "fixed" : "absolute",  //$options是设定的选项 对象的属性 如果要求挂到Body上 那么就fixed 
            "min-width":$options.width,
            "display":"none",  //默认不显示
            "border-radius":$options.border_radius,
            "z-index":99999
        }

        $element = $('<div class="toast-item-wrapper ' + type + ' ' + $options.position_class + '"></div>'); //type 一开始传参数传进来的 toast是什么类型的  后面是toast在容器内的位置
        $('<p class="toast-title">' + title + '</p>').appendTo($element);
        $('<p class="toast-message">' + message + '</p>').appendTo($element);

        if($options.fullscreen){
            $element.addClass( "fullscreen" );
        }

        if($options.rtl){
            $element.addClass( "rtl" );
        }

        if($options.has_close_btn){
            $('<span class="toast-close">&times;</span>').appendTo($element);  //&times;
            if( $options.rtl){
                css["padding-left"] = 20;
            } else {
                css["padding-right"] = 20;
            }
        }

        if($options.has_icon){  //是否有左边的对勾图标
            $('<i class="toast-icon toast-icon-' + type + '"></i>').appendTo($element);
            if( $options.rtl){
                css["padding-right"] = 50;
            } else {
                css["padding-left"] = 50;
            }            
        }

        if($options.has_progress && $options.timeout > 0){  //是否有进度条
            $('<div class="toast-progress"></div>').appendTo($element);
        }

        if($options.sticky){
            $options.spacing = 0;
            spacing = 0;

            switch($options.position_class){
                case "toast-top-left" : {
                    css["top"] = 0;
                    css["left"] = 0;
                    break;
                }
                case "toast-top-right" : {
                    css["top"] = 0;
                    css["left"] = 0;                    
                    break;
                }
                case "toast-top-center" : {  //上居中 
                    css["top"] = 0;
                    css["left"] = css["right"] = 0;  
                    css["width"] = "100%";                  
                    break;
                }
                case "toast-bottom-left" : {
                    css["bottom"] = 0;
                    css["left"] = 0;                     
                    break;
                }
                case "toast-bottom-right" : {
                    css["bottom"] = 0;
                    css["right"] = 0;                     
                    break;
                }
                case "toast-bottom-center" : {
                    css["bottom"] = 0;
                    css["left"] = css["right"] = 0;  
                    css["width"] = "100%";                     
                    break;
                }
                default : {
                    break;
                }                                                                        
            }
        }

        if($options.stack){
            if($options.position_class.indexOf("toast-top") !== -1 ){
                $($options.appendTo).find('.toast-item-wrapper').each(function(){  //这里的距离计算
                    css["top"] = parseInt($(this).css("top")) + this.offsetHeight + spacing;
                });
            } else if($options.position_class.indexOf("toast-bottom") !== -1 ){
                $($options.appendTo).find('.toast-item-wrapper').each(function(){  //$options.appendTo 也就是他们的容器 容器是肯定在html上面的 不是动态生成的
                    css["bottom"] = parseInt($(this).css("bottom")) + this.offsetHeight + spacing;
                });
            }
        }        

        $element.css(css);

        $element.appendTo($options.appendTo);

		if($element.fadeIn) {
            $element.fadeIn();
        }else {
            $alert.css({display: 'block', opacity: 1});
        }

		function removeToast(){          
			$.Toast.remove( $element );
		}

		if($options.timeout > 0){ //一次性定时器的时长
			setTimeout(removeToast, $options.timeout);  //这个时间后 执行移除动画
            if($options.has_progress){
                $(".toast-progress", $element).animate({"width":"100%"}, $options.timeout);
            }
		}        

        $(".toast-close", $element).click(removeToast)

        return $element;
    }

    $.Toast.remove = function( $element ){
        "use strict";        
		if($element.fadeOut)
		{
			$element.fadeOut(function(){
				return $element.remove();
			});
		}
		else{
			$element.remove();
		}        
    }
})();