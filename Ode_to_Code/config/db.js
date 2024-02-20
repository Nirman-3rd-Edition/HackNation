const mongoose = require("mongoose");
const colors = require("colors");

colors.config
const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://pmec:odetocode@cluster0.arxetne.mongodb.net/?retryWrites=true&w=majority");
    console.log(`Mongodb connected ${mongoose.connection.host}`.bgGreen.white);
  } catch (error) {
    console.log(`Mongodb Server Issue ${error}`.bgRed.white);
  }
};

module.exports = connectDB;
