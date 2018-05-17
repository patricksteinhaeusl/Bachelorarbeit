'use strict';

appControllers.controller('WebSocketController', ['$scope', 'AuthService', 'WebSocketService', function ($scope, AuthService, WebSocketService) {
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
        WebSocketService.emit('getMsg',{
            to : self.selectedUser._id,
            msg : self.message,
            from : self.user.username
        });
        self.message = null;
    };

    if(AuthService.isAuthenticated()) {
        let authUser = {
            _id: AuthService.getUser()._id,
            username: AuthService.getUser().username
        };

        WebSocketService.reJoin(authUser);
    }

    WebSocketService.on('join', function (user) {
        self.user = user;
    });

    WebSocketService.on('leave', function () {
        self.user = null;
    });

    WebSocketService.on('userList', function (userList) {
        self.userList = userList;
    });

    WebSocketService.on('sendMsg', function (data) {
        self.messages.push(data);
    });

    self.collapseChat = function (elementClassToSlide) {
        $(function () {
            if (!$(elementClassToSlide).is(':visible')) {
                $(elementClassToSlide).fadeIn();
            } else {
                $(elementClassToSlide).fadeOut();
            }
        });
    };
}]);
