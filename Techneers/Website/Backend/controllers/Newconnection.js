const Notification = require("../Models/Notification.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const session = require("express-session");

module.exports.sendnotification = async (req, res, next) => {
  try {
    const { advocateId } = req.params;
    const { senderId, message } = req.body;

    // Store the notification in the database
    const newNotification = new Notification({ advocateId, senderId, message });
    await newNotification.save();

    res.send("Notification sent and stored in the database");
  } catch (error) {
    res.status(500).json({ error: "error" });
  }
};

module.exports.getnotification = async (req, res, next) => {
  try {
    const { advocateId } = req.params;

    // Retrieve all notifications for the advocate from the database, sorted by timestamp in descending order
    const notifications = await Notification.find({ advocateId }).sort({
      createdAt: -1,
    });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ error: "error" });
  }
};
