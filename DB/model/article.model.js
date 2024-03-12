const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({

    articleName:{

        type:String,
        required:true
    },
    Description:{

        type:String,
        required:true,
    },  
    teacher: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'teacher', 
    },
    admin: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admin', 
    }

},{timestamps:true});

    const articleModel = mongoose.model('article',articleSchema);
    module.exports={articleModel};