const mongoose = require('mongoose');

const userschema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'name is required']
    },
    email: { 
        type:  String ,
        required: [true, 'email is required']
    },
    password: {
        type: String,
        required: [true, 'password is required']
    },
    isDoctor: {
        type: Boolean,
        default: [],
    },
    notification: {
        type: Array,
        default:[],
    },
    seenotification: {
        type: Array,
        default :[],
    },
});

const userModel = mongoose.model('user', userschema);

module.exports = userModel;
