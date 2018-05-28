'use strict';

const cookie = require('cookie');
const ChatUser = require('./models/chatUser.js');
const ChatMessage = require('./models/chatMessage.js');

let cookies = null;

module.exports = (server) => {
    const io = require('socket.io') (server, {
        transports: ['websocket']
    });

    io.on('connection', (socket) => {
        // Join Room if cookie exists
        console.log("\n");
        console.log("\n");
        console.log("\n");
        console.log("\n");
        console.log("Request cookies", socket.request.headers.cookie);
        if(socket.request.headers.cookie) {
            cookies = cookie.parse(socket.request.headers.cookie);
            console.log("CHATUSER:", cookies.chatUser);
            console.log("\n");
            console.log("\n");
            console.log("\n");
            console.log("\n");
            console.log("\n");
            if(cookies.chatUser) {
                socket.join(cookies.chatUser);
            }
        }

        socket.on('join', (account) => {
            let userObj = new ChatUser({ socketId: socket.id, userId: account._id, username: account.username});

            // Create new user
            ChatUser.findOneAndUpdate({userId: userObj.userId}, userObj, {
                upsert: true,
                new: true,
                setDefaultsOnInsert: true
            }).then((user) => {
                socket.emit('join', user);
                io.emit('refreshUserList');
            }).catch((error) => {
                socket.emit('error', 'Creating users failed!');
            });
        });

        socket.on('leave', (account) => {
            // Remove user
            ChatUser.remove({ userId: account._id}).then(() => {
                socket.emit('leave');
                io.emit('refreshUserList');
            }).catch((error) => {
                socket.emit('error', 'Leaving chat failed!');
            });
        });

        socket.on('disconnect', () => {
            // Remove user
            ChatUser.remove({ socketId: socket.id }).then(() => {
                io.emit('refreshUserList');
            }).catch((error) => {
                socket.emit('error', 'Disconnecting chat failed!');
            });
        });

        socket.on('saveMessage', (message) => {
            // Save messages
            let messageObj = new ChatMessage(message);

            ChatMessage.create(messageObj)
                .catch((error) => {
                    socket.emit('error', 'Creating message failed!');
                });
        });

        socket.on('sendMessagesToRooms', (data) => {
            console.log('sendMessagesToRooms', data);
            // Send messages
            ChatMessage.find({
                    $or: [{
                            'from.userId': data.from.userId,
                            'to.userId': data.to.userId
                        }, {
                            'from.userId': data.to.userId,
                            'to.userId': data.from.userId
                    }]
                })
                .limit(5)
                .sort({ createdAt: -1 })
                .exec((error, messages) => {
                    if (error) {
                        return socket.emit('error', 'Finding message failed!');
                    }
                    io.in(data.from.userId).emit('getMessages', messages);
                    io.in(data.to.userId).emit('getMessages', messages);
                });
        });

        socket.on('sendMessagesToRoom', (data) => {
            console.log('sendMessagesToRoom', data);
            // Send messages
            ChatMessage.find({
                    $or: [{
                        'from.userId': data.from.userId,
                        'to.userId': data.to.userId
                    }, {
                        'from.userId': data.to.userId,
                        'to.userId': data.from.userId
                    }]
                })
                .limit(5)
                .sort({ createdAt: -1 })
                .exec((error, messages) => {
                    console.log(error, messages, data.from.userId);
                    if (error) {
                        return socket.emit('error', 'Finding message failed!');
                    }
                    io.in(data.from.userId).emit('getMessages', messages);
                });
        });

        socket.on('sendUserList', () => {
            // Update userList
            ChatUser.find({}).then((users) => {
                io.emit('getUserList', users);
            }).catch((error) => {
                socket.emit('error', 'Finding users failed!');
            });
        });

        io.emit('refreshUserList');
    });
};
