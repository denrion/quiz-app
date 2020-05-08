module.exports = (socket) => {
  // Test socket connection
  socket.emit('FromAPI', 'Hello From Server');

  // Listen for activeQuestion and send it to all clients
  socket.on('showQuestionToPlayer', (question) => {
    socket.broadcast.emit('showQuestionToPlayer', question);
  });

  // Listen for chosenAnswer
  socket.on('sendAnswerToQuizmaster', (answer) => {
    socket.broadcast.emit('sendAnswerToQuizmaster', answer);
  });
};
