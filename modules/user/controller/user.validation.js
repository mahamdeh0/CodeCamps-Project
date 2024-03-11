const Joi = require('joi')


const userSignup = {

    body:Joi.object().required().keys({
        name:Joi.string().min(3).max(15).required().messages({
            'string.empty':'name is required'// change name of message
        }),
        email:Joi.string().email().required(),
        password: Joi.string().min(8).max(20).required()
        .pattern(new RegExp('^[^\\s]{8,20}$'))
        .message('Password must be between 8 and 20 characters long and can contain any letters, digits, and symbols except spaces.'), 
        gender: Joi.string().min(1).max(20),
        age: Joi.number().integer().min(12).max(99).required()
        .messages({'string.empty': 'Age must consist of two digits and be between 12 and 99.'}),    })
}
const userLogin = {

    body:Joi.object().required().keys({
        email:Joi.string().email(),
        password:Joi.string().min(5).max(20),
    })
}
module.exports= {userSignup,userLogin}