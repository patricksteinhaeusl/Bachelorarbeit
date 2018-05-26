'use strict';

let routes = {
    '/home': {
        templateUrl: 'views/home.html',
        requireLogin: false
    },
    '/shop': {
        templateUrl: 'views/shop.html',
        controller: 'ShopController',
        controllerAs: 'shop',
        requireLogin: false
    },
    '/shop/category/:categoryId': {
        templateUrl: 'views/shop.html',
        controller: 'ShopCategoryController',
        controllerAs: 'shop',
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
    '/account/:accountId/profile': {
        templateUrl: (params) => {
            let templateUrl = 'assets/profiles/' + params.accountId + '.html';
            let templateNotFound = 'assets/profiles/notFound.html';
            if(templateExists(templateUrl)) {
                return templateUrl + '?' + new Date();
            } else {
                return templateNotFound;
            }
        },
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
    '/product/:productId': {
        templateUrl: 'views/product.html'
    },
    '/retailer': {
        templateUrl: 'views/retailer.html',
        requireLogin: true
    },
    '/faq': {
        templateUrl: 'views/faq.html',
        requireLogin: false
    },
    '/profiles': {
        templateUrl: 'views/profiles.html',
        requireLogin: true
    }
};

let appInterceptors = angular.module('app.interceptors', []);
let appControllers = angular.module('app.controllers', []);
let appServices = angular.module('app.services', []);
let appDirectives = angular.module('app.directives', []);
let appFilters = angular.module('app.filters', []);

angular.module('app', [
    'ngRoute',
    'ngCookies',
    'ngSanitize',
    'LocalStorageModule',
    'ngFileUpload',
    'angular-toArrayFilter',
    'jkAngularRatingStars',
    'app.interceptors',
    'app.controllers',
    'app.services',
    'app.directives',
    'app.filters',
    'angular-clipboard'
])
.config(['$httpProvider', '$locationProvider', '$routeProvider', '$compileProvider', 'localStorageServiceProvider',
    ($httpProvider, $locationProvider, $routeProvider, $compileProvider, localStorageServiceProvider) => {
        $httpProvider.interceptors.push('AuthInterceptor', 'AlertInterceptor');
        $locationProvider.html5Mode(false).hashPrefix('!');

        for (let path in routes) {
            $routeProvider.when(path, routes[path]);
        }

        $routeProvider.otherwise({redirectTo: '/home'});

        localStorageServiceProvider
            .setPrefix('')
            .setStorageType('localStorage');

        $compileProvider.debugInfoEnabled(true);
}]).run(['$rootScope', '$http', '$location', 'localStorageService', 'AuthService', ($rootScope, $http, $location, localStorageService, authService) => {
    if (!localStorageService.get('items')) {
        localStorageService.set('items', '[]');
    }

    if (localStorageService.get('token')) {
        $http.defaults.headers.common.Authorization = 'Bearer ' + localStorageService.get('token');
    }

    $rootScope.$on("$locationChangeStart", (event, next, current) => {
        for (let path in routes) {
            if (next.indexOf(path) !== -1) {
                if (routes[path].requireLogin && !authService.isAuthenticated()) {
                    event.preventDefault();
                    $location.path('/home');
                }
            }
        }
    });

    $rootScope.messages = {};
    $rootScope.messages.successes = [];
    $rootScope.messages.warnings = [];
    $rootScope.messages.validations = [];
    $rootScope.messages.errors = [];
}]);

function templateExists(templateUrl) {
    let xhr = new XMLHttpRequest();
    xhr.open('HEAD', templateUrl, false);
    xhr.send();
    return xhr.status === 404 ? false : true;
}
