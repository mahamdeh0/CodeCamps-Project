const router = require('express').Router();

const authcontroller  = require('./controller/user.controller');
const { userSignup, userLogin } = require('./controller/user.validation');
const { validation } = require('../../middlewear/validation');


router.post('/signUp',validation(userSignup),authcontroller.userSignup)
router.get('/signin',validation(userLogin),authcontroller.userLogin);


module.exports=router; 
