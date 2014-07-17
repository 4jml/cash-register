cashRegister.controller('ApplicationController', function ($scope, Restangular, AuthService, SessionService, AUTH_EVENTS, $timeout) {
	$scope.app = { user : SessionService };
	$scope.isAuthorized = AuthService.isAuthorized;
	$scope.isAuthenticated = AuthService.isAuthenticated;
	$scope.isLoaded = false;

	$scope.$on(AUTH_EVENTS.loginAttempt, function(event, data){
		$timeout(function() {
			$scope.isLoaded = true;
		}, 500);
	});

	$scope.focus = function () {
		$('#barcode').focus();
	}

	$scope.focus();

	$scope.barcode = '';
	$scope.quantity = 1;
	$scope.price = 100;

	$scope.totalCommande = 0;
	$scope.products = [];
	$scope.valideDelete = false;

	$scope.numpad = function (number) {
		$scope.barcode = $scope.barcode + '' + number;
		$scope.focus();
	}

	$scope.correct = function () {
		$scope.barcode = $scope.barcode.substring(0,($scope.barcode.length)-1);
		$scope.focus();
	}



	$scope.check = function () {
		// console.log('test');
		if ($scope.barcode.length > 4) {
			var used = false;
			angular.forEach($scope.products, function(product, key) {
				if ($scope.barcode == product.barcode)
					used = key;
			})
			if (used === false) {
				console.log('test');
				// $scope.products.push({ barcode :$scope.barcode, price : $scope.price, quantity: $scope.quantity, total :$scope.quantity*$scope.price })
				Restangular.one('products/barcode', $scope.barcode).get().then(function(product) {
					product.quantity = $scope.quantity;
					product.total = product.quantity * product.price;
					$scope.products.push(product);
					$scope.barcode = "";
					$scope.quantity = 1;
					$scope.totalCommande = $scope.totalCommande + $scope.quantity * $scope.price
				},
				function() {

				})
			}
			else {
				$scope.products[used].quantity =$scope.products[used].quantity + $scope.quantity;
				$scope.totalCommande = $scope.totalCommande - $scope.products[used].total;
				$scope.products[used].total = $scope.products[used].quantity * $scope.products[used].price;
				$scope.totalCommande = $scope.totalCommande + $scope.products[used].total;
				$scope.barcode = "";
				$scope.quantity = 1
			}

		}
	}

	$scope.delete = function (product) {
		if(confirm("Voulez vous supprimer l'article")) {
			var index = $scope.products.indexOf(product);
			$scope.products.splice(index,1);
			$scope.totalCommande = $scope.totalCommande - product.total;
			$scope.focus();
		}

	}

	$scope.addQuantity = function (product) {
		product.quantity = product.quantity +1;
		$scope.totalCommande = $scope.totalCommande - product.total;
		product.total = product.quantity * product.price;
		$scope.totalCommande = $scope.totalCommande + product.total;
		$scope.focus();
	}

	$scope.removeQuantity = function (product) {
		if(product.quantity > 1) {
			$scope.totalCommande = $scope.totalCommande - product.total;
			product.quantity = product.quantity -1;
			product.total = product.quantity * product.price;
			$scope.totalCommande = $scope.totalCommande + product.total;
		}
		$scope.focus();

	}

	$scope.addQuantityNewLine = function () {
		$scope.quantity++;
		$scope.focus();

	}

	$scope.removeQuantityNewLine = function () {
		if($scope.quantity > 1){
			$scope.quantity = $scope.quantity -1;
		}
		$scope.focus();
	}

	$scope.paiment = function () {
		alert("Paiement effectué");
		$scope.focus();
	}

	$scope.alert = function () {
		alert("Un agent va intervenir");
		$scope.focus();
	}

	$scope.print = function () {
		alert("Le ticket est en cours d'impression");
		$scope.focus();
	}



	$scope.$watch('barcode', $scope.check);
	$scope.$watch('quantity', $scope.check);

});