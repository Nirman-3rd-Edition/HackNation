const express = require("express");

const {
  usersController,
  doctorsController,
  changeAccountStatusController,
} = require("../controllers/adminCtrl");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/allUsers", authMiddleware, usersController);

router.get("/allDoctors", authMiddleware, doctorsController);

router.post(
  "/changeAccountStatus", authMiddleware, changeAccountStatusController
);

module.exports = router;
