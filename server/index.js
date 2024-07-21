import express from 'express'
import http from 'http'
import { Server as SocketServer } from 'socket.io'

const app = express()
const server = http.createServer(app)
const io = new SocketServer(server)

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

server.listen(4000)
console.log('Server on port', 4000);