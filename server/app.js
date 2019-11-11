const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const axios = require("axios");

const port = process.env.PORT || 4001;
const index = require("./routes/index");

const app = express();
app.use(index);

const server = http.createServer(app);
const io = socketIo(server);

let config = require("./config/config");

const getComment = async socket => {
  axios
    .get(`${config.BASE_URL}/conversations.history`, {
      params: {
        token: config.COMMENT_TOKEN_USER,
        channel: config.COMMENT_CHANNEL
      }
    })
    .then(res => {
      socket.emit("Comments", res.data.messages);
    })
    .catch(error => {
      // console.error(`Error: ${error.code}`);
    });
};

let interval;

io.on("connection", socket => {
  console.log("New client connected");
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => getComment(socket), 1000);

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));
