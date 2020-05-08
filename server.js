const colors = require('colors');
const http = require('http');
const socketIo = require('socket.io');
const dotenv = require('dotenv');

dotenv.config();

if (process.env.NODE_ENV === 'production') {
  process.on('uncaughtException', (err) => {
    console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
    console.log(err.name, err.message);
    process.exit(1);
  });
}

const app = require('./app');
const connectMongoDB = require('./config/connectMongoDB');
const socketConnection = require('./socketConnection');

connectMongoDB();

const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', socketConnection);

server.listen(process.env.PORT, () =>
  console.log(
    colors.yellow.bold('Server is running in %s mode, on port %s'),
    process.env.NODE_ENV,
    process.env.PORT
  )
);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.error(colors.red('Error: %s'), err.message);
  // Close server & exit process
  server.close(() => process.exit(1));
});
