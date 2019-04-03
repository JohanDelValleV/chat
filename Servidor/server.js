"use strict";
const express = require('express');
const app = express();
const http = require('http');
const httpServer = http.Server(app);
const io = require('socket.io')(httpServer);
const SocketIOFile = require('socket.io-file');
const cors = require('cors');

app.use(cors());

io.origins('*:*')

app.use('/data', express.static('data'));

io.on('connection', (socket) => {
	console.log('Socket connected.');
	socket.on('maria', (datos)=>{
        socket.broadcast.emit('maria', datos);
    });
    socket.on('juan',function (datos) {
        console.log(datos)
        socket.broadcast.emit('juan', datos);
    });
    socket.on('callbackmaria',(callback)=>{
        socket.broadcast.emit('callbackmaria', callback);
    });
    socket.on('callbackjuan',(callback)=>{
        socket.broadcast.emit('callbackjuan', callback);
	});
	socket.on('typing:maria', ()=>{
		socket.broadcast.emit('typing:maria');
	});
	socket.on('typing:juan', ()=>{
		socket.broadcast.emit('typing:juan');
	});
	
	var uploader = new SocketIOFile(socket, {
		uploadDir: 'data',							// simple directory
		// accepts: ['audio/mpeg', 'audio/mp3'],		// chrome and some of browsers checking mp3 as 'audio/mp3', not 'audio/mpeg'
		// maxFileSize: 4194304, 						// 4 MB. default is undefined(no limit)
		chunkSize: 10240,							// default is 10240(1KB)
		transmissionDelay: 0,						// delay of each transmission, higher value saves more cpu resources, lower upload speed. default is 0(no delay)
		overwrite: false, 							// overwrite file if exists, default is true.
	});
	uploader.on('start', (fileInfo) => {
		console.log('Start uploading');
		console.log(fileInfo);
	});
	uploader.on('stream', (fileInfo) => {
		console.log(`${fileInfo.wrote} / ${fileInfo.size} byte(s)`);
	});
	uploader.on('complete', (fileInfo) => {
		console.log('Upload Complete.');
		console.log(fileInfo);
	});
	uploader.on('error', (err) => {
		console.log('Error!', err);
	});
	uploader.on('abort', (fileInfo) => {
		console.log('Aborted: ', fileInfo);
	});
});

httpServer.listen(3030, () => {
	console.log('Server listening on port 3030');
});