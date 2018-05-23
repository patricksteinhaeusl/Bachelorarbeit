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


    self.reJoin = (user) => {
        this.emit('reJoin', user);
    };

    self.join = (user) => {
        this.emit('join', user);
    };

    self.leave = (user) => {
        this.emit('leave', user);
    };

    return {
        on: self.on,
        emit: self.emit,
        reJoin: self.reJoin,
        join: self.join,
        leave: self.leave
    }
}]);
