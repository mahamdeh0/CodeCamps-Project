const Joi = require('joi')


const teacherSignup = {
    body: Joi.object().required().keys({
        name: Joi.string().min(3).max(15).required().messages({
            'string.empty': 'Name is required'
        }),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).max(20).required()
       .pattern(new RegExp('^[^\\s]{8,20}$'))
       .message('Password must be between 8 and 20 characters long and can contain any letters, digits, and symbols except spaces.'),
        gender: Joi.string().min(1).max(20).required(),
        phone: Joi.string().required()   
        .pattern(/^[0-9]{10}$/) 
        .message('Phone number must be exactly 10 digits long.'), 
        age: Joi.number().integer().min(12).max(99).required()
        .messages({'string.empty': 'Age must consist of two digits and be between 12 and 99.'}),
         Experience: Joi.string().min(1).max(200).required(),
        nationality: Joi.string().min(1).max(20).required(),
        achievements: Joi.string().min(1).max(200).required(),     
    })      
}; 
   
const teacherLogin = {

    body:Joi.object().required().keys({
        email:Joi.string().email(),
        password:Joi.string().min(5).max(20),
    })
}
module.exports= {teacherSignup,teacherLogin}