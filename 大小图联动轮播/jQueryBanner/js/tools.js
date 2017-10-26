// author lianghongna 20170919
//别人是如何封装插件的  只将变量保留下来作为参数可以改动
/*
    想起上次那栋大楼里问我的需求了 要按照设计的要求自己写出来一个轮播插件 并且处处通用  的确 这样封装了之后 只用把参数传进去 插件js引入就好  就实现了处处通用
    就这么几张图片 可以无限轮播 怎么实现的 不会出现最后一张的提示
*/
var tools = {
    swiperbanner:function(bansel,mobsel,obj){
        var banner = obj.bannerpic;
        var mobile = obj.mobilepic;
        var bannermax = new Array();
        var mobilemax = new Array();
        // 即使是普通的数组 也可以用for(var i in arr) 比for(var i=0;i<arr.length;i++)  写起来简略的多
        for(var i in banner){
            bannermax.push(banner[i]);
        }
        for(var x in mobile){
            mobilemax.push(mobile[x])
        }
        var bannerAll = bannermax.concat(bannermax);  //数组末尾插入元素 concat()  这里是自己插入自己 复制两遍的感觉
        var mobileAll = mobilemax.concat(mobilemax);
        var bannerWidth = $(bansel).width();
        var mobileWidth = $(mobsel).width();
        var pos = bannermax.length;

        // 结构渲染
        var mobilehtml ='<div class="mobile-wrap" style=margin-left:-'+mobileWidth*pos+'px><ul class="mobile-pic">'; //手机的宽度乘以个数
            for(var mob in mobileAll){
                mobilehtml += '<li><img src="'+mobileAll[mob]+'"/></li>'
            }
            mobilehtml +='</ul></div>'
        
        var swiperhtml = '<div class="banner-wrap" style=margin-left:-'+bannerWidth*pos+'px><ul class="banner-list">';
            for(var num in bannerAll){
                swiperhtml += '<li style="background:url('+bannerAll[num]+') no-repeat center center;background-size:cover"></li>'
            }
            swiperhtml +="</ul></div>";
            swiperhtml +='<ul class="navlist">';
            for(var nav in bannermax){
                if(nav==0){
                    swiperhtml += '<li class="navactive"></li>'
                }else{
                    swiperhtml += '<li></li>'
                }
            }
            swiperhtml +="</ul>"
            swiperhtml +='<a href="javascript:void(0);" class="btn-page btn-prve">上一页</a><a href="javascript:void(0);" class="btn-page btn-next">下一页</a> '

        $(bansel).append(swiperhtml);
        $(mobsel).append(mobilehtml);

        // 轮播布局
        var liLength = $(bansel).find(".banner-list li").length;

        $(bansel).find(".banner-list li").width(bannerWidth);
        $(bansel).find(".banner-list").width(bannerWidth * liLength);
        $(bansel).find(".banner-wrap").width(bannerWidth * liLength);

        $(mobsel).find(".mobile-wrap").width(mobileWidth * liLength);
        $(mobsel).find(".mobile-pic").width(mobileWidth * liLength);

        var clock = true;

        function prve(){
            if(!clock){
                return;
            }
            clock = false;
            // 轮播图

            /*
                思路：将ul元素运动一个图像的像素，结束后将
                同时要变化三个地方 大图 小图 圆点
            */
            $(bansel).find(".banner-list").animate({"marginLeft":"+="+bannerWidth},500,function(){  //这里一定要marginLeft 大小写
                //先将ul向右动画一个图像的宽度
                var changeLi = $(bansel).find(".banner-list li").eq(liLength-1).remove(); //找到最后一个并删除
                $(bansel).find(".banner-list").prepend(changeLi); //将最后一个追加到ul上面 也就是说保持ul上面一直有6个  只要向前一次 向后一次 都这样
                $(bansel).find(".banner-list").css({"margin-left":"0"}); //设置ul的margin-left为0 

                // nav
                var changeNav = $(bansel).find(".navlist li").eq(0).remove(); //将第一个圆点li去掉
                $(bansel).find(".navlist").append(changeNav); //将第一个追加到末尾

                // mobile
                $(mobsel).find(".mobile-pic").animate({"marginLeft":"+="+mobileWidth},100,function(){  //小图的ul
                    var changeLim = $(mobsel).find(".mobile-pic li").eq(liLength-1).remove();
                    $(mobsel).find(".mobile-pic").prepend(changeLim);
                    $(mobsel).find(".mobile-pic").css({"margin-left":"0"});
                    clock = true;  //这里的意思是本次动画完毕了
                    /*
                        这个特别必要
                        测试：
                        1）不设置lock 那么点击多少次向左就会执行多少遍向左函数  当点击速度大于变换速度 最后的效果就是突然不点击了 动画还得动画好久 还有些错乱了
                        2）设置lock  那么动画是必须一次点击执行完毕才执行下一次，否则return不执行。。这样最后即使疯狂点击也不会无限制的执行，是有序的
                    */
                })
            });
            
        }
        // 上一个
        $(".btn-prve").on("click",function(){
            prve();  //函数一定要封装完再使用
        })

        function next(){
            if(!clock){
                return;
            }
            clock = false;
            // 轮播图
            $(bansel).find(".banner-list").animate({"marginLeft":"-="+bannerWidth},500,function(){
                var changeLi = $(bansel).find(".banner-list li").eq(0).remove();
                $(bansel).find(".banner-list").append(changeLi);
                $(bansel).find(".banner-list").css({"margin-left":"0"})

                // nav
                var changeNav = $(bansel).find(".navlist li").eq(bannermax.length-1).remove();
                $(bansel).find(".navlist").prepend(changeNav);

                // mobile
                $(mobsel).find(".mobile-pic").animate({"marginLeft":"-="+mobileWidth},100,function(){
                    var changeLim = $(mobsel).find(".mobile-pic li").eq(0).remove();
                    $(mobsel).find(".mobile-pic").append(changeLim);
                    $(mobsel).find(".mobile-pic").css({"margin-left":"0"});
                    clock = true;
                })
            });
            
        }
        // 下一个 
        $(".btn-next").on("click",function(){
            next();
        })

        var picTimer = "";
        var picTimer = setInterval(next,4000);
        /*
            当鼠标滑上去向左向右两个按钮后，则必须停止定时器 即停止自动轮播 离开后又继续进行自动轮播
            jq中hover是封装好的函数===》封装了onmouseover onmouseLeave
        */
        $(".btn-page").hover(function(){
            clearInterval(picTimer)
        },function(){
            picTimer = setInterval(next,4000);
        })
    }
}
