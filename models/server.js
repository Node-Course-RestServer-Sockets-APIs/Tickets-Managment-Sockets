const express = require("express");
const cors = require("cors");
const socketController = require("../sockets/controller");

class Server {
	constructor() {
		this.app = express();
		this.port = process.env.PORT;
		this.server = require("http").createServer(this.app);

		this.io = require("socket.io")(this.server);

		this.paths = {};

		//Middleware
		this.middleware();
		//Routes
		this.routes();
		//Sockets
		this.sockets();
	}
	async database() {
		await dbConnection();
	}

	middleware() {
		//Cors - Validacion de la url de origen
		this.app.use(cors());

		//Express - servir la pagina
		this.app.use(express.static("public"));
	}

	routes() {
		// this.app.use(this.userPath, require("../routes/user.js"));
	}

	sockets() {
		this.io.on("connection", socketController);
	}

	listen() {
		this.server.listen(this.port, () => {
			console.log("Listening to port:", this.port);
		});
	}
}

module.exports = Server;
