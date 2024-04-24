const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    mainImage :{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Image'
    },
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
    },
    ExerciseNumber : {
        type: Number
    },
    BaseGoal:{
        type: Number
    }

}, { timestamps: true });

const userModel = mongoose.model('user', userSchema);
module.exports = { userModel };
