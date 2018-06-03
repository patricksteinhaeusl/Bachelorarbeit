'use strict';

appServices.factory('WebSocketService', ['$rootScope', function ($rootScope) {
    var self = this;

    self.socket = io.connect({
        transports: ['websocket']
    });

    self.connect = function () {
        self.socket = io.connect({
            transports: ['websocket']
        });
    };

    self.on = function (eventName, callback) {
        self.socket.on(eventName, function () {
            var args = arguments;
            $rootScope.$apply(function () {
                callback.apply(self.socket, args);
            });
        });
    };

    self.emit = function (eventName, data, callback) {
        self.socket.emit(eventName, data, function () {
            var args = arguments;
            $rootScope.$apply(function () {
                if (callback) {
                    callback.apply(self.socket, args);
                }
            });
        });
    };

    self.join = function (account) {
        self.emit('join', account);
    };

    self.leave = function (account) {
        self.emit('leave', account);
    };

    return {
        connect: self.connect,
        on: self.on,
        emit: self.emit,
        join: self.join,
        leave: self.leave
    };
}]);