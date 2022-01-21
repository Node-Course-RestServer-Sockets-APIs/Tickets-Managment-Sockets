import { Server } from "socket.io";
import { Ticket } from "../../models/ticket-control";

const socket = new Server();

socket.on("actual-state", (lastFour) => {
	let i = 1;

	const audio = new Audio("./audio/new-ticket.mp3");
	audio.play();
	// const lastFour = payload;
	lastFour.forEach((ticket: Ticket) => {
		const lblTicket = document.querySelector(`#lblTicket${i}`)! as HTMLElement;
		lblTicket.innerText = `Ticket ${ticket.number}`;
		const lblEscritorio = document.querySelector(
			`#lblEscritorio${i++}`
		)! as HTMLElement;
		lblEscritorio.innerText = `Escritorio ${ticket.desk}`;
	});
});
