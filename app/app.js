var cashRegister = angular.module('cashRegister' , [ 'ngRoute' , 'restangular' ]);

cashRegister.run(function($rootScope, Restangular, AuthService) {
	//AuthService.login(null);
});

cashRegister.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
		when('/', {
			templateUrl: 'app/views/index.html',
		}).
		otherwise({
			redirectTo: '/'
		});
	}
]);

// radianDrive.config(function(RestangularProvider) {
// 	RestangularProvider.setBaseUrl(API_URL);
// 	RestangularProvider.setDefaultHeaders({
// 		'radian_app': 'radian_drive',
// 	});
// 	RestangularProvider.setDefaultHttpFields({
// 		'withCredentials': true
// 	});
// });