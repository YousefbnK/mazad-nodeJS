const auction = require("express");
const app = auction();
const server = require("http").createServer(app);
const io = require("socket.io").listen(server);
const port = 8000;

const currentBid = [];

io.on("connection", socket => {
  console.log("USER is connected");
  socket.on("Bid", bid => {
    currentBid.push(bid);
    console.log(bid);
    io.emit("Bid", bid);
  });
});

server.listen(port, () => console.log("Server running on Port: " + port));
