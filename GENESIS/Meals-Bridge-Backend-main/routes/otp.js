const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const Otp = require("../models/Otp");
const textflow = require("textflow.js");
textflow.useKey(
  "MKKoaARcA4lj5YJeuoFNg7dqFT2M0RWrdqqR5DCzBRUpEB9da6Us16CpIotYnT70"
);
const { v4: uuidv4 } = require("uuid");
const Profile = require("../models/Profile");
// Route 1: post request for otp verification using: post "http://localhost:3000/api/otp/verifyotp". login required

router.post(
  "/verifyotp",
  [
    body("phone", "Enter a valid phone number").isLength({ min: 10 }),
    body("otp", "Enter a valid otp").isLength({ min: 4 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      console.log("entered verifyotp")
      const { phone } = req.body;
      const verifyotp = await Otp.find({ phone: phone });
      console.log(verifyotp);
      console.log(verifyotp[0].otp)


      if (!verifyotp) {
        return res.status(404).send("otp has been expired");
      }


      const otps = verifyotp[0].otp;
      // console.log(req.body.otp);

      if (otps === req.body.otp) {
        
        const shortUuid = `GN${uuidv4()}`;
        const oid = shortUuid.substr(0, 10);
        console.log(phone);
        const profile = await Profile.find({ phone: phone});
        console.log(profile);
        if(profile!=null && profile.length>0)
        {
          const otpSave = await Otp.findOneAndDelete({ phone: phone });
          res.json({ message: "otp verified", profile });
        }
        else{
          const otpSave = await Otp.findOneAndDelete({ phone: phone });
          res.json({ message: "otp verified", uid: oid});
        }
        
      }
      
      
      else {
        console.log("otp not verified");
        return res.status(404).send("otp not verified");
      }
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

// Route 2 for sending otp  and storing it along with number using: post "http://localhost:3000/api/otp/sendotp". login required
router.post(
  "/sendotp",
  [body("phone", "Enter a valid phone number").isLength({ min: 10 })],
  async (req, res) => {
    try {
      // Extract phone number from request body

      const { phone } = req.body;
      console.log(phone);
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // Generate OTP
      const otp = Math.floor(100000 + Math.random() * 900000);


      textflow.sendSMS(phone, `your otp is ${otp}`, (result) => {
        if (result) {
          console.log(result);
        }
      });
      // Create new OTP document and save it to the database
      const newOtp = new Otp({
        phone,
        otp,
      });
      const otpSave = await newOtp.save();

      // Respond with the saved OTP document
      res.json("otp sent successfully");
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

module.exports = router;
