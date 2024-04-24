const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
    mainImage :{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Image'
    },
    teacherName:{
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
    Experience:{
        type:String,
    },
    nationality:{
        type:String,
    },
    achievements:{
        type:String,
    },
    age:{
        type:Number,
    },
    gender:{
        type:String,
        enum:['male','female'],
        default:'male'
    },
    phone:{
        type:String
    },
    confirmEmail:{
        type:Boolean,
        default:false
    },
    sendcode:{
        type: String,
        default:null
    }

},{timestamps:true});

    const teacherModel = mongoose.model('teacher',teacherSchema);
    module.exports={teacherModel};