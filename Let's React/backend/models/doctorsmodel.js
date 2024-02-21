const mongoose = require('mongoose')

const doctorSchema = new mongoose.Schema({
    useId:{
        type:String,
    },
    
    firstName:{
        type:String,
        required:[true,'first name is required']
    },
    lastName:{
        type:String,
        required:[true,'last name is required']
    },
    phone:{
        type:String,
        required:[true,'phone number is required']
    },
    email:{
        type:String,
        required:[true,'email is required']
    },
    website:{
        type:String,
    },
    specialization:{
        type:String,
        required:[true,"Specialty field can't be empty"]
    },
    address:{
        type:String,
        required:[true,'email is required']
    },
    experience:{
        type:String,
        required:[true,'experience is required']
    },
    feesperconsultation:{
        type:Number,
        required:[true,'fees is required']
    },
    status:{
        type:String,
        default:'pending'
    },
    timimgs:{
        type:Object,
        required:[true,'timimgs is required']
    }
    },
    {timestamps: true}
    );
    const doctorModel = mongoose.model('doctors', doctorSchema);
    module.exports=doctorModel;