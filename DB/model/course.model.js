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
    lat:{
        type:String,
    },
    lng:{
        type:String,
    },
    present :{
        type:String,
        enum:['inPerson','remotely'],
        default:'remotely',
        required:true
    },    
    teacher: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'teacher', 
    },
    mainImage :{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Image'
    },
    coverImage :{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Image'
    },
    isApproved: { 
        type: Boolean,
        default: false,
        required: true
    },
    rating:{
        type: Number,
        default:0
    },
    CriditHoure:{
        type: Number
    },
    videoLectures: [{
        video: {
            type: String
        },
        title: {
            type: String
        },
        thumbnail:{
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Image'
        },
        description:{
            type: String
        },
        duration:{
            type: String
        }
    }]
    
},{timestamps:true});

    const courseModel = mongoose.model('course',courseSchema);
    module.exports={courseModel};

