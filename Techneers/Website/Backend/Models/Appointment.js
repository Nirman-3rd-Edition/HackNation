const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    userfirstname: String,
    userlastname: String,
    userphoneno: String,
    lspfirstname: String,
    lsplastname: String,
    lspphoneno: String,
    caseid: String,
    token: String,
    accept: {
      type: Boolean,
      default: false,
    },
    appointmentdate: String,
  },
  { timestamps: true }
);

const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = Appointment;
