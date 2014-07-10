var radianDrive = angular.module('radianDrive' , [ 'ngRoute' , 'restangular' ]);

radianDrive.run(function($rootScope, Restangular, BasketService, AuthService) {
	// Hydrate basket from session
	BasketService.load();

	// Login customer
	AuthService.login(null);

	// Loading selected shop if there is one
	if (typeof $.cookie('shop_id') != "undefined")
	{
		Restangular.one('shops').get().then(function(shop) {
		$rootScope.shop = shop;
	});
	}
});

radianDrive.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
		when('/', {
			templateUrl: 'app/views/index.html',
		}).
		when('/auth', {
			templateUrl: 'app/views/auth.html',
			controller: 'AuthController',
			routeTitle: 'Authentification',
			routeName: 'auth'
		}).
		when('/disconnect', {
			templateUrl: 'app/views/auth.html',
			controller: 'DisconnectController',
			routeTitle: 'Déconnexion',
			routeName: 'disconnect'
		}).
		when('/category/:id', {
			templateUrl: 'app/views/products/category.html',
			controller: 'ProductsCategoryController',
			routeTitle: 'Liste des produits',
			routeName: 'products_category'
		}).
		when('/basket', {
			templateUrl: 'app/views/basket/list.html',
			controller: 'BasketListController',
			routeTitle: 'Votre panier',
			routeName: 'basket_list'
		}).
		when('/basket/valid', {
			templateUrl: 'app/views/basket/valid.html',
			controller: 'BasketValidController',
			routeTitle: 'Valider votre commande',
			routeName: 'basket_valid'
		}).
		otherwise({
			redirectTo: '/'
		});
	}
]);

radianDrive.config(function(RestangularProvider) {
	RestangularProvider.setBaseUrl(API_URL);
	RestangularProvider.setDefaultHeaders({
		'radian_app': 'radian_drive',
	});
	// RestangularProvider.setDefaultHttpFields({
	// 	headers: {
	// 		test: 'test'
	// 	}
	// });
	RestangularProvider.setDefaultHttpFields({
		'withCredentials': true
	});
});