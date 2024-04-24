let jwt = require('jsonwebtoken');
const {teacherModel}= require('../DB/model/Teacher.model');
const {adminModel}= require('../DB/model/Admin.model');
const {userModel}= require('../DB/model/user.model');
const {Image}= require('../DB/model/images.model');
const teacherauth = () => {
    return async (req, res, next) => {
        try {
            let {token} = req.headers;
            if (!token || !token.startsWith(process.env.startToken)) {
                return res.status(401).json({message: "Invalid or missing token"});
            }
            
            token = token.split(process.env.startToken)[1];
            const decoded = await jwt.verify(token, process.env.logintoken);
            const teacher = await teacherModel.findById(decoded.id);
            
            if (!teacher) {
                return res.status(404).json({message: "Teacher not found"});
            }
            const mainImage = await Image.findById(teacher.mainImage);
            const mainImageData = mainImage ? mainImage.data.toString('base64') : null;
            const userWithNewImage = {...teacher.toObject(), mainImage: mainImageData};

            // Attach the updated user object to the request
            req.teacher = userWithNewImage;
    
            next();
        } catch (error) {
            return res.status(500).json({message: "Authentication error"});
        }
    };
};

const adminauth = () => {
    return async (req, res, next) => {
        try {
            let {token} = req.headers;
            if (!token || !token.startsWith(process.env.startToken)) {
                return res.status(401).json({message: "Invalid or missing token"});
            }
            
            token = token.split(process.env.startToken)[1];
            const decoded = await jwt.verify(token, process.env.logintoken);
            const admin = await adminModel.findById(decoded.id);
            
            if (!admin) {
                return res.status(404).json({message: "admin not found"});
            }

            req.admin = admin;
            next();
        } catch (error) {
            return res.status(500).json({message: "Authentication error"});
        }
    };
};
const userauth = () => {
    return async (req, res, next) => {
        try {
            let {token} = req.headers;
    
            if (!token || !token.startsWith(process.env.startToken)) {
                return res.status(401).json({message: "Invalid or missing token"});
            }
            
            token = token.split(process.env.startToken)[1];
            const decoded = await jwt.verify(token, process.env.logintoken);
            const user = await userModel.findById(decoded.id).exec();

            if (!user) {
                return res.status(404).json({message: "User not found"});
            }

            const mainImage = await Image.findById(user.mainImage);
            const mainImageData = mainImage ? mainImage.data.toString('base64') : null;

            // Clone the user object if necessary
            const userWithNewImage = {...user.toObject(), mainImage: mainImageData};

            // Attach the updated user object to the request
            req.user = userWithNewImage;
                console.log(req.user);
            next();
        } catch (error) {
            return res.status(500).json({message: "Authentication error"});
        }
    };
};



module.exports={teacherauth,adminauth,userauth} 