const http = require('http')
const socketio = require('socket.io')
const express = require('express')
const app = express();
const path = require('path')
const server = http.createServer(app)
const io = socketio(server)
app.use('/' , express.static(path.join(__dirname , 'public')))
const info = {
    'DEEPESH': 'deepesh123'
}
io.on('connection' , (socket) => {
    console.log('this is the id we had ' + socket.id)
    socket.on('login' , (data) => {
        if(info[data.userName]){
            if(info[data.userName] == data.password){
                socket.join(data.userName)
                socket.emit('logged_in')
            }else{
                socket.emit('login_disabled')
            }
        }else{
            info[data.userName] = data.password
            socket.join(data.userName)
            socket.emit('logged_in')
        }
        console.log(info)
    })
    socket.on('send_msg', (data) => {
        // console.log(data)
        if(data.to){
            io.to(data.to).emit('msg_rcvd' , data)
        }else{
            // console.log(data.to)
            // console.log('must be blank')
            socket.broadcast.emit('msg_rcvd' , data)
        }
        // socket.emit('msg_rcvd' , data)TO SEND ME ITSELF BACK
        // socket.broadcast.emit('msg_rcvd' , data)TO SEND TO EVERYONE ACCEPT ME
        // io.emit('msg_rcvd' , data)TO SEND TO EVERYONE
    })
})
server.listen('4000' , () => {
    console.log('Start the server')
})