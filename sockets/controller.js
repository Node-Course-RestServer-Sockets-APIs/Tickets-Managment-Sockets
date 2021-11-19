const socketController = (socket) => {
	// console.log("Client on", socket.id);

	socket.on("disconnect", () => {
		// console.log("Clietn out");
	});

	socket.on("send-message", (payload, callback) => {
		socket.broadcast.emit("send-message", payload);
		callback("All okey - From server");
	});
};

module.exports = socketController;
