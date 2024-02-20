const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    firstName: {
      type: String,
      required: [true, "first name is required"],
    },
    lastName: {
      type: String,
      required: [true, "last name is required"],
    },
    phone: {
      type: String,
      required: [true, "phone no is required"],
    },
    email: {
        type: String,
        required: [true, "email is required."],
    },
    specialization: {
        type: String,
        required: [true, "specialization required."]
    },
    address: {
        type: String,
        required: [true,"address to be added"]
    },
    website: {
        type: String,
    },
    feesPerCunsaltation: {
        type: Number,
        required: [true, "fee is required"],
    },
    status: {
        type: String,
        default: "pending",
    },
    timings: {
        type: Object,
        required: [true, "wrok timing is required"],
    },
  },
    { timestamps: true }
  );
  
  const doctorModel = mongoose.model("doctors", doctorSchema);
  module.exports = doctorModel;
  
