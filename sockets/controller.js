const TicketControl = require("../models/ticket-control");

const ticketControl = new TicketControl();

const socketController = (socket) => {
	socket.emit("last-ticket", ticketControl.last);
	socket.emit("actual-state", ticketControl.lastFour);
	socket.emit("awaiting-tickets", ticketControl.tickets.length);

	socket.on("next-ticket", (payload, callback) => {
		const next = ticketControl.next();
		callback(next);

		//TODO: Notify that a new ticket is waiting
		socket.broadcast.emit("awaiting-tickets", ticketControl.tickets.length);
	});

	socket.on("attend-ticket", (payload, callback) => {
		if (!payload.desk) {
			return callback({
				ok: false,
				msg: "The desk is required.",
			});
		}

		const attendedTicket = ticketControl.attend(payload.desk);

		//Notify changes in the last 4

		socket.broadcast.emit("actual-state", ticketControl.lastFour);

		if (!attendedTicket) {
			return callback({
				ok: false,
				msg: "Unavailable tickets for the moment.",
			});
		} else {
			callback({ ok: true, attendedTicket });
			socket.emit("awaiting-tickets", ticketControl.tickets.length);
			socket.broadcast.emit("awaiting-tickets", ticketControl.tickets.length);
		}
	});
};

module.exports = socketController;
