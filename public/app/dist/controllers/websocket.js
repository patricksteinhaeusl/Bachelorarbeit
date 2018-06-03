'use strict';

appControllers.controller('WebSocketController', ['$rootScope', '$scope', 'AuthService', 'WebSocketService', 'AlertsService', function ($rootScope, $scope, AuthService, WebSocketService, AlertsService) {
    var self = this;
    self.user = null;
    self.userList = [];
    self.selectedUser = null;
    self.messages = [];
    self.isLoadingUserList = false;
    self.isLoadingMessages = false;
    self.newMessagesFrom = [];

    self.join = function () {
        var account = AuthService.getUser();
        WebSocketService.join(account);
    };

    WebSocketService.on('join', function (user) {
        self.user = user;
    });

    self.leave = function () {
        var account = AuthService.getUser();
        WebSocketService.join(account);
    };

    WebSocketService.on('leave', function () {
        // On leave chat
        self.user = null;
    });

    WebSocketService.on('newMessage', function (from) {
        // On get new message indicator
        if (!self.selectedUser || self.selectedUser && self.selectedUser.userId !== from.userId) {
            if (!self.containUser(from.userId)) {
                self.newMessagesFrom.push(from);
            }
        }
    });

    WebSocketService.on('getMessages', function (messages) {
        // on get room messages
        self.messages = messages;
        self.scrollBottom();
        self.isLoadingMessages = false;
    });

    WebSocketService.on('refreshUserList', function () {
        // on refresh userlist
        self.isLoadingUserList = true;
        WebSocketService.emit('sendUserList');
    });

    WebSocketService.on('getUserList', function (userList) {
        // on get userlist
        self.userList = userList;
        self.isLoadingUserList = false;
    });

    self.sendMessage = function () {
        if (self.selectedUser) {
            self.isLoadingMessages = true;
            var message = {
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
            WebSocketService.emit('sendMessagesToRooms', { from: { userId: self.user.userId }, to: { userId: self.selectedUser.userId } });
        } else {
            AlertsService.addWarning('User must be selected');
        }
        self.message = null;
    };

    self.selectUser = function (selectedUser) {
        self.isLoadingMessages = true;
        self.selectedUser = selectedUser;

        removeNewMessageFrom();

        WebSocketService.emit('sendMessagesToRoom', { from: { userId: self.user.userId }, to: { userId: self.selectedUser.userId } });
    };

    self.collapseChat = function (elementClassToSlide) {
        $(function () {
            if (!$(elementClassToSlide).is(':visible')) {
                $(elementClassToSlide).fadeIn();
            } else {
                $(elementClassToSlide).fadeOut();
                self.selectedUser = null;
            }
        });
    };

    self.scrollBottom = function () {
        $(function () {
            var messageBox = $('.message-box');
            messageBox.scrollTop(messageBox.prop("scrollHeight"));
        });
    };

    if (AuthService.isAuthenticated()) {
        self.join();
    }

    function removeNewMessageFrom() {
        var index = 0;
        self.newMessagesFrom.forEach(function (from) {
            if (from.userId === self.selectedUser.userId) {
                self.newMessagesFrom.splice(index, 1);
            }
            index++;
        });
    }

    self.containUser = function (userId) {
        var found = false;
        self.newMessagesFrom.forEach(function (fromElement) {
            if (fromElement.userId === userId) {
                found = true;
            }
        });
        return found;
    };
}]);