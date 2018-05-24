'use strict';

const cookie = require('cookie');
const ChatUser = require('./models/chatUser.js');
const ChatMessage = require('./models/chatMessage.js');

module.exports = (server) => {
    const io = require('socket.io') (server, {
        transports: ['websocket']
    });

    io.on('connection', (socket) => {
        // Join Room if cookie exists
        if(socket.request.headers.cookie) {
            let cookies = cookie.parse(socket.request.headers.cookie);
            if(cookies.chatUser) {
                socket.join(cookies.chatUser);
            }
        }

        socket.on('join', (account) => {
            let userObj = new ChatUser({ socketId: socket.id, userId: account._id, username: account.username});
            // Create user
            ChatUser.create(userObj).then((newUser) => {
                io.emit('join', newUser);
                updateUserList();
            }).catch((error) => {
                if((error.code === 11000 && error.name === 'BulkWriteError') || error.errors) {
                    // Update existing User
                    ChatUser.findOneAndUpdate({
                        userId: userObj.userId,
                    }, {
                        $set: {
                            socketId: socket.id,
                            username: userObj.username
                        }
                    }, {
                        new: true
                    }).then((updatedUser) => {
                        socket.emit('join', updatedUser);
                        updateUserList();
                    }).catch((error) => {
                        console.log("Update User", error);
                    });
                }
            });
        });

        socket.on('leave', (account) => {
            // Remove user
            ChatUser.remove({ userId: account._id}).then(() => {
                socket.emit('leave');
            }).catch((error) => {
                console.log("ERROR Leave", error);
            });
        });

        socket.on('disconnect', () => {
            // Remove user
            ChatUser.remove({ socketId: socket.id })
                .then(() => {

                }).catch((error) => {
                    console.log("ERROR Disconnect", error);
                });
        });

        socket.on('getMessage', (message) => {
            let messageObj = new ChatMessage(message);

            ChatMessage.create(messageObj).then((newMessage) => {
                ChatMessage.find()
                    .limit(5)
                    .sort({ createdAt: -1 }).exec((error, messages) => {
                        if(!error) {
                            io.in(newMessage.from.id).emit('getMessages', messages);
                            io.in(newMessage.to.id).emit('getMessages', messages);
                        }
                });
            }).catch((error) => {
                console.log("ERROR getMessage", error);
            });
        });

        socket.on('getMessagesByFromTo', (from, to) => {
            ChatMessage.find({
                    $or: [{
                        $and: [
                            {'from.id': from.id},
                            {'to.id': to.id},
                        ]
                    }, {
                        $and: [
                            {'from.id': from.id},
                            {'to.id': to.id},
                        ]
                    }]
                })
                .limit(5)
                .sort({ createdAt: -1 }).exec((error, messages) => {
                if(!error) {
                    io.in(newMessage.from.id).emit('getMessagesByFromTo', messages);
                    io.in(newMessage.to.id).emit('getMessagesByFromTo', messages);
                }
            });
        });

        function updateUserList() {
            // Update userList
            ChatUser.find({}).then((users) => {
                io.emit('getUserList', users);
            }).catch((error) => {
                console.log("ChatUser.find", error);
            });
        }

        updateUserList();

    });
};
