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
        self.newMessagesFrom = [];

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
            // On leave chat
            self.user = null;
        });

        WebSocketService.on('newMessage', (from) => {
            // On get new message indicator
            if(!self.selectedUser || (self.selectedUser && self.selectedUser.userId !== from.userId)) {
                if(!self.containUser(from.userId)) {
                    self.newMessagesFrom.push(from);
                }
            }
        });

        WebSocketService.on('getMessages', (messages) => {
            // on get room messages
            self.messages = messages;
            self.scrollBottom();
            self.isLoadingMessages = false;
        });

        WebSocketService.on('refreshUserList', () => {
            // on refresh userlist
            self.isLoadingUserList = true;
            WebSocketService.emit('sendUserList');
        });

        WebSocketService.on('getUserList', (userList) => {
            // on get userlist
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

            removeNewMessageFrom();

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

        function removeNewMessageFrom() {
            let index = 0;
            self.newMessagesFrom.forEach((from) => {
                if (from.userId === self.selectedUser.userId) {
                    self.newMessagesFrom.splice(index, 1);
                }
                index++;
            });
        }

        self.containUser = (userId) => {
            let found = false;
            self.newMessagesFrom.forEach((fromElement) => {
                if(fromElement.userId === userId) {
                    found = true;
                }
            });
            return found;
        }
}]);
