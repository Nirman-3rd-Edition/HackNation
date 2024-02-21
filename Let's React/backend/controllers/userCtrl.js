const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const doctorModel = require("../models/doctorsmodel");

const registerController = async (req, res) => {
  try {
    const existingUser = await userModel.findOne({ email: req.body.email });
    if (existingUser) {
      return res
        .status(200)
        .send({ message: "User Already Exist", success: false });
    }
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;
    const newUser = new userModel(req.body);
    await newUser.save();
    res.status(201).json({ message: "Registration Successful", success: true });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({
        success: false,
        message: `Register Controller ${error.message}`,
      });
  }
};

const loginController = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).send({ auth: false, message: "User not found" });
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res.status(401).send({ auth: false, message: "Invalid Password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.status(200).send({ auth: true, token: token });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ auth: false, message: `Login Controller ${error.message}` });
  }
};

const applyDoctorController = async (req, res) => {
  try {
    const newDoctor = new doctorModel({ ...req.body, status: "pending" });
    await newDoctor.save();
    const adminUser = await userModel.findOne({ isAdmin: true });
    const notification = adminUser.notification;
    notification.push({
      type: "apply-doctor-request",
      message: `${newDoctor.firstName} ${newDoctor.lastName} applied to be a doctor`,
      data: {
        doctorId: newDoctor._id,
        name: newDoctor.firstName + " " + newDoctor.lastName,
        speciality: newDoctor.specialty,
        onClickPath: "./admin/doctors",
      },
    });
    await userModel.findByIdAndUpdate(adminUser._id, { notification });
    res
      .status(201)
      .send({
        success: true,
        message: "Doctor application submitted successfully",
      });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, error, message: "Failed to apply as a doctor" });
  }
};

const getAllDoctorsController = async (req, res) => {
  try {
    const doctors = await doctorModel.find();
    res.status(200).json(doctors);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Server Error",
    });
  }
};
const acceptRejectDoctorApplication = async (req, res) => {
  const { id, action } = req.params;
  // console.log('action===',action);
  let updateData = { status: "rejected" };
  if (action === "accept") {
    updateData = { ...updateData, status: "approved", verified: true };
  }
  try {
    const result = await doctorModel.findByIdAndUpdate(id, updateData);
    if (!result) {
      return res.status(404).json({
        success: false,
        message: `No Doctor
                with the id ${id}`,
      });
    } else {
      return res.status(200).json({ success: true, data: result });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      err,
    });
  }
};

const bookAppointmentController = async (req, res) => {
  try {
    const { doctorId, userId, appointmentDate } = req.body;

    // Check if the doctor exists
    const doctor = await doctorModel.findById(doctorId);
    if (!doctor) {
      return res
        .status(404)
        .json({ success: false, message: "Doctor not found" });
    }

    // Check if the user exists
    const user = await userModel.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Create a new appointment
    const appointment = {
      doctor: doctorId,
      user: userId,
      appointmentDate: appointmentDate,
    };

    
    user.appointments.push(appointment);
    await user.save();

    // Add the appointment to the doctor's appointments
    doctor.appointments.push(appointment);
    await doctor.save();

    res
      .status(201)
      .json({
        success: true,
        message: "Appointment booked successfully",
        appointment,
      });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to book appointment",
        error: error.message,
      });
  }
};

const authController = async (req, res) => {
  try {
      // Extract the token from the request headers
      const token = req.headers.authorization.split(' ')[1];

      // Verify the token
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

      // Optionally, you can use the decoded token to fetch user data from the database or perform additional tasks

      // Respond with success and user data if needed
      res.status(200).json({
          success: true,
          message: 'Authentication successful',
          decodedToken // Optionally, send decoded token back to the client
      });
  } catch (error) {
      // If token verification fails, respond with an error
      console.error('Authentication error:', error);
      res.status(401).json({
          success: false,
          message: 'Authentication failed'
      });
  }
};

module.exports = {
  registerController,
  loginController,
  applyDoctorController,
  getAllDoctorsController,
  acceptRejectDoctorApplication,
  bookAppointmentController,
  authController
};
