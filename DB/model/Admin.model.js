const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({

    userName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    age:{
        type:Number,
    },
    gender:{
        type:String,
        enum:['male','female'],
        default:'male'
    },
    profilePic:{
        type:String
    },
    confirmEmail:{
        type:Boolean,
        default:false
    }

},{timestamps:true});

    const adminModel = mongoose.model('admin',adminSchema);
    module.exports={adminModel};