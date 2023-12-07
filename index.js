const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

const app = express();

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:8081"
  }
});

app.get('/', (req, res) => {
  res.send({
    "message": "Hello World",
  })
});

// Listen for socket connections
io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('message', (msg) => {    
    io.emit('message', msg);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

const PORT = 3000
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
