'use strict';

appServices.factory('WebSocketService', ['$rootScope', function ($rootScope) {
    let self = this;
    self.socket = io.connect({
        transports: ['websocket']
    });

    return {
        on(eventName, callback) {
            self.socket.on(eventName, () => {
                let args = arguments;
                $rootScope.$apply(() => {
                    callback.apply(self.socket, args);
                });
            });
        },
        emit(eventName, data, callback) {
            self.socket.emit(eventName, data, () => {
                let args = arguments;
                $rootScope.$apply(() => {
                    if (callback) {
                        callback.apply(self.socket, args);
                    }
                });
            })
        },
        reJoin(user) {
            this.emit('reJoin', user);
        },
        join(user) {
            this.emit('join', user);
        },
        leave(user) {
            this.emit('leave', user);
        }
    };
}]);
