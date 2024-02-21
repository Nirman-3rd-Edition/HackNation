const mongoose = require('mongoose');
const { Schema } = mongoose;
const Active_OrderSchema = new Schema({
    uid: {
        type: String,
        required: true,
    },
    oid:{
        type: String,
        required: true,
    },
    reciveruid:{
        type: String,
        default: null
    },
    // location:{
    //     type: String,
    //     required: true
    // },
    status: {
        type: Boolean, // Change the type to an array of strings
        default: false
    },
    date: {
        type: Date,
        default: Date.now
    },
    time:{
        type: String,
        default: new Date().toLocaleTimeString() // it will return current time
    }
});
module.exports = mongoose.model('Order', Active_OrderSchema); // Export the model