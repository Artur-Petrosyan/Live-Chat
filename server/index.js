import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import authRoutes from "./routes/auth.routes.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());


const server = http.createServer(app);
const io = new Server(server, {
		cors: {
				origin: "http://localhost:3000",
				methods: ["GET", "POST"]
		}
});

io.on("connection", (socket) => {
		console.log("✅ Новый пользователь подключён");

		socket.on("chat message", (msg) => {
				io.emit("chat message", msg);
		});

		socket.on("disconnect", () => {
				console.log("❌ Пользователь отключён");
		});
});

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/live-chat";

const startServer = async () => {
		try {
				await mongoose.connect(MONGO_URI);
				console.log("✅ MongoDB подключена");

				server.listen(3001, () => {
						console.log("⚡ WebSocket + API сервер работает на http://localhost:3001");
				});
		} catch (err) {
				console.error("❌ Ошибка подключения к MongoDB:", err);
		}
};

startServer();

app.use("/api", authRoutes);