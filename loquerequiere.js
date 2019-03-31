const Server = require('socket.io');
const PORTIO  = 3030;
const server = require('http').Server();
server.listen(PORTIO);
const io = Server(server);
io.on('connection',function(so){
    so.on('maria', (datos)=>{
        so.broadcast.emit('maria', datos);
    })
    so.on('juan',function (datos) {
        console.log(datos)
        so.broadcast.emit('juan', datos);
    })
    so.on('callbackmaria',(callback)=>{
        so.broadcast.emit('callbackmaria', callback);
    })
    so.on('callbackjuan',(callback)=>{
        so.broadcast.emit('callbackjuan', callback);
    })
})
