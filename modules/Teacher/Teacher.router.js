const router = require('express').Router();

const authcontroller  = require('./controller/Teacher.controller');
const { teacherSignup, teacherLogin } = require('./controller/Teacher.validation');
const { validation } = require('../../middlewear/validation');
const { teacherauth } = require('../../middlewear/auth');
const { myMulter, HME } = require('../../services/multer');
 
router.post('/signUp',validation(teacherSignup),authcontroller.teacherSignup);
router.post('/signin',authcontroller.teacherLogin);

router.get('/getteacher',teacherauth(),authcontroller.getTeacherdata);
router.get('/confirmEmail/:token',authcontroller.teacherconfirmEmail);
router.patch('/teacherconfirmEmailbycode',authcontroller.userconfirmEmailbycode);
router.patch('/Update/:id', teacherauth(),authcontroller.update);

router.post('/sendcode',authcontroller.sendcode);
router.patch('/forgetpassword',authcontroller.forgetpassword);

router.post('/addcourse',teacherauth(),authcontroller.addcourse);
router.post('/addarticle',teacherauth(),authcontroller.addarticle);
router.post('/addBook', teacherauth(), myMulter(['application/pdf']).single('book'), HME, authcontroller.addBook);
router.post('/upload-video/:courseId', teacherauth(), myMulter(['video/mp4']).single('videoUrl'), HME, authcontroller.uploadvideo);
router.get('/course/:courseId/:videoId',authcontroller.getvideo);
 
router.put('/updateCourse',teacherauth(),authcontroller.updateCourse);
router.delete('/courses/:id',teacherauth(), authcontroller.deleteCourse);
router.get('/courses', authcontroller.getAllCourses);
router.get('/courses/:courseId/participants', authcontroller.getCourseParticipants);
router.delete('/courses/:courseId/unsubscribe/:userId', authcontroller.unsubscribeFromCourse);

router.get('/viewTeacherRating',teacherauth(),authcontroller.viewTeacherRating);
router.get('/myCourses',teacherauth(),authcontroller.viewCourses);
router.get('/getCourseVideos/:courseId',teacherauth(),authcontroller.getCourseVideos);
router.get('/viewproduct',authcontroller.viewproduct);
router.get('/viewCart', teacherauth(), authcontroller.viewCart);
router.post('/removeFromCart', teacherauth(), authcontroller.removeFromCart);

router.post('/sendMessageToUser', teacherauth(), authcontroller.sendMessageToUser);
router.get('/conversationHistory/:teacherId/:userId', teacherauth(), authcontroller.getConversationHistory);

router.post('/addToCart', teacherauth(), authcontroller.addToCart);
router.post('/Makeorders', teacherauth(),authcontroller.makeorder);
router.get('/Myorders', teacherauth(),authcontroller.myorders);

router.post('/addQuiz',teacherauth(), authcontroller.addQuiz);
router.get('/quiz/:id', authcontroller.displayQuiz);
router.get('/quizzes', authcontroller.getAllQuizzes);

router.delete('/deleteTeacherByEmail',authcontroller.deleteteacher);

module.exports=router; 
