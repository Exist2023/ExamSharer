// server.js
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Modules
const login = require('./server-scripts/login'); // Import the entire login.js module



// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Set up routes for different pages
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/grade', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'grade.html'));
});

app.get('/class', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'class.html'));
});



// Set up a connection event
io.on('connection', (socket) => {
  console.log('A user connected');

  // Handle disconnection events
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });



  // Login Information Check
  socket.on('login', (data) => {
    if (login.check(data.username, data.password) == true) {
      socket.emit('login_confirm');
    }
  })
});



// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
