const mongoose = require('mongoose');

const hospitalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: {
    type: { type: String, default: 'Point' },
    coordinates: { type: [Number], required: true }
  },
  bedCapacity: { type: Number, required: true },
  occupiedBeds: { type: Number, default: 0 },
});
module.exports = mongoose.model('Hospital', hospitalSchema);
