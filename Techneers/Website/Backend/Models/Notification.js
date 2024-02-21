const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    advocateId: String,
    senderId: String,
    message: String,
  },
  { timestamps: true }
);

const Notification = mongoose.model("Notification", notificationSchema);

module.exports = Notification;
