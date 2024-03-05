const router = require('express').Router();

const authcontroller  = require('./controller/admin.controller');
const { adminSignup, adminLogin } = require('./controller/admin.validation');
const { validation } = require('../../middlewear/validation');


router.post('/signUp',validation(adminSignup),authcontroller.adminSignup)
router.get('/signin',validation(adminLogin),authcontroller.adminLogin);


module.exports=router; 
