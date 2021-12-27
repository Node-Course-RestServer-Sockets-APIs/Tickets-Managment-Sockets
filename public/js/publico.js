const socket = io();

socket.on("actual-state", (lastFour = payload) => {
	let i = 1;

	const audio = new Audio("./audio/new-ticket.mp3");
	audio.play();
	// const lastFour = payload;
	lastFour.forEach((ticket) => {
		lblTicket = document.querySelector(`#lblTicket${i}`);
		lblTicket.innerText = `Ticket ${ticket.number}`;
		lblEscritorio = document.querySelector(`#lblEscritorio${i++}`);
		lblEscritorio.innerText = `Escritorio ${ticket.desk}`;
	});
});
