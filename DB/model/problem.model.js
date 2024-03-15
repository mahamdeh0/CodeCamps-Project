const mongoose = require('mongoose');

const problemSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    }
}, { timestamps: true });

const ProblemModel = mongoose.model('Problem', problemSchema);
module.exports = { ProblemModel};
