const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const cors = require('cors')

const PORT = process.env.PORT || 5000

const router = require('./router')

const app = express()
const server = http.createServer(app)
const io = socketio(server) // original


app.use(router)
app.use(cors())


// all socket stuff goes in here
io.on('connection', (socket) =>{
    console.log("We have a new connection!!!");

    socket.on('join', ({ name, room }, callback) =>{
        console.log(socket.id, name, room);
    })
})



server.listen(PORT, () => console.log(`Server has started on ${PORT}`))
