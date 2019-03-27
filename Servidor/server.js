var express = require('express')
var aplicacion = express()

const fs = require('fs')
const net = require('net')
const server = require('http').Server(aplicacion)
const socket = require('socket.io')(server)
const os = require('os')

var HOST = 'redespolitecnica5.ddns.net'
var PORT =  7000

var ser = net.createServer(function(so){
    //console.log(so)
    console.log('Usuario nuevo '+ so.remoteAddress+ ' : ' + so.remotePort )

    so.on('data', function(data){
        console.log(Buffer.from(data, 'hex').toString('utf8'));
        so.write('BBCITA');
    })

    so.on('close', function(){
        console.log('usuario desconectado')
    })

})

ser.listen(PORT, HOST);

console.log('Conectado a : ' + HOST + ' : ' + PORT);
