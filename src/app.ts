import express from 'express';
import socketio from 'socket.io';
import http from 'http';
import "reflect-metadata";

var port = process.env.PORT==undefined ? 3000 : process.env.PORT;
const app = express();
const httpServer = new http.Server(app);
const io = socketio(httpServer);

var password = 'love'

app.get('/', (req, res)=>{
    res.send('hello world');
});

io.on('connection', socket => {
    console.log('user connected!')    
    socket.on('buttonPress', (message: any) => {
        if (message.password != password){ return; }
        io.emit('message', message);
    });
});

httpServer.listen(port, () => {
    console.log(`listening on port ${port}`);
});