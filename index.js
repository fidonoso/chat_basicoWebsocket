//npm i express socket.io
const express = require('express');
const path=require('path')
const app = express();

//setting up express
app.set('port', process.env.PORT || 3000)

//start the server
const server=app.listen(app.get('port'), ()=>{
    console.log('Escuchando en el puerto', app.get('port'))
});

//websockets
const SocketIO = require('socket.io');
const io=SocketIO(server)

io.on('connection',(socket)=>{
    console.log('new connction', socket.id)

    socket.on('chat:message', (data)=>{
        io.sockets.emit('chat:message', data)
    });

    socket.on('chat:typing', (data)=>{
        socket.broadcast.emit('chat:typing', data)
    })
})



//static files

app.use(express.static(path.join(__dirname, 'public')))


