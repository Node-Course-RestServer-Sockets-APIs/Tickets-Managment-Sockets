const lblNuevoTicket = document.querySelector("#lblNuevoTicket");
const btnGenerarNuevoTicket = document.querySelector("button");
const socket = io();

socket.on("connect", () => {
	btnGenerarNuevoTicket.disabled = false;
});
socket.on("disconnect", () => {
	btnGenerarNuevoTicket.disabled = true;
});

socket.on("last-ticket", (lastTicket) => {
	lblNuevoTicket.innerText = `Ticket ${lastTicket}`;
});
btnGenerarNuevoTicket.addEventListener("click", () => {
	socket.emit("next-ticket", null, (ticket) => {
		lblNuevoTicket.innerText = ticket;
	});
});
