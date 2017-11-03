// JavaScript Document
var pie = {
    run:function(opts){
        if(!opts.id) throw new Error("must be canvas id.");
        var canvas = document.getElementById(opts.id), ctx;
        if(canvas && (ctx = canvas.getContext("2d"))){  //ctx 创建画笔
            canvas.width = canvas.height = "200"; //画布的宽高定义
            canvas.color = '#fff';
            var noop = function(){};
            var before = opts.onBefore || noop;
            var after = opts.onAfter || noop;
            before(ctx);
            ctx.fillStyle = '#fff';  //#f76220
            var step = opts.step || 1;  //画圆的速度
            var delay = opts.delay || 10;
            var i = 0, rage = 360 * (opts.percent || 0);
            var sRage = -Math.PI * 0.5;
            var djs = function(){
                i = i + step;
                if(i <= rage){
                    ctx.beginPath();
                    ctx.fillStyle = '#f00'; 
                    ctx.moveTo(100, 100);   
                    ctx.arc(100, 100, 100, sRage, Math.PI * 2 * (i/360)+sRage);  //变
                    ctx.fill();
                    setTimeout(djs, delay);
                } else {
                    after(ctx);
                }
            };
            djs();
        }
    }
};

pie.run({
	id:"jqm-round-sector",  //需要canvas的id 以便知道画到哪个canvas中
	percent: 0.99, //圆要画到多少程度
	onBefore:function(ctx){
		// ctx.fillStyle = '#fff';  //e8e8e8
		ctx.beginPath();
		ctx.moveTo(100, 100);   
		ctx.arc(100, 100, 100, 0, Math.PI * 2);
		ctx.fill();
	}
});
