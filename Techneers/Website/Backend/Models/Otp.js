const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
  email: String,
  otp: String,
  otpExpiration: Date,
});

const Otp = mongoose.model("Otp", otpSchema);

module.exports = Otp;
