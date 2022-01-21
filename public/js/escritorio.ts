import * as io from "socket.io";
import { Ticket } from "../../models/ticket-control";

const searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has("escritorio")) {
	window.location.href = "index.html";
	throw new Error("Must have escritorio param.");
}

const lblTitle = document.querySelector("h1")!;
const smllText = document.querySelector("small")!;
const btnAttendTicket = document.querySelector("button")!;

const divAlert = document.querySelector(".alert")!;
const lblPendientes = document.querySelector("#lblPendientes")!;

const socket = new io.Server();

divAlert.style.display = "none";
const desk = searchParams.get("escritorio")!;

socket.on("connect", () => {
	btnAttendTicket.disabled = false;
	lblTitle.innerText = desk;
});

socket.on("disconnect", () => {
	btnAttendTicket.disabled = true;
});

btnAttendTicket.addEventListener("click", () => {
	socket.emit(
		"attend-ticket",
		{ desk },
		(callback: { attendedTicket?: Ticket; msg?: string }) => {
			if (!callback.attendedTicket) {
				smllText.innerText = `Nadie.`;
				return (divAlert.style.display = "");
			}
			smllText.innerText = `Ticket ${callback.attendedTicket.number}`;
		}
	);
});

socket.on("awaiting-tickets", (remainingTickets) => {
	lblPendientes.innerText = remainingTickets;
});
