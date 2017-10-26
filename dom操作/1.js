/*
    动画思路：
    如何判断鼠标到底是从哪来
    判断距离 距离越小的那么就是那个方向
*/
var box = document.getElementById('box');
var lis = box.getElementsByTagName('li');
for(var i=0;i<lis.length;i++){
    lis[i].addEventListener('mouseenter',function(e){
        console.log(e.clientHeight,e.clientWidth);
        console.log(lis[i].offsetX,lis[i].offsetY);
    }) 
}















