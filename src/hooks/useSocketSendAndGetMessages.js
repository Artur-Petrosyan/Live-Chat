import { useEffect, useState } from "react";
import { customSocket } from "../configs/socketConfig";

export const useSocketSendAndGetMessages = () => {
		const [messages, setMessages] = useState([]);

		useEffect(() => {
				customSocket.on("chat message", (msg) => {
						setMessages((prev) => [...prev, msg]);
				});

				return () => customSocket.off("chat message");
		}, []);

		const sendMessage = (msg) => {
				customSocket.emit("chat message", msg);
		};

		return {messages, sendMessage};
};