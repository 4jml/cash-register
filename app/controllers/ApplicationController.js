cashRegister.controller('ApplicationController', function ($scope, Restangular, AuthService) {
	$scope.isAuthenticated = function() {
		return AuthService.isAuthenticated();
	}
	$scope.refreshBasket = function () {
		BasketService.load();
	}
	$scope.addToBasket = function (product) {
		BasketService.add(product);
	}
	$scope.countBasket = function () {
		return BasketService.count();
	}

	$scope.barcode = '';
	$scope.quantity = 1;
	$scope.price = 100;
	

	$scope.totalCommande = 0;
	$scope.products = [];
	$scope.valideDelete = false;

	$scope.numpad = function (number) {
		$scope.barcode = $scope.barcode + '' + number;
	}

	$scope.correct = function () {
		$scope.barcode = $scope.barcode.substring(0,($scope.barcode.length)-1);
	}


	$scope.check = function () {
		if ($scope.barcode.length == 5) {
			var used = false;
			angular.forEach($scope.products, function(product, key) {
				if ($scope.barcode == product.barcode) 
					used = key;
			})
			if (used === false) {
				$scope.products.push({ barcode :$scope.barcode, price : $scope.price, quantity: $scope.quantity, total :$scope.quantity*$scope.price })
				$scope.totalCommande = $scope.totalCommande + $scope.quantity*$scope.price
			}
			else {
				$scope.products[used].quantity =$scope.products[used].quantity + $scope.quantity;
				$scope.totalCommande = $scope.totalCommande - $scope.products[used].total;
				$scope.products[used].total = $scope.products[used].quantity * $scope.products[used].price;
				$scope.totalCommande = $scope.totalCommande + $scope.products[used].total;
			}
			

			$scope.barcode ="";
			$scope.quantity = 1
			

		}
	}

	$scope.delete = function (product) {
		if(confirm("Voulez vous supprimer l'article")){

		var index = $scope.products.indexOf(product);
		$scope.products.splice(index,1);
		$scope.totalCommande = $scope.totalCommande - product.total;

		}

	}

	$scope.addQuantity = function (product) {
		product.quantity = product.quantity +1;
		$scope.totalCommande = $scope.totalCommande - product.total;
		product.total = product.quantity * product.price;
		$scope.totalCommande = $scope.totalCommande + product.total;

	}

	$scope.removeQuantity = function (product) {
		if(product.quantity > 1){
		$scope.totalCommande = $scope.totalCommande - product.total;
		product.quantity = product.quantity -1;
		product.total = product.quantity * product.price;
		$scope.totalCommande = $scope.totalCommande + product.total;}

	}

	$scope.addQuantityNewLine = function () {
		$scope.quantity++;

	}

	$scope.removeQuantityNewLine = function () {
		if($scope.quantity > 1){
		$scope.quantity = $scope.quantity -1;
		}
	}

	$scope.paiment = function () {
		alert("Paiment éffectué")
	}

	$scope.alert = function () {
		alert("Un agent va intervenir")
	}

	$scope.print = function () {
		alert("Le ticket est en cours d'impression")
	}



	$scope.$watch('barcode', $scope.check);
	$scope.$watch('quantity', $scope.check);

});