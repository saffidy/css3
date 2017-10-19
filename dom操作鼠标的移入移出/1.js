/*
	如何提升自己？
	整天用框架提升不了多少，除非你真的研究了些什么。
	还是要多多用原生js，多多写原生js

	工作中实现原则：
	能用css3实现的动画就不用Js
	能用css3+js实现的动画就不用纯js

	核心的事件原理：
	1.获取鼠标移入的坐标和当前的li每一条边距离浏览器上边、左边的距离
	2.鼠标的X Y减去当前的每一条边距离浏览器上、左边的距离的差值，最小的那个至就是我移入的方向
	3.做相对应的最小值的运动动画

	遮罩层本来是隐藏放在图片上面，那么动画就是要他瞬间跑到上面，然后下来的动画。
*/
/*
	事件绑定 事件监听
	事件捕获 事件冒泡
	事件委托：一个或一组的元素委托到父层或更外层
*/
var oBox = document.getElementById('box');
var aLi = oBox.getElementsByTagName('li');
// for(var i = 0;i < ali.length;i++){
	//一个是事件监听，一个是事件绑定；  false是在事件捕获阶段就执行，true是在事件冒泡阶段（比如鼠标移动来移动去）执行。
	//事件绑定为什么不好？因为这个函数很有可能被别人复写，会被覆盖掉。。但是事件监听不会。。
	// aLi[i].addEventListener('mouseenter',function(e){
	// 	if(e.type.toLowerCase() === 'mouseenter'){

	// 	}
	// },false);
oBox.addEventListener('mouseenter',move,true);
oBox.addEventListener('mouseleave',move,true);

function move(e){
	if(e.target.nodeName.toLowerCase() === 'li'){
		var that = e.target;
		var top = that.offsetTop;  //元素距离浏览器上边的距离
		var bottom = top + that.clientHeight;  //元素本身的高度
		var left = that.offsetLeft;  //元素距离浏览器左边的距离
		var right = left + that.clientWidth; //元素本身的宽度
		//鼠标的坐标相对于浏览器的原点
		var x = e.clientX; //鼠标距离浏览器左边的距离  var x = e.clientX;
		var y = e.clientY; //鼠标距离浏览器上边的距离  var y = e.clientY;
		var sT = Math.abs(y - top); //Math.abs()  取绝对值
		var sB = Math.abs(y - bottom);
		var sL = Math.abs(x - left);
		var sR = Math.abs(x - right);
		var direction = Math.min(sT,sB,sL,sR); //Math.min()  取最小值
		if(e.type.toLowerCase() === 'mouseenter'){
			switch(direction){
				case sT:
					console.log('t enter');
					that.children[1].className =  'from-top';
					break;
				case sB:
				console.log('b enter');
					that.children[1].className = 'from-bottom';
					break;
				case sL:
				console.log('l enter');
					that.children[1].className = 'from-left';
					break;
				case sR:
				console.log('r enter');
					that.children[1].className = 'from-right';
					break;
			}									
		}else if(e.type.toLowerCase() === 'mouseleave'){
			switch(direction){
				case sT:
				console.log('t leave');
					that.children[1].className =  'to-top';
					break;
				case sB:
				console.log('b leave');
					that.children[1].className = 'to-bottom';
					break;
				case sL:
				console.log('l leave');
					that.children[1].className = 'to-left';
					break;
				case sR:
				console.log('r leave');
					that.children[1].className = 'to-right';
					break;
			}								
		}
	}
}

	// aLi[i].onmouseenter = function(e){ //鼠标移入

	// }
	// aLi[i].onmouserleave = function(){

	// }
// }