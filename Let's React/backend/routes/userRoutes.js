const express = require('express');
const {
    loginController, 
    registerController, 
    authController,
    applyDoctorController,
    bookAppointmentController,
    getAllDoctorsController
} = require('../controllers/userCtrl');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/login', loginController);
router.post('/register', registerController);
router.post('/getUserData', authMiddleware, authController);
router.post('/apply-doctor', authMiddleware, applyDoctorController);
router.get('/getAllDoctors', authMiddleware, getAllDoctorsController);
router.get('/book-appointment', authMiddleware, bookAppointmentController);

module.exports = router;
