// server.js
const express = require('express');
const app = express();
const port = 8000
const server = app.listen(port, () =>
    console.log(`Established a Death Star connection on port: ${port}`)
);

// To initialize the socket, we need to
// invoke the socket.io library
// and pass it our Express server
const io = require('socket.io')(server, { cors: true });

io.on("connection", socket => {
    console.log(socket.id)
    socket.on("chat", (client_input) => {
        console.log("got a message", client_input)
        io.emit("post chat", client_input)
    })
})