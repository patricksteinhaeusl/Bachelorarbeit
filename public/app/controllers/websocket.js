'use strict';

appControllers.controller('WebSocketController', ['$rootScope', '$scope', 'AuthService', 'WebSocketService', function ($rootScope, $scope, AuthService, WebSocketService) {
    const self = this;
    self.user = null;
    self.userList = [];
    self.selectedUser = null;
    self.messages = [];

    self.join = () => {
        const account = AuthService.getUser();
        WebSocketService.join(account);
    };

    WebSocketService.on('join', (user) => {
        self.user = user;
    });

    self.leave = () => {
        const account = AuthService.getUser();
        WebSocketService.join(account);
    };

    WebSocketService.on('leave', () => {
        self.user = null;
    });

    WebSocketService.on('getMessages', (messages) => {
        self.messages = messages;
        self.scrollBottom();
    });

    WebSocketService.on('getMessagesByFromTo', (messages) => {
        self.messages = messages;
        self.scrollBottom();
    });

    WebSocketService.on('getUserList', (userList) => {
        self.userList = userList;
    });

    self.sendMessage = () => {
        if(self.selectedUser) {
            const message = {
                from: {
                    id: self.user.socketId,
                    username: self.user.username
                },
                to: {
                    id: self.selectedUser.socketId,
                    username: self.selectedUser.username
                },
                text: self.message
            };

            WebSocketService.emit('getMessage', message);
        } else {
            $rootScope.messages.warnings.push('User must be selected.');
        }
        self.message = null;
    };

    self.selectUser = (selectedUser) => {
        self.selectedUser = selectedUser;
    };

    self.collapseChat = (elementClassToSlide) => {
        $(() => {
            if (!$(elementClassToSlide).is(':visible')) {
                $(elementClassToSlide).fadeIn();
            } else {
                $(elementClassToSlide).fadeOut();
            }
        });
    };

    self.scrollBottom = () => {
        $(() => {
            let messageBox = $('.message-box');
            messageBox.scrollTop(messageBox.prop("scrollHeight"));
        });
    };

    if(AuthService.isAuthenticated()) {
        self.join();
    }
}]);
