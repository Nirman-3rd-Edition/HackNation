const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProfileSchema = new Schema({
  uid:{
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  role:{
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  
  },
  location: {
    type: [String],
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Profile", ProfileSchema);
