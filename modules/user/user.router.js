const router = require('express').Router();

const authcontroller  = require('./controller/user.controller');
const { userSignup, userLogin } = require('./controller/user.validation');
const { validation } = require('../../middlewear/validation');
const { userauth } = require('../../middlewear/auth');


router.post('/signUp',validation(userSignup),authcontroller.userSignup)
router.get('/signin',authcontroller.userLogin);

router.post('/subscribeToCourse',userauth(),authcontroller.subscribeToCourse)
router.get('/viewSubscribedCourses',userauth(),authcontroller.viewSubscribedCourses);
router.delete('/delete/:id',userauth(),authcontroller.deleteCourse)

router.post('/submitReview',userauth(),authcontroller.submitReview)
router.post('/submitSolution/:problemId',userauth(),authcontroller.submitSolution)


module.exports=router; 
