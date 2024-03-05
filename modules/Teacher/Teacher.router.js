const router = require('express').Router();

const authcontroller  = require('./controller/Teacher.controller');
const { teacherSignup, teacherLogin } = require('./controller/Teacher.validation');
const { validation } = require('../../middlewear/validation');


router.post('/signUp',validation(teacherSignup),authcontroller.teacherSignup)
router.get('/signin',validation(teacherLogin),authcontroller.teacherLogin);


module.exports=router; 
