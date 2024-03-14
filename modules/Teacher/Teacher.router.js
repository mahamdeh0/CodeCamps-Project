const router = require('express').Router();

const authcontroller  = require('./controller/Teacher.controller');
const { teacherSignup, teacherLogin } = require('./controller/Teacher.validation');
const { validation } = require('../../middlewear/validation');
const { teacherauth } = require('../../middlewear/auth');


router.post('/signUp',validation(teacherSignup),authcontroller.teacherSignup);
router.get('/signin',validation(teacherLogin),authcontroller.teacherLogin);
router.get('/confirmEmail/:token',authcontroller.teacherconfirmEmail);

router.post('/addcourse',teacherauth(),authcontroller.addcourse);
router.post('/addarticle',teacherauth(),authcontroller.addarticle);

router.get('/viewTeacherRating',teacherauth(),authcontroller.viewTeacherRating);
router.get('/myCourses',teacherauth(),authcontroller.viewCourses);


module.exports=router; 
