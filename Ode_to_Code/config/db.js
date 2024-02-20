const mongoose = require('mongoose');
const colours = require('colours')

colours.enable()
const connectDB = async () => {
  db = mongoose.connections()
  await mongoose.connect("mongodb://127.0.0.1:27017")
    .then(db.once('open', () => { console.log(`Mongodb connected ${mongoose.connection.host}`.bgGreen.white) }))
  db.on('error', (error) => {
    console.log(`Mongodb Server Issue ${error}`.bgRed.white);
  })

};

module.exports = connectDB;
