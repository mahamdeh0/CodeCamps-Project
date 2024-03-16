const router = require('express').Router();

const authcontroller  = require('./controller/admin.controller');
const { adminSignup, adminLogin } = require('./controller/admin.validation');
const { validation } = require('../../middlewear/validation');
const { adminauth } = require('../../middlewear/auth');


router.post('/signUp',validation(adminSignup),authcontroller.adminSignup);
router.get('/signin',validation(adminLogin),authcontroller.adminLogin);
router.get('/confirmEmail/:token',authcontroller.adminconfirmEmail);

router.patch('/approveCourse/:courseId',authcontroller.approveCourse);

router.post('/addcourse',adminauth(),authcontroller.addcourse);
router.post('/addarticle',adminauth(),authcontroller.addarticle);
router.post('/addProblem',adminauth(), authcontroller.addproblem);

router.get('/viewAllUsersAndTeachersAndCourses',adminauth(),authcontroller.viewAllUsersAndTeachersAndCourses);

router.post('/addProduct',adminauth(),authcontroller.addProduct);
router.delete('/deleteproducts/:id',adminauth(),authcontroller.deleteproduct);
router.patch('/updateproduct/:id', adminauth(),authcontroller.updateproduct);

module.exports=router; 
