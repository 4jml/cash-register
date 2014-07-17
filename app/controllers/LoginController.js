cashRegister.controller('LoginController', function ($scope, $rootScope, AuthService, AUTH_EVENTS) {
	$scope.credentials = {
		username: '',
		password: ''
	};
	$scope.login = function (credentials) {
		AuthService.login(credentials).then(function () {
			$rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
		}, function () {
			$rootScope.$broadcast(AUTH_EVENTS.loginFailed);
		});
	};
});