'use strict';

appControllers.controller('WebSocketController', ['$scope', 'AuthService', 'WebSocketService', function ($scope, authService, webSocketService) {
    const self = this;

    self.user = null;
    self.message = null;
    self.messages = [];
    self.userList = [];

    self.selectedUser = null;

    self.selectUser = function (selectedUser) {
        self.selectedUser = selectedUser;
    };

    self.sendMsg = function () {
        webSocketService.emit('getMsg',{
            to : self.selectedUser._id,
            msg : self.message,
            from : self.user.username
        });
        self.message = null;
    };

    if(authService.isAuthenticated()) {
        let authUser = {
            _id: authService.getUser()._id,
            username: authService.getUser().username
        };

        webSocketService.reJoin(authUser);
    }

    webSocketService.on('join', function (user) {
        self.user = user;
    });

    webSocketService.on('leave', function () {
        self.user = null;
    });

    webSocketService.on('userList', function (userList) {
        self.userList = userList;
    });

    webSocketService.on('sendMsg', function (data) {
        self.messages.push(data);
    });
}]);
