appInterceptors.factory('AuthInterceptor', ['$q', '$location', 'localStorageService', function ($q, $location, localStorageService) {
    return {
        response: (response) => {
            return response || $q.when(response);
        },
        responseError: (rejection) => {
            if (rejection.status === 401) {
                localStorageService.remove('token');
                localStorageService.remove('user');
                $location.path('/home');
            }
            return $q.reject(rejection);
        }
    }
}]);
