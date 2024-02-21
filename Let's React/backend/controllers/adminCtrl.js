const userModel = require('../models/userModel'); 
const doctorModel = require('../models/doctorsmodel');

const getAllUsersController = async (req, res) => {
    try {
        const users = await userModel.find();
        res.status(200).send({
            success: true,
            message : "Get all users successfully",
            data:users,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({success: false, message: 'Internal Server Error', error, });
    }
};

const getAllDoctorsController = async (req, res) => {
    try {
        const doctors = await doctorModel.find();
        res.status(200).send({
            success:true,
            message:"Get all doctors successfully.",
            data:doctors,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({success: false, message: 'Internal Server Error',error, });
    }
};

module.exports = { getAllDoctorsController, getAllUsersController };
