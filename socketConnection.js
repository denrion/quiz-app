module.exports = (socket) => {
  console.log('New WS Connection');

  socket.emit('FromAPI', 'Hello From Server');
};
