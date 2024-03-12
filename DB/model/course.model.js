const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({

    courseName:{

        type:String,
        required:true
    },
    Description:{

        type:String,
        required:true,
    },
    maximum:{

        type:Number,
        required:true
    },
    price:{

        type:Number,
        required:true

    },
    location:{

        type:String,
        required:true

    },
    present :{
        type:String,
        enum:['entirely','remotely'],
        default:'remotely',
        required:true

    },    
    teacher: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'teacher', 
    },
    admin: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admin', 
    },
    isApproved: { // New field to indicate admin approval
        type: Boolean,
        default: false,
        required: true
    }
  

},{timestamps:true});

    const courseModel = mongoose.model('course',courseSchema);
    module.exports={courseModel};