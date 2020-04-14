const auction = require("express");

const path = require("path");

// Initialize express app
const app = auction();
const router = auction.Router();

// Serve static pages
app.use(auction.static("./"));

// Add API Routes
app.use("/api", router);

// Specify public page entry point
app.get("/", function (req, res) {
  res.sendFile(path.join("/index.html"));
});

// Specify port
const port = 8000;

//Socket.io Server
const server = require("http").createServer(app);
const io = require("socket.io").listen(server);

const currentBid = [];

io.on("connection", (socket) => {
  console.log("USER is connected");
  socket.on("Bid", (bid) => {
    currentBid.push(bid);
    console.log(bid);
    io.emit("Bid", bid);
  });
});

server.listen(port, () => console.log("Server running on Port: " + port));
