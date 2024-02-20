const Book = require("../Models/Appointment");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.bookinginfo = async (req, res) => {
  try {
    const {
      userfirstname,
      userlastname,
      userphoneno,
      lspfirstname,
      lsplastname,
      lspphoneno,
      caseid,
      token,
      appointmentdate,
    } = req.body;

    const newUser = new Book({
      userfirstname,
      userlastname,
      userphoneno,
      lspfirstname,
      lsplastname,
      lspphoneno,
      caseid,
      token,
      appointmentdate,
    });
    await newUser.save();

    res.status(201).json({ message: "Booking Success successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to book" });
  }
};

module.exports.bookingdetails = async (req, res) => {
  const { caseid } = req.params;
  try {
    const data = await Book.find({ caseid: caseid }).sort({ createdAt: -1 });
    if (data) {
      res.json(data);
    } else {
      res.status(404).json({ message: "Data not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch" });
  }
};

module.exports.allbookingdetails = async (req, res) => {
  try {
    const data = await Book.find().sort({ createdAt: -1 });
    if (data) {
      res.json(data);
    } else {
      res.status(404).json({ message: "Data not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch" });
  }
};
