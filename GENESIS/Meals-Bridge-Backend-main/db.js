const mongoose = require('mongoose');
const dotenv=require("dotenv")
dotenv.config();
const mongoURI = process.env.MongoURI; // Replace 'my-database' with your actual database name

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB successfully i am inside mongodb");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }
};

module.exports = connectToMongo;




