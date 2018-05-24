'use strict';

appServices.factory('WebSocketService', ['$rootScope', function($rootScope) {
    let self = this;

    self.socket = io.connect({
        transports: ['websocket']
    });

    self.on = (eventName, callback) => {
        self.socket.on(eventName, function () {
            let args = arguments;
            $rootScope.$apply(function () {
                callback.apply(self.socket, args);
            });
        });
    };

    self.emit = (eventName, data, callback) => {
        self.socket.emit(eventName, data, function () {
            let args = arguments;
            $rootScope.$apply(function () {
                if (callback) {
                    callback.apply(self.socket, args);
                }
            });
        })
    };

    self.join = (account) => {
        self.emit('join', account);
    };

    self.leave = (account) => {
        self.emit('leave', account);
    };

    return {
        on: self.on,
        emit: self.emit,
        join: self.join,
        leave: self.leave
    }
}]);
