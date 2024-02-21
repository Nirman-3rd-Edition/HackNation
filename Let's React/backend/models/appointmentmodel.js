const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'doctormodel', 
        required: true
    },
    patientName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'pending'
    }
}, { timestamps: true });

const appointmentModel = mongoose.model('Appointment', appointmentSchema);

module.exports = appointmentModel;
