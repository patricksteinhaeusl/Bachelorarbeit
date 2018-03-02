'use strict';

let routes = {
    '/home': {
        templateUrl: 'views/home.html',
        requireLogin: false
    },
    '/aboutus': {
        templateUrl: 'views/aboutUs.html',
        requireLogin: false
    },
    '/contact': {
        templateUrl: 'views/contact.html',
        requireLogin: false
    },
    '/shop': {
        templateUrl: 'views/shop.html',
        requireLogin: false
    },
    '/auth/register': {
        templateUrl: 'views/register.html',
        requireLogin: false
    },
    '/checkout/overview': {
        templateUrl: 'views/checkOut-overview.html',
        requireLogin: true
    },
    '/checkout/address': {
        templateUrl: 'views/checkOut-address.html',
        requireLogin: true
    },
    '/checkout/payment': {
        templateUrl: 'views/checkOut-payment.html',
        requireLogin: true
    },
    '/account': {
        templateUrl: 'views/account.html',
        requireLogin: true
    },
    '/creditcards': {
        templateUrl: 'views/creditCards.html',
        requireLogin: true
    },
    '/creditcard/': {
        templateUrl: 'views/creditCard-add.html',
        requireLogin: true
    },
    '/creditcard/:creditCardNumber': {
        templateUrl: 'views/creditCard-edit.html',
        requireLogin: true
    },
    '/deliveryaddresses': {
        templateUrl: 'views/deliveryAddresses.html',
        requireLogin: true
    },
    '/deliveryaddress': {
        templateUrl: 'views/deliveryAddress-add.html',
        requireLogin: true
    },
    '/deliveryaddress/:deliveryAddressId': {
        templateUrl: 'views/deliveryAddress-edit.html',
        requireLogin: true
    },
    '/orders': {
        templateUrl: 'views/orders.html',
        requireLogin: true
    },
    '/community': {
        templateUrl: 'views/community.html',
        requireLogin: true
    },
    '/retailer': {
        templateUrl: 'views/retailer.html',
        requireLogin: true
    }
};

let app = angular.module('app', [
    'ngRoute',
    'ngSanitize',
    'LocalStorageModule',
    'ngFileUpload',
    'angular-toArrayFilter',
    'jkAngularRatingStars',
    'app.controllers',
    'app.services'
])
    .config(['$locationProvider', '$routeProvider', '$compileProvider', 'localStorageServiceProvider',
        function ($locationProvider, $routeProvider, $compileProvider, localStorageServiceProvider) {
            $locationProvider.hashPrefix('!');

            for (let path in routes) {
                $routeProvider.when(path, routes[path]);
            }

            $routeProvider.otherwise({redirectTo: '/home'});

            localStorageServiceProvider
                .setPrefix('')
                .setStorageType('localStorage');

            $compileProvider.debugInfoEnabled(true);
        }]).run(['$rootScope', '$http', '$location', 'localStorageService', 'AuthService', function ($rootScope, $http, $location, localStorageService, authService) {
        if (!localStorageService.get('items')) localStorageService.set('items', '[]');
        if (localStorageService.get('token')) {
            $http.defaults.headers.common.Authorization = 'Bearer ' + localStorageService.get('token');
        }

        $rootScope.$on("$locationChangeStart", function (event, next, current) {
            for (let path in routes) {
                if (next.indexOf(path) !== -1) {
                    if (routes[path].requireLogin && !authService.isAuthenticated()) {
                        event.preventDefault();
                        $location.path('/home');
                    }
                }
            }
        });
    }]);

let appControllers = angular.module('app.controllers', []);
let appServices = angular.module('app.services', []);
