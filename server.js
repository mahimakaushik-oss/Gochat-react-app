const http = require("http");
const express = require("express");

const app = express()
const server = http.createServer(app)
const io = socket.io(server)

const PORT = process.env.PORT || 5000

server.listen(PORT, () => console.log(`Server is Connected to port ${PORT}`))

io.on("connection", (socket) =>{
    console.log('A connection has been made')
    socket.on('disconnect', () => {
        console.log("A disconnection has been made")
    })
})