const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const cors = require('cors')

const PORT = process.env.PORT || 5000

const router = require('./router')

const app = express()
const server = http.createServer(app)
// this creates an instance of the socket.io server we can use...
const io = socketio(server) // original
// const io = socketio(server, corsOptions) // with additional cors options


app.use(router)
app.use(cors())





server.listen(PORT, () => console.log(`Server has started on ${PORT}`))
