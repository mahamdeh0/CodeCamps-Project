const Joi = require('joi')


const teacherSignup = {
    body: Joi.object().required().keys({
        name: Joi.string().min(3).max(15).required().messages({
            'string.empty': 'Name is required'
        }),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).max(20).required().pattern(new RegExp('^[a-zA-Z0-9]+$'))
            .message('Password must be between 8 and 20 characters long and contain only letters and digits.'),
        phone: Joi.string().min(9).max(10).required(),
        gender: Joi.string().min(1).max(20).required(),
        age: Joi.string().min(1).max(2).required(),
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