radianDrive.controller('ApplicationController', function ($scope, Restangular, BasketService, AuthService) {
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
});