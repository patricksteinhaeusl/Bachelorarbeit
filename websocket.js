'use strict';

const cookie = require('cookie');

module.exports = function(server) {
    const io = require('socket.io')(server, {
        transports: ['websocket']
    });

    let users = [];

    io.on('connection', function(socket) {

        let room = null;
        if(socket.request.headers.cookie) {
            let cookies = cookie.parse(socket.request.headers.cookie);
            room = cookies.chatUser;
            if(room) {
                socket.join(room);
            }
        }

        socket.on('join', function (user) {
            join(user);
            socket.join(user._id);
        });

        socket.on('reJoin', function (user) {
            let updatedUser = updateUser(user);

            if(updatedUser) {
                socket.emit('join', updatedUser);
                io.emit('userList', users);
                socket.join(updatedUser._id);
            } else {
                join(user);
                socket.join(user._id);
            }
        });

        socket.on('leave', function (data) {
            deleteUser(data);
            socket.emit('leave');
            io.emit('userList', users);
        });

        socket.on('getMsg', function (data) {
            socket.to(data.to).emit('sendMsg', { msg: data.msg, from: data.from });
        });

        io.emit('userList', users);

        function join(user) {
            let newUser = {
                _id: user._id,
                username: user.username
            };

            if(!existsUser(newUser)) {
                users.push(newUser);
            }

            socket.emit('join', newUser);
            io.emit('userList', users);
        }

        function existsUser(user) {
            for(let i = 0; i < users.length; i++) {
                if(users[i]._id === user._id) {
                    return true;
                }
            }
            return false;
        }

        function updateUser(user) {
            for(let i = 0; i < users.length; i++) {
                if(users[i]._id === user._id) {
                    users[i].username = user.username;
                    return users[i];
                }
            }
            return null;
        }

        function deleteUser(user) {
            for(let i = 0; i < users.length; i++) {
                if(users[i]._id === user._id) {
                    users.splice(i, 1);
                }
            }
        }
    });
};
