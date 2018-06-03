'use strict';

appInterceptors.factory('AuthInterceptor', ['$q', '$location', 'localStorageService', function ($q, $location, localStorageService) {
    return {
        response: function response(_response) {
            return _response || $q.when(_response);
        },
        responseError: function responseError(rejection) {
            if (rejection.status === 401) {
                localStorageService.remove('token');
                localStorageService.remove('user');
                $location.path('/home');
            }
            return $q.reject(rejection);
        }
    };
}]);