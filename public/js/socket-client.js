const online = document.querySelector("#status-text-online");
const offline = document.querySelector("#status-text-offline");

const message = document.querySelector("#text__message");
const button = document.querySelector("#button__send");

const socket = io();

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
	socket.emit("send-message", payload, (msg) => {
		console.log(msg);
	});
});
