const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'onModel'
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'onModel'
    },
    onModel: {
        type: String,
        required: true,
        enum: ['user', 'teacher']
    },
    message: {
        type: String,
        required: true
    }
}, { timestamps: true });

const messageModel = mongoose.model('message', messageSchema);
module.exports = { messageModel };
