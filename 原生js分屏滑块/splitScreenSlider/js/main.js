//这是原生js操作
/*
    这个也是对原生的addEventListener()事件的封装

*/

/*
    var x = document.getElementById("myBtn");
    if (x.addEventListener) {                    //所有主流浏览器，除了 IE 8 及更早 IE版本
        x.addEventListener("click", myFunction);
    } else if (x.attachEvent) {                  // IE 8 及更早 IE 版本
        x.attachEvent("onclick", myFunction);
    }
*/
function addEvent(ele,type,callback){  //元素，类型，回调函数
    if(ele.addEventListener){
        ele.addEventListener(type,callback,false)
    }else if(ele.attachEvent){
        ele.attachEvent("on"+type,callback)
    }
}
/*
    怎样才能有这样的视觉冲击效果？ 左边 右边 文字样式一致并对称  中间图片重叠
*/
//这是将原生的DOM操作进行了封装
/*
    传参 charAt()  返回指定位置的字符 
    document.getElementsByClassName('.bottom')[0]
*/
function getEle(name){
    var method = name.charAt(0)==='.'?'getElementsByClassName':'getElementById';
    return document[method](name.substr(1));  //截取字符串
}

function func(){
    var wrapper = getEle('#wrapper');
    var bottomWrapper =getEle('.bottom')[0];
    var topWrapper = getEle('.top')[0];
    var handle = getEle('.handle')[0];
    var cls = wrapper.className;
    var skew = 1000;
    var delta = 0;

    //当鼠标指针在指定的元素中移动时，就会发生 mousemove 事件。
    /*
        其实这里只是控制了两个元素 .handle--left  top--width 
    */
    addEvent(wrapper,'mousemove',function(ev){
        var e = ev||window.event;  //event 
        delta=(e.clientX-window.innerWidth/2)*0.5;
        handle.style.left=e.clientX+delta+'px';
        topWrapper.style.width=e.clientX+skew+delta+'px';
    })
}

//在一开始就给容器添加了事件监听
// document.addEventListener('DOMContentLoaded',func);
addEvent(document,'DOMContentLoaded',func);

