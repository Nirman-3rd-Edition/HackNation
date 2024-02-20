const express = require("express");
const {
  doctorInfoController,
  updateProfileController,
  doctorByIdController,
  doctorAppointmentsController,
  updateStatusController,
} = require("../controllers/doctorCtrl");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/doctorInfo", authMiddleware, doctorInfoController);
router.post("/updateProfile", authMiddleware, updateProfileController);
router.post("/doctorById", authMiddleware, doctorByIdController);

router.get(
  "/doctor-appointments",
  authMiddleware,
  doctorAppointmentsController
);

//POST Update Status
router.post("/update-status", authMiddleware, updateStatusController);

module.exports = router;
