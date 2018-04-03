'use strict';

appServices.factory('WebSocketService', ['$rootScope', function($rootScope) {
    let self = this;
    self.socket = io.connect();

    return {
        on: function (eventName, callback) {
            self.socket.on(eventName, function () {
                let args = arguments;
                $rootScope.$apply(function () {
                    callback.apply(self.socket, args);
                });
            });
        },
        emit: function (eventName, data, callback) {
            self.socket.emit(eventName, data, function () {
                let args = arguments;
                $rootScope.$apply(function () {
                    if (callback) {
                        callback.apply(self.socket, args);
                    }
                });
            })
        },
        reJoin: function(user) {
            this.emit('reJoin', user);
        },
        join: function(user) {
            this.emit('join', user);
        },
        leave: function(user) {
            this.emit('leave', user);
        }
    };
}]);
