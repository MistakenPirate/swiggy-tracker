const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = 3000;

app.use(express.static("public"));

io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    // Receive location from a user
    socket.on("send-location", (data) => {
        console.log(`Location received from ${socket.id}:`, data);
        io.emit("receive-location", { id: socket.id, ...data });
    });

    // Handle disconnection
    socket.on("disconnect", () => {
        console.log(`User disconnected: ${socket.id}`);
        io.emit("user-disconnected", socket.id);
    });
});

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
