const mongoose = require("mongoose");

const casedetailSchema = new mongoose.Schema(
  {
    lspid: String,
    userid: String,
    title: {
      type: String,
      default: "text",
    },
    desc: {
      type: String,
      default: "desc",
    },

    accept: {
      type: Boolean,
      default: false,
    },
    payment: {
      type: Boolean,
      default: false,
    },
    appointmentdate: String,
  },
  { timestamps: true }
);

const Casedetail = mongoose.model("Casedetail", casedetailSchema);

module.exports = Casedetail;
