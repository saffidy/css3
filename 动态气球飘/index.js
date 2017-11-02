/*
    先写css写出一个静态的气球。。
    需求分析：
    1.动态生成dom元素
    2.气球向上移动做动画
    3.鼠标点击气球 气球爆炸
    4.完善气球动画 代码优化
*/
var num = 10; //气球数量初始化
var bZ = 160; //气球本身的高度
//获取浏览器的宽高
var wH = window.innerHeight;
var wW = window.innerWidth;  
init(num);
move();
//初始化生成num个气球
//初始化的时候 
function init(num){
    // console.log(num);
    var fragment = document.createDocumentFragment();
    for(var i = 0;i < num;i++){
        // var randomX = Math.floor(Math.random() * wW);
        var randomX = ~~(Math.random() * wW) - bZ;  //位运算
        randomX = Math.abs(randomX);  //取绝对值
        var balloon = document.createElement('div');
        balloon.className = 'balloon';
        balloon.style.top = wH - bZ + 'px';  //一定要加单位px
        balloon.style.left = randomX + 'px';
        balloon.speed = ~~(Math.random() * 8) + 1;
        fragment.appendChild(balloon);
    }
    // console.log(fragment);
    document.body.appendChild(fragment);                
}

// 气球移动模块
function move(){
 var balloons = document.querySelectorAll('.balloon');
 for(var i = 0,len = balloons.length; i < len;i++){
     balloons[i].style.top = balloons[i].offsetTop - balloons[i].speed + 'px';
     if(balloons[i].style.top < -bZ)
         balloons[i].style.top = wH + 'px';
 }
}

var x = 0;
function add(){
 setTimeout(arguments.callee,50);
 setTimeout(add,50); //递归调用 可以避免定时器的同步队列阻塞bug
}

// 递归：优雅性 可解读性 健壮性
/*
    递归经典应用场景：豆瓣电影的预存懒加载
    瀑布流效果 等一个标签渲染完后再渲染下一个
*/
/*
    开发一定要功能模块化，不要直接暴露到全局
    for循环直接写在script标签中是不对的，因为for不是块级作用域，所以for循环中的i是个全局变量，i会污染全局。
    浏览器重绘，
*/