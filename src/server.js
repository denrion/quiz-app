const colors = require('colors');
const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config();

const app = require('./app');

// connectMongoDB();

const server = app.listen(process.env.PORT, () =>
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
