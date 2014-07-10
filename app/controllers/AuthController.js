radianDrive.controller('AuthController', function ($scope, $routeParams, Restangular, AuthService, SessionService, $location) {
	$scope.step = 0;
	$scope.login = function() {
		AuthService.login($scope.user).then(
		function() {
			if ($scope.isAuthenticated()) {
				$location.path('/');
			}
		});
	}
	$scope.register = function() {
		if ($scope.step < 3) {
			$scope.step = 1;
			Restangular.one('customers/check', $scope.customer.email).get().then(function(result) {
				if (result == "true") {
					$scope.step = 3;
				}
				else {
					$scope.step = 2;
				}
			});
		}
		else
		{
			$scope.step = 4;
			Restangular.all('customers').post($scope.customer).then(function(customer) {
				SessionService.create(customer);
				$location.path('/basket/valid')
			});
		}
	}
});
radianDrive.controller('DisconnectController', function (SessionService, $location, Restangular) {
	Restangular.all('customers').customGET('disconnect');
	SessionService.destroy();
	$location.path('/');
});