const mongoose = require('mongoose');
const { Schema } = mongoose;
const UserSchema = new Schema({
   name: {
        type: String,
        required: true
    },
    userId: {   
        type: String,
        required: true,
        unique: true
     },
    password: {
        type: String,
        required: true
    },
    role:{
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    }
  });
const User = mongoose.model('user', UserSchema);
module.exports = User;

//mongoose.model() is a method provided by Mongoose that's used to define and create a model. A model is a JavaScript class that represents a collection in your MongoDB database. Mongoose models provide several helper methods that facilitate the communication with MongoDB. Some of these methods are: find, findOne, findById, findByIdAndUpdate, findByIdAndRemove, etc.