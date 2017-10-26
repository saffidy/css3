var cartController = function($scope){
	(function init(){
		$scope.vo = {};
		$scope.vc = {};
	})();

	$scope.vo.cart = [
		{
			id:100,
			name:'iphone5s',
			quantity:2,
			price:4300
		},
		{
			id:130,
			name:'iphone5',
			quantity:1,
			price:2100			
		},
		{
			id:200,
			name:'imac',
			quantity:5,
			price:14300
		},
		{
			id:110,
			name:'ipid',
			quantity:30,
			price:3300
		}
	];	


	//商品数量的加减按钮
	$scope.vc.add = function(item){
		++item.quantity;
	};

	$scope.vc.reduce = function(item,index){
		if(item.quantity-1 <= 0){
			var returnKey = confirm("是否从购物车中删除该产品！");
			if(returnKey){
				$scope.vc.remove(item,index);
			}
		}else{
			--item.quantity;
		}
	}

	//移除某一条
	$scope.vc.remove = function(item,index){
		$scope.vo.cart.splice(index,1);
	}

	//总购物价 总购买数量  这两个函数完全都不用监控 都是自动双向数据绑定
	$scope.vc.totalPrice = function(){
		var total = 0;
		angular.forEach($scope.vo.cart,function(item){
			total += parseInt(item.quantity * item.price);
		})
		return total;
	}

	$scope.vc.totalQuantity = function(){
		var totalNum = 0;
		angular.forEach($scope.vo.cart,function(item){
			totalNum += parseInt(item.quantity);
		})
		return totalNum;
	}
};