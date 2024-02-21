const doctorModel = require('../models/doctorsmodel');

const getDoctorByIdController = async (req, res) => {
    try {
        const doctor = await doctorModel.findById(req.params.id);
        if (!doctor) {
            return res.status(404).json({ success: false, message: 'Doctor not found' });
        }
        res.status(200).json({ success: true, data: doctor });
    } catch (error) {
        console.error('Error fetching doctor by ID:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

module.exports = getDoctorByIdController;
