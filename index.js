const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const server = require("http").Server(app);
const io = require("socket.io")(server);
const { v4: uuidv4 } = require("uuid");
const { ExpressPeerServer } = require("peer");
const peerServer = ExpressPeerServer(server, {
  debug: true,
});
// Import Routers
const authRoute = require("./routers/auth");
const postRoute = require("./routers/posts");
const videoRoute = require("./routers/room");
dotenv.config();
//Connect to Db
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () => {
  console.log("connected to db");
});

// Middleware
app.use(express.json());
app.use("/peerjs", peerServer);
//Route Middlewares
app.use("/api/user", authRoute);
app.use("/api/posts", postRoute);
app.use("/api/video", videoRoute);

io.on("connection", (socket) => {
  socket.on("join-room", (roomId, userId) => {
    socket.join(roomId);
    socket.to(roomId).broadcast.emit("user-connected", userId);

    socket.on("message", (message) => {
      io.to(roomId).emit("createMessage", message);
    });

    socket.on("disconnect", () => {
      socket.to(roomId).broadcast.emit("user-disconnected", userId);
    });
  });
});

app.listen(9899, () => console.log("Server up and running"));
