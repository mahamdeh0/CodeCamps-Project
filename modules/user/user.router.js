const router = require('express').Router();

const authcontroller  = require('./controller/user.controller');
const { userSignup} = require('./controller/user.validation');
const { validation } = require('../../middlewear/validation');
const { userauth } = require('../../middlewear/auth');

router.post('/signUp',validation(userSignup),authcontroller.userSignup);
router.post('/signin',authcontroller.userLogin);

router.get('/confirmEmail/:token',authcontroller.userconfirmEmail);
router.patch('/userconfirmEmailbycode',authcontroller.userconfirmEmailbycode);
router.patch('/Update/:id', userauth(),authcontroller.update);

router.get('/sendcode',authcontroller.sendcode);
router.patch('/forgetpassword',authcontroller.forgetpassword);

router.post('/sendMessageToTeacher', userauth(), authcontroller.sendMessageToTeacher);
router.get('/conversationHistory/:userId/:teacherId', userauth(), authcontroller.getConversationHistory);

router.get('/booksview/:bookId',userauth(), authcontroller.viwebooks);
router.get('/viewarticles', authcontroller.viwearticle);
router.get('/viewSubscribedCourses',userauth(),authcontroller.viewSubscribedCourses);
router.get('/viewproduct',authcontroller.viewproduct);
router.get('/viewCart', userauth(), authcontroller.viewCart);

router.post('/subscribeToCourse',userauth(),authcontroller.subscribeToCourse);
router.delete('/coursedelete/:id',userauth(),authcontroller.deleteCourse);

router.post('/submitReview',userauth(),authcontroller.submitReview);
router.post('/submitSolution/:problemId',userauth(),authcontroller.submitSolution);

router.post('/addToCart', userauth(), authcontroller.addToCart);
router.post('/removeFromCart', userauth(), authcontroller.removeFromCart);
router.post('/Makeorders', userauth(),authcontroller.makeorder);
router.get('/Myorders', userauth(),authcontroller.myorders);
 
router.delete('/deleteUserByEmail',authcontroller.deleteuser);

module.exports=router; 
