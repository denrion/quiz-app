module.exports = (socket) => {
  // Test socket connection
  socket.emit('FromAPI', 'Hello From Server');

  // Listen for activeQuestion and send it to all clients
  socket.on('activeQuestion', (question) => {
    socket.broadcast.emit('activeQuestion', question);
  });
};
