import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
    },
});

const userSocketMap = {}; // (userId: socketId)

export function getSocketIdByUserId(userId) {
    return userSocketMap[userId];
}

io.on("connection", (socket) => {
    console.log("A user connected", socket.id);

    const { userId } = socket.handshake.query;

    if(userId) {
        userSocketMap[userId] = socket.id;
        console.log("User connected:", userId, socket.id);
    }

    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
        console.log("user disconnected", socket.id);
        for (const [userId, sockId] of Object.entries(userSocketMap)) {
            if (sockId === socket.id) {
                delete userSocketMap[userId];
                break;
            }
        }
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
});

export { io, app, server };
