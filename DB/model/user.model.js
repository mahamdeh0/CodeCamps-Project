const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    // Existing fields...
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: Number,
    },
    gender: {
        type: String,
        enum: ['male', 'female'],
        default: 'male'
    },
    profilePic: {
        type: String
    },
    points: {
        type: Number,
        default: 0 
    },
    streakStartTime: {
        type: Date, 
    },
    streakLength: {
        type: Number,
        default: 0
    },
    confirmEmail:{

        type:Boolean,
        default:false
    },
    sendcode:{
        type: String,
        default:null

    }
}, { timestamps: true });

const userModel = mongoose.model('user', userSchema);
module.exports = { userModel };
