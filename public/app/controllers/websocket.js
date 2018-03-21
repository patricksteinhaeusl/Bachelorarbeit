'use strict';

appControllers.controller('WebSocketController', ['$scope', 'AuthService', 'WebSocketService', function ($scope, authService, webSocketService) {
    const self = this;
    self.id = null;
    self.socketId = null;
    self.userName = null;
    self.selectedUser = null;
    self.messages = [];
    self.msgData = null;
    self.userList = [];

    self.selectedUser = function (selectedUser) {
        self.selectedUser = selectedUser;
    };

    if(authService.isAuthenticated()) {
        webSocketService.emit('register', authService.getUser().username);
    }

    webSocketService.on('user', function (data) {
        self.id = data.id;
        self.socketId = data.socketId;
        self.userName = data.userName;
    });

    webSocketService.on('userList', function (userList) {
        self.userList = userList;
    });

    self.sendMsg = function () {
        webSocketService.emit('getMsg',{
            toId : self.selectedUser,
            msg : self.message,
            name : self.userName
        });
        self.message = null;
    };

    webSocketService.on('sendMsg', function (data) {
        self.messages.push(data);
        console.log(self.messages);
    });
}]);
