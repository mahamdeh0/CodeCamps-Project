const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'course',
        required: true
    },
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'teacher',
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1, 
        max: 5
    },
    comment: {
        type: String,
        required: false 
    }
}, { timestamps: true });

const ReviewModel = mongoose.model('review', reviewSchema);
module.exports = { ReviewModel};

