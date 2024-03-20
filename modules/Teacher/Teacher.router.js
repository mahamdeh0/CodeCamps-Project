const router = require('express').Router();

const authcontroller  = require('./controller/Teacher.controller');
const { teacherSignup, teacherLogin } = require('./controller/Teacher.validation');
const { validation } = require('../../middlewear/validation');
const { teacherauth } = require('../../middlewear/auth');
const { myMulter, HME } = require('../../services/multer');
 
router.post('/signUp',validation(teacherSignup),authcontroller.teacherSignup);
router.get('/signin',authcontroller.teacherLogin);


router.get('/getteacher',authcontroller.getTeacherdata);
router.get('/confirmEmail/:token',authcontroller.teacherconfirmEmail);
router.patch('/userconfirmEmailbycode',authcontroller.userconfirmEmailbycode);
router.patch('/Update/:id', teacherauth(),authcontroller.update);

router.get('/sendcode',authcontroller.sendcode);
router.patch('/forgetpassword',authcontroller.forgetpassword);

router.post('/addcourse',teacherauth(),authcontroller.addcourse);
router.post('/addarticle',teacherauth(),authcontroller.addarticle);
router.post('/addBook', teacherauth(), myMulter(['application/pdf']).single('book'), HME, authcontroller.addBook);

router.get('/viewTeacherRating',teacherauth(),authcontroller.viewTeacherRating);
router.get('/myCourses',teacherauth(),authcontroller.viewCourses);
router.get('/viewproduct',authcontroller.viewproduct);
router.get('/viewCart', teacherauth(), authcontroller.viewCart);
router.post('/removeFromCart', teacherauth(), authcontroller.removeFromCart);

router.post('/sendMessageToUser', teacherauth(), authcontroller.sendMessageToUser);
router.get('/conversationHistory/:teacherId/:userId', teacherauth(), authcontroller.getConversationHistory);

router.post('/addToCart', teacherauth(), authcontroller.addToCart);
router.post('/Makeorders', teacherauth(),authcontroller.makeorder);
router.get('/Myorders', teacherauth(),authcontroller.myorders);

router.delete('/deleteTeacherByEmail',authcontroller.deleteteacher);

module.exports=router; 
