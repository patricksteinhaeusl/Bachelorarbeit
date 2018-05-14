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
        templateUrl: function(params) {
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
    }
};

let appControllers = angular.module('app.controllers', []);
let appServices = angular.module('app.services', []);

let app = angular.module('app', [
    'ngRoute',
    'ngCookies',
    'ngSanitize',
    'LocalStorageModule',
    'ngFileUpload',
    'angular-toArrayFilter',
    'jkAngularRatingStars',
    'app.controllers',
    'app.services'
])
.factory('AuthHttpResponseInterceptor', ['$q', '$location', 'localStorageService', function ($q, $location, localStorageService) {
    return {
        response: function (response){
            return response || $q.when(response);
        },
        responseError: function (rejection) {
            if (rejection.status === 401) {
                localStorageService.remove('token');
                localStorageService.remove('user');
                $location.path('/home');
            }
            return $q.reject(rejection);
        }
    }
}])
.config(['$httpProvider', '$locationProvider', '$routeProvider', '$compileProvider', 'localStorageServiceProvider',
    function ($httpProvider, $locationProvider, $routeProvider, $compileProvider, localStorageServiceProvider) {
        $httpProvider.interceptors.push('AuthHttpResponseInterceptor');
        $locationProvider.html5Mode(false).hashPrefix('!');

        for (let path in routes) {
            $routeProvider.when(path, routes[path]);
        }

        $routeProvider.otherwise({redirectTo: '/home'});

        localStorageServiceProvider
            .setPrefix('')
            .setStorageType('localStorage');

        $compileProvider.debugInfoEnabled(true);
}]).run(['$rootScope', '$http', '$location', 'localStorageService', 'AuthService', function ($rootScope, $http, $location, localStorageService, authService) {
    if (!localStorageService.get('items')) {
        localStorageService.set('items', '[]');
    }

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

function templateExists(templateUrl) {
    let xhr = new XMLHttpRequest();
    xhr.open('HEAD', templateUrl, false);
    xhr.send();
    if(xhr.status === 404) {
        return false;
    } else {
        return true;
    }
}
