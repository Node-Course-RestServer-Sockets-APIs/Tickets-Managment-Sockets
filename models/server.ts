import express, { Application } from "express";
import cors from "cors";
import socket from "socket.io";
import http from "http";
import { socketController } from "../sockets/controller";

export default class Server {
	app: Application;
	port: string;
	server: http.Server;
	io: socket.Server;

	paths: { [index: string]: string };

	constructor() {
		this.app = express();
		this.port = process.env.PORT || "8080";
		this.server = http.createServer(this.app);

		this.io = new socket.Server(this.server);

		this.paths = {};

		//Middleware
		this.middleware();
		//Routes
		this.routes();
		//Sockets
		this.sockets();
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
