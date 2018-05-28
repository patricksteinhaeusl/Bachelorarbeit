'use strict';

appControllers.controller('WebSocketController', ['$rootScope', '$scope', 'AuthService', 'WebSocketService', 'AlertsService',
    function ($rootScope, $scope, AuthService, WebSocketService, AlertsService) {
        const self = this;
        self.user = null;
        self.userList = [];
        self.selectedUser = null;
        self.messages = [];
        self.isLoadingUserList = false;
        self.isLoadingMessages = false;

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
            console.log('getMessages');
            self.messages = messages;
            self.scrollBottom();
            self.isLoadingMessages = false;
        });

        WebSocketService.on('refreshUserList', () => {
            self.isLoadingUserList = true;
            WebSocketService.emit('sendUserList');
        });

        WebSocketService.on('getUserList', (userList) => {
            self.userList = userList;
            self.isLoadingUserList = false;
        });

        self.sendMessage = () => {
            if(self.selectedUser) {
                self.isLoadingMessages = true;
                const message = {
                    from: {
                        userId: self.user.userId,
                        username: self.user.username
                    },
                    to: {
                        userId: self.selectedUser.userId,
                        username: self.selectedUser.username
                    },
                    text: self.message
                };

                WebSocketService.emit('saveMessage', message);
                WebSocketService.emit('sendMessagesToRooms', { from: { userId: self.user.userId }, to: { userId: self.selectedUser.userId } } );
            } else {
                AlertsService.addWarning('User must be selected');
            }
            self.message = null;
        };

        self.selectUser = (selectedUser) => {
            self.isLoadingMessages = true;
            self.selectedUser = selectedUser;
            WebSocketService.emit('sendMessagesToRoom', { from: { userId: self.user.userId }, to: { userId: self.selectedUser.userId } } );
        };

        self.collapseChat = (elementClassToSlide) => {
            $(() => {
                if (!$(elementClassToSlide).is(':visible')) {
                    $(elementClassToSlide).fadeIn();
                } else {
                    $(elementClassToSlide).fadeOut();
                    self.selectedUser = null;
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
