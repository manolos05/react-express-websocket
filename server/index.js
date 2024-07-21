import express from 'express'
import http from 'http'
import { Server as SocketServer } from 'socket.io'
import { resolve } from 'path'
import { PORT } from './config.js'

const app = express()
const server = http.createServer(app)
const io = new SocketServer(server)

app.use(express.static(resolve('frontend/dist')))

io.on('connection', socket => {

    socket.on('message', ({ body, from, id }) => {
        socket.broadcast.emit('message', {
            id,
            body,
            from
        })

        socket.on('deletemessage', id => {
            io.emit('deleted', id);
        });

    })


})

server.listen(PORT)
console.log('Server on port', PORT);