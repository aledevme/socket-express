var express = require("express");
var app = express();
var server = require("http").Server(app);
var io = require("socket.io")(server);

//cached messages
var messages = [];

app.use(express.static("public"));

io.on("connection", function (socket) {
  
  console.log("Alguien se ha conectado con Sockets");

  //load cached messages
  socket.emit("messages", messages);

  //define event when message is incoming
  socket.on("new-message", function (data) {
    messages.push(data);

    //load again messages
    io.sockets.emit("messages", messages);
  });
});

server.listen(8080, function () {
  console.log("Servidor corriendo en http://localhost:8080");
});