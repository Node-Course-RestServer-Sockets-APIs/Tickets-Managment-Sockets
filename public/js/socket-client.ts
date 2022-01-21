import { Server } from "socket.io";

const online = document.querySelector("#status-text-online")! as HTMLElement;
const offline = document.querySelector("#status-text-offline")! as HTMLElement;

const message = document.querySelector("#text__message")! as HTMLInputElement;
const button = document.querySelector("#button__send")! as HTMLButtonElement;

const socket = new Server();

socket.on("connect", () => {
	// console.log("Client connected");
	online.style.display = "";
	offline.style.display = "none";
});
socket.on("disconnect", () => {
	// console.log("Client disconnected");
	offline.style.display = "";
	online.style.display = "none";
});

socket.on("send-message", (payload) => {
	console.log(payload);
});

button.addEventListener("click", () => {
	const payload = message.value;
	socket.emit("send-message", payload, (msg: string) => {
		console.log(msg);
	});
});
