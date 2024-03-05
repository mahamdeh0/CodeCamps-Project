const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.BDURI);
        console.log("Connected to DB");
    } catch (error) {
        console.error("Error connecting to DB:", error);
    } 
};

module.exports = { connectDB };
