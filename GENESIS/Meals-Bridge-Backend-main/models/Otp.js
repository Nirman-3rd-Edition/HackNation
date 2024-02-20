const mongoose = require('mongoose');
const { Schema } = mongoose;
const OtpSchema = new Schema({
    phone: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 100 
    }
});

module.exports = mongoose.model('Otp', OtpSchema); // Export the model