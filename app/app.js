var cashRegister = angular.module('cashRegister' , [ 'ngRoute' , 'restangular' ]);

cashRegister.run(function($rootScope, Restangular, AuthService) {
	AuthService.login(null);
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

cashRegister.config(function(RestangularProvider) {
	RestangularProvider.setBaseUrl(API_URL);
	RestangularProvider.setDefaultHttpFields({
		'withCredentials': true
	});
});

// jQuery bonus

$(function() {

    $('[data-popup-target]').click(function () {
        $('html').addClass('overlay');
        var activePopup = $(this).attr('data-popup-target');
        $(activePopup).addClass('visible');

    });

    $(document).keyup(function (e) {
        if (e.keyCode == 27 && $('html').hasClass('overlay')) {
            clearPopup();
        }
    });

    $('.popup-exit').click(function () {
        clearPopup();

    });

    $('.popup-overlay').click(function () {
        clearPopup();
    });

    function clearPopup() {
        $('.popup.visible').addClass('transitioning').removeClass('visible');
        $('html').removeClass('overlay');

        setTimeout(function () {
            $('.popup').removeClass('transitioning');
        }, 200);
    }

});