const colors = require('colors');
const mongoose = require('mongoose');

let DB_URI = process.env.MONGO_DB_ATLAS_PROD_URI;

if (process.env.NODE_ENV === 'development')
  DB_URI = process.env.MONGO_DB_ATLAS_DEV_URI;
if (process.env.NODE_ENV === 'testing')
  DB_URI = process.env.MONGO_DB_ATLAS_TEST_URI;

const connectMongoDB = async () => {
  const { connection } = await mongoose.connect(DB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });

  console.log(colors.cyan.bold('MongoDB Connected: %s'), connection.host);
};

module.exports = connectMongoDB;
