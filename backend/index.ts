import { createServer } from "http";
import express from "express";
import { Server } from "socket.io";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: "*" } });

io.on("connection", (soc) => {
	console.log("xdd");
	soc.on("message", (message) => {
		console.log(message);
		io.emit("message", `${soc.data.username}: ${message}`);
	});
	soc.on("enter", (username) => {
		console.log(username);
		soc.data.username = username;
		io.emit("enter", `${soc.data.username}: joined the session`);
	});
	soc.on("draw", (data) => {
		console.log("data", data);
	});
});

console.log("Hello via Bun!");
httpServer.listen(3000);
