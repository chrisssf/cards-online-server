const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const cors = require('cors')

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users.js')
const { fetchDecks } = require('./HighCardGame.js')

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
    // console.log("We have a new connection!!!", io.sockets.adapter.rooms);

    socket.on('join', ({ name, room }, callback) => {
        console.log(socket.id, name, room);
        const { error, user } = addUser({ id: socket.id, name, room }) 
        if(error) return callback(error)

        socket.join(user.room)
        io.to(user.room).emit("players", { room: user.room, users: getUsersInRoom(user.room)})

        // testing stuff doesnt really work
        // const roomNumber = io.sockets.adapter.rooms['woof'];
        // const srvSockets = io.sockets.sockets;
        // console.log(srvSockets);
        // console.log("all sockets", Object.keys(srvSockets).length + "this room = " + roomNumber)


        callback()
    })

    socket.on('disconnect', () => {
        console.log("User has left!!!");
        const user = removeUser(socket.id)
        // console.log("user", user);
        if(user) {
            io.to(user.room).emit("players", { room: user.room, users: getUsersInRoom(user.room)})
        }
    })

    socket.on('start-game', ({players, deck }, callback) => {
        io.in(players[0].room).emit("update-card-pot", {updatedCardPot: []})
        console.log(players);
        // console.log(fetchDecks())
        // HERE!!!!!!
        // const user = getUser(socket.id)
        
        // io.to(user.room).emit('message', { user: user.name, text: message })
        callback()
    })

    socket.on("player-hand", ({ playerId, hand }, callback) => {
        io.to(playerId).emit("hand", { hand: hand })
    })

    socket.on("play-card", ({ card, cardPot }, callback) => {
        cardPot.push(card)
        let user = getUser(socket.id)
        io.in(user.room).emit("update-card-pot", {updatedCardPot: cardPot})
        callback()
    })
})



server.listen(PORT, () => console.log(`Server has started on ${PORT}`))
