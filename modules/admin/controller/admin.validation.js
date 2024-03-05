const Joi = require('joi')


const adminSignup = {

    body:Joi.object().required().keys({
        name:Joi.string().min(3).max(15).required().messages({
            'string.empty':'name is required'
        }),
        email:Joi.string().email().required(),
        password:Joi.string().min(5).max(20).required(),
        gender: Joi.string().min(1).max(20),
        age: Joi.string().min(1).max(2),
    })
}
const adminLogin = {

    body:Joi.object().required().keys({
        email:Joi.string().email(),
        password:Joi.string().min(5).max(20),
    })
}
module.exports= {adminSignup,adminLogin}