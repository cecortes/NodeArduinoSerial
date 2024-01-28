/* --> Setup for Express <-- */
const express = require("express");
const app = express();

/* --> Setup for socket.io <-- */
const server = require("http").Server(app);
const io = require("socket.io")(server);

// Listen to port 3000
server.listen(3000, () => {
  console.log("Server listening on port 3000!");
});

// Serve static files when get
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log("New connection", socket.id);
});

/* --> Setup for serialport <-- */
const { SerialPort } = require("serialport");
const { ReadlineParser } = require("@serialport/parser-readline");

// Config for serial port
const port = new SerialPort({
  path: "/dev/cu.usbmodem14201",
  baudRate: 9600,
});

// Config for parser
const parser = port.pipe(new ReadlineParser({ delimiter: "\r\n" }));

/* --> Event listener for serial port <-- */
port.on("error", (err) => {
  console.log("Error: ", err.message);
});

port.on("open", () => {
  console.log("Serial port open!");
});

/* --> Event listener for parser <-- */
parser.on("data", (data) => {
  console.log(data);
  // Send data to client
  io.emit("arduino:data", {
    value: data,
  });
});
