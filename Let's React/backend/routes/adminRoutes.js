const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();
const userModel = require('../models/userModel');
const doctorModel = require('../models/doctorsmodel');
const { getAllUsersController, getAllDoctorsController } = require('../controllers/adminCtrl');
 
router.get('./getAllUsers', authMiddleware,getAllUsersController)

router.get('./getAllDoctors', authMiddleware,getAllDoctorsController)
// Middleware to check if the user is an admin
const isAdmin = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.userId);
        if (!user || !user.isAdmin) {
            return res.status(403).send({ message: 'Unauthorized' });
        }
        next();
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
};

// Route to get all doctors (accessible only to admin)
router.get('/doctors', isAdmin, async (req, res) => {
    try {
        const doctors = await doctorModel.find();
        res.status(200).json(doctors);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
});

// Route to delete a doctor by ID (accessible only to admin)
router.delete('/doctors/:id', isAdmin, async (req, res) => {
    try {
        const deletedDoctor = await doctorModel.findByIdAndDelete(req.params.id);
        if (!deletedDoctor) {
            return res.status(404).send({ message: 'Doctor not found' });
        }
        res.status(200).json(deletedDoctor);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
});

// Add more routes as needed

module.exports = router;
