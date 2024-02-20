const mongoose = require('mongoose');
const colors = require('colors');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected ${mongoose.connection.host}`.bgGreen.white);
  } catch (error) {
    console.log(`MongoDB Server Issue ${error}`.bgRed.white);
  }
};

module.exports = connectDB;
