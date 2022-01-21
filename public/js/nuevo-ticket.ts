import { Server } from "socket.io";
import { Ticket } from "../../models/ticket-control";

const lblNuevoTicket = document.querySelector(
	"#lblNuevoTicket"
)! as HTMLElement;
const btnGenerarNuevoTicket = document.querySelector(
	"button"
)! as HTMLButtonElement;

const socket = new Server();

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
	socket.emit("next-ticket", null, (ticketNumber: string) => {
		lblNuevoTicket.innerText = ticketNumber;
	});
});
