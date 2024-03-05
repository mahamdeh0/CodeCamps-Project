const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({

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

    }


},{timestamps:true});

    const teacherModel = mongoose.model('teacher',teacherSchema);
    module.exports={teacherModel};