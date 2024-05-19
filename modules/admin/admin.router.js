const router = require('express').Router();

const authcontroller  = require('./controller/admin.controller');
const { adminSignup, adminLogin } = require('./controller/admin.validation');
const { validation } = require('../../middlewear/validation');
const { adminauth } = require('../../middlewear/auth');


router.post('/signUp',validation(adminSignup),authcontroller.adminSignup);
router.post('/signin',validation(adminLogin),authcontroller.adminLogin);
router.get('/confirmEmail/:token',authcontroller.adminconfirmEmail);

router.patch('/approveCourse/:courseId',authcontroller.approveCourse);
router.patch('/unapproveCourse/:courseId',authcontroller.unapproveCourse);
router.post('/addcourse',adminauth(),authcontroller.addcourse);
router.post('/addarticle',adminauth(),authcontroller.addarticle);
router.post('/addQuiz',adminauth(), authcontroller.addQuiz);

router.get('/viewAllUsersAndTeachersAndCourses',adminauth(),authcontroller.viewAllUsersAndTeachersAndCourses);

router.post('/addProduct',authcontroller.addProduct);
router.delete('/deleteproducts/:id',adminauth(),authcontroller.deleteproduct);
router.patch('/updateproduct/:id', adminauth(),authcontroller.updateproduct);

module.exports=router; 
