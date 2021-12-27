const searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has("escritorio")) {
	window.location = "index.html";
	throw new Error("Must have escritorio param.");
}

const lblTitle = document.querySelector("h1");
const smllText = document.querySelector("small");
const btnAttendTicket = document.querySelector("button");

const divAlert = document.querySelector(".alert");
const lblPendientes = document.querySelector("#lblPendientes");

const socket = io();

divAlert.style.display = "none";
const desk = searchParams.get("escritorio");

socket.on("connect", () => {
	btnAttendTicket.disabled = false;
	lblTitle.innerText = desk;
});

socket.on("disconnect", () => {
	btnAttendTicket.disabled = true;
});

btnAttendTicket.addEventListener("click", () => {
	socket.emit("attend-ticket", { desk }, (callback) => {
		if (!callback.ok) {
			smllText.innerText = `Nadie.`;
			return (divAlert.style.display = "");
		}
		smllText.innerText = `Ticket ${callback.attendedTicket.number}`;
	});
});

socket.on("awaiting-tickets", (remainingTickets = payload) => {
	lblPendientes.innerText = remainingTickets;
});
