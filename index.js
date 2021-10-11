require('dotenv').config();
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const path = require('path');
const { Server } = require("socket.io");
const io = new Server(server);

const PORT = process.env.PORT || 8080;

// parse request to body-parser
app.use(express.json());

// set view engine
app.set("view engine", "ejs");

// load assets
app.use('/css', express.static(path.resolve(__dirname, "assets/css")));
app.use('/img', express.static(path.resolve(__dirname, "assets/img")));
app.use('/js', express.static(path.resolve(__dirname, "assets/js")));

// load routers
app.use('/', require('./server/routes/routes'));

io.on('connection', socket => {
    socket.join(socket.handshake.headers.referer.split('/room/')[1]);
    socket.on('msg', res => socket.to(res.roomID).emit('msg', { data: res.data }));
});

server.listen(PORT, () => { console.log(`Server is running on http://localhost:${PORT}`) });