const path = require("path");
const fs = require("fs");

class Ticket {
	constructor(number, desk) {
		this.number = number;
		this.desk = desk;
	}
}

class TicketControl {
	constructor() {
		this.last = 0;
		this.today = new Date().getDate();
		this.tickets = [];
		this.lastFour = [];

		//Initialize values in the object
		this.init();
	}

	get toJson() {
		return {
			last: this.last,
			today: this.today,
			tickets: this.tickets,
			lastFour: this.lastFour,
		};
	}

	init() {
		const { today, last, tickets, lastFour } = require("../database/data.json");
		if (today == this.today) {
			this.last = last;
			this.tickets = tickets;
			this.lastFour = lastFour;
		} else {
			this.saveData();
		}
	}

	saveData() {
		const joinedPath = path.join(__dirname, "../database/data.json");
		fs.writeFileSync(joinedPath, JSON.stringify(this.toJson));
	}

	next() {
		//Update last number of Ticket and create it
		this.last += 1;
		const ticket = new Ticket(this.last, null);

		//Update the arrays of the TicketsController
		this.tickets.push(ticket);

		//Save the changes
		this.saveData();

		return `Ticket ${this.last}`;
	}

	attend(desk) {
		if (this.tickets.length === 0) {
			return null;
		}
		//Extract Ticket from the pool of tickets
		const ticket = this.tickets.shift();
		ticket.desk = desk;
		//Update the array fot the last four
		this.lastFour.unshift(ticket);
		if (this.lastFour.length > 4) this.lastFour.pop();

		this.saveData();
		return ticket;
	}
}

module.exports = TicketControl;
