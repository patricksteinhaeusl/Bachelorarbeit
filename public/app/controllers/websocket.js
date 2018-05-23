'use strict';

appControllers.controller('WebSocketController', ['$rootScope', '$scope', 'AuthService', 'WebSocketService', function ($rootScope, $scope, AuthService, WebSocketService) {
    const self = this;

    self.user = null;
    self.message = null;
    self.messages = [];
    self.userList = [];

    self.selectedUser = null;

    self.selectUser = (selectedUser) => {
        self.selectedUser = selectedUser;
    };

    self.sendMsg = () => {
        if(self.selectedUser) {
            WebSocketService.emit('getMsg',{
                to : self.selectedUser._id,
                msg : self.message,
                from : self.user.username
            });
            self.message = null;
        } else {
            $rootScope.messages.warnings.push('User must be selected.');
        }
    };

    if(AuthService.isAuthenticated()) {
        let authUser = {
            _id: AuthService.getUser()._id,
            username: AuthService.getUser().username
        };

        WebSocketService.reJoin(authUser);
    }

    WebSocketService.on('join', (user) => {
        self.user = user;
    });

    WebSocketService.on('leave', () => {
        self.user = null;
    });

    WebSocketService.on('userList', (userList) => {
        self.userList = userList;
    });

    WebSocketService.on('sendMsg', (data) => {
        self.messages.push(data);
        console.log(self.messages);
    });

    self.collapseChat = (elementClassToSlide) => {
        $(() => {
            if (!$(elementClassToSlide).is(':visible')) {
                $(elementClassToSlide).fadeIn();
            } else {
                $(elementClassToSlide).fadeOut();
            }
        });
    };
}]);
