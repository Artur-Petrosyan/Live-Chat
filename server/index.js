const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
		cors: {
				origin: "http://localhost:3000",
				methods: ["GET", "POST"],
		}
});

io.on('connection', (socket) => {
		console.log('✅ new user connected');

		socket.on('chat message', (msg) => {
				io.emit('chat message', msg);
		});

		socket.on('disconnect', () => {
				console.log('❌ user disconnected');
		});
});

server.listen(3001, () => {
		console.log("WebSocket server worked on http://localhost:3001");
});