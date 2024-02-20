const mongoose = require('mongoose');
const { Schema } = mongoose;

const RoleSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  role_name: {
    type: String,
    required: true
  },
  access: {
    type: [String], // Change the type to an array of strings
    required: true,
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Role', RoleSchema);
