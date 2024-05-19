const Joi = require('joi')


const adminSignup = {
 
    body:Joi.object().required().keys({
        name:Joi.string().min(3).max(15).required().messages({
            'string.empty':'name is required'
        }),
        email:Joi.string().email().required(),
        password: Joi.string().min(8).max(20).required()
        .pattern(new RegExp('^[^\\s]{8,20}$'))
        .message('Password must be between 8 and 20 characters long and can contain any letters, digits, and symbols except spaces.'),
         })
}     
const adminLogin = {

    body:Joi.object().required().keys({
        email:Joi.string().email(),
        password:Joi.string().min(5).max(20),
    })
}
module.exports= {adminSignup,adminLogin}