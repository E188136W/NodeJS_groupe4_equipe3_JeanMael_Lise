const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const port = process.env.PORT || 3000;

const bodyParser = require("body-parser");
const database = require("./app/config/dbconfig");

process.on("exit", function(code) {
  return console.log(`About to exit with code ${code}`);
});

database.init.then(db => {
  http.listen(port, function() {
    console.log("Server listening on port : " + port);
  });

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  /* Router configuration */
  const REST_API_ROOT = "/api";
  app.use(REST_API_ROOT, require("./app/routes/router"));

  //acces aux pages statiques
  app.use(express.static(__dirname + "/static"));
});

/**
 * Parie websocket
 */

let users = [];
let messages = [];

let roomMessages = {};

io.on("connection", function(socket) {
  /**
   * Evenement de diffusion des informations du tchat global
   */
  socket.emit("init", users, messages);

  /**
   * Evenement d'arrivée d'un nouvel utilisateur sur le tchat global
   */
  socket.on("new-user-connection", function(data) {
    users.unshift(data);
    socket.broadcast.emit("broadcast-users", users);
  });

  /**
   * Evenement d'envoie de message d'un utilisateur
   */
  socket.on("on-user-input", function(data) {
    messages.unshift(data);
    socket.broadcast.emit("broadcast-messages", messages);
  });

  /**
   * Evenement de connection d'en une room (brasserie)
   */
  socket.on("room-connection", function(room) {
    socket.join(room);
    socket.to(room).emit("init-room");
  });

  /**
   * Evenement d'envoie de message d'en une room (brasserie)
   */
  socket.on("on-room-input", function(room, message) {
    roomMessages[room] = [].unshift(message);
    socket.broadcast
      .to(room)
      .emit("broadcast-room-message", roomMessages[room]);
  });
});
