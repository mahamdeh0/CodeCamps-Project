const mongoose = require('mongoose');

const problemSchema = new mongoose.Schema({
    questiontext: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    },
    correctanswers: {
        type: [String],
    },
    marks: {
        type: Number,
    }
}, { timestamps: true });

const quizSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    time:{
        type:Number
    },
    description: {
        type: String,
        required: true
    },
    problems: [problemSchema], 
    totalMarks: {
        type: Number,
        default: function() {
            return this.problems.reduce((total, problem) => total + (problem.marks || 0), 0);
        }
    }
}, { timestamps: true });

const QuizModel = mongoose.model('Quiz', quizSchema);

module.exports = { QuizModel };
