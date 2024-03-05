const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

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

    }


},{timestamps:true});

    const userModel = mongoose.model('user',userSchema);
    module.exports={userModel};