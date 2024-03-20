const router = require('express').Router();

const authcontroller = require('./auth.controller/auth.controller');
const { validation } = require('../../middlewear/validation');


router.get('/signin',authcontroller.Login);



module.exports=router; 
