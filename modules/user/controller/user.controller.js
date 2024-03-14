let bcrypt = require('bcryptjs');
let jwt = require('jsonwebtoken');
const { userModel } = require("../../../DB/model/user.model");
const { courseModel } = require("../../../DB/model/course.model");
const { SubscriptionModel } = require("../../../DB/model/subscription.model");
const { ReviewModel } = require("../../../DB/model/review.model");
const { ProblemModel } = require("../../../DB/model/problem.model");
const { sendEmail } = require('../../../services/SendEmail');

const userSignup = async (req,res)=>{


    const {name,email,password,age,gender}= req.body;

    try{
    const user = await userModel.findOne({email:email});

    if(user){

        res.status(409).json({message:"email already exist"})
    }else{

        const hashPassword = await bcrypt.hash(password,parseInt(process.env.saltRound));
        const newUser = new userModel({email:email,userName:name, password:hashPassword,age:age,gender:gender});
        const savedUser = await newUser.save();

        if(!savedUser){
            res.status(400).json({message:"fail to signup"});
        }else{

            const token = jwt.sign({id:savedUser._id},process.env.logintoken,{expiresIn:'48h'} );

            let message =  `
            <!DOCTYPE html>
<html>
<head>

  <meta charset="utf-8">
  <meta http-equiv="x-ua-compatible" content="ie=edge">
  <title>Email Confirmation</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style type="text/css">
  /**
   * Google webfonts. Recommended to include the .woff version for cross-client compatibility.
   */
  @media screen {
    @font-face {
      font-family: 'Source Sans Pro';
      font-style: normal;
      font-weight: 400;
      src: local('Source Sans Pro Regular'), local('SourceSansPro-Regular'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/ODelI1aHBYDBqgeIAH2zlBM0YzuT7MdOe03otPbuUS0.woff) format('woff');
    }
    @font-face {
      font-family: 'Source Sans Pro';
      font-style: normal;
      font-weight: 700;
      src: local('Source Sans Pro Bold'), local('SourceSansPro-Bold'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/toadOcfmlt9b38dHJxOBGFkQc6VGVFSmCnC_l7QZG60.woff) format('woff');
    }
  }
  /**
   * Avoid browser level font resizing.
   * 1. Windows Mobile
   * 2. iOS / OSX
   */
  body,
  table,
  td,
  a {
    -ms-text-size-adjust: 100%; /* 1 */
    -webkit-text-size-adjust: 100%; /* 2 */
  }
  /**
   * Remove extra space added to tables and cells in Outlook.
   */
  table,
  td {
    mso-table-rspace: 0pt;
    mso-table-lspace: 0pt;
  }
  /**
   * Better fluid images in Internet Explorer.
   */
  img {
    -ms-interpolation-mode: bicubic;
  }
  /**
   * Remove blue links for iOS devices.
   */
  a[x-apple-data-detectors] {
    font-family: inherit !important;
    font-size: inherit !important;
    font-weight: inherit !important;
    line-height: inherit !important;
    color: inherit !important;
    text-decoration: none !important;
  }
  /**
   * Fix centering issues in Android 4.4.
   */
  div[style*="margin: 16px 0;"] {
    margin: 0 !important;
  }
  body {
    width: 100% !important;
    height: 100% !important;
    padding: 0 !important;
    margin: 0 !important;
  }
  /**
   * Collapse table borders to avoid space between cells.
   */
  table {
    border-collapse: collapse !important;
  }
  a {
    color: #1a82e2;
  }
  img {
    height: auto;
    line-height: 100%;
    text-decoration: none;
    border: 0;
    outline: none;
  }
  </style>

</head>
<body style="background-color: #e9ecef;">

  <!-- start preheader -->
  <div class="preheader" style="display: none; max-width: 0; max-height: 0; overflow: hidden; font-size: 1px; line-height: 1px; color: #fff; opacity: 0;">
    A preheader is the short summary text that follows the subject line when an email is viewed in the inbox.
  </div>
  <!-- end preheader -->

  <!-- start body -->
  <table border="0" cellpadding="0" cellspacing="0" width="100%">

    <!-- start logo -->
    <tr>
      <td align="center" bgcolor="#e9ecef">
        <!--[if (gte mso 9)|(IE)]>
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
        <tr>
        <td align="center" valign="top" width="600">
        <![endif]-->
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
          <tr>
            <td align="center" valign="top" style="padding: 36px 24px;">
              <a href="https://www.blogdesire.com" target="_blank" style="display: inline-block;">
                <img src="https://www.blogdesire.com/wp-content/uploads/2019/07/blogdesire-1.png" alt="Logo" border="0" width="48" style="display: block; width: 48px; max-width: 48px; min-width: 48px;">
              </a>
            </td>
          </tr>
        </table>
        <!--[if (gte mso 9)|(IE)]>
        </td>
        </tr>
        </table>
        <![endif]-->
      </td>
    </tr>
    <!-- end logo -->

    <!-- start hero -->
    <tr>
      <td align="center" bgcolor="#e9ecef">
        <!--[if (gte mso 9)|(IE)]>
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
        <tr>
        <td align="center" valign="top" width="600">
        <![endif]-->
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
          <tr>
            <td align="left" bgcolor="#ffffff" style="padding: 36px 24px 0; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; border-top: 3px solid #d4dadf;">
              <h1 style="margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -1px; line-height: 48px;">CodeCamps 
              Confirm Your Email Address</h1>
            </td>
          </tr>
        </table>
        <!--[if (gte mso 9)|(IE)]>
        </td>
        </tr>
        </table>
        <![endif]-->
      </td>
    </tr>
    <!-- end hero -->

    <!-- start copy block -->
    <tr>
      <td align="center" bgcolor="#e9ecef">
        <!--[if (gte mso 9)|(IE)]>
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
        <tr>
        <td align="center" valign="top" width="600">
        <![endif]-->
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">

          <!-- start copy -->
          <tr>
            <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
              <p style="margin: 0;">Tap the button below to confirm your email address. If you didn't create an account with <a href="https://blogdesire.com">Paste</a>, you can safely delete this email.</p>
            </td>
          </tr>
          <!-- end copy -->

          <!-- start button -->
          <tr>
            <td align="left" bgcolor="#ffffff">
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td align="center" bgcolor="#ffffff" style="padding: 12px;">
                    <table border="0" cellpadding="0" cellspacing="0">
                      <tr>
                        <td align="center" bgcolor="#1a82e2" style="border-radius: 6px;">
                          <a href="${req.protocol}://${req.headers.host}${process.env.BaseUrl}/User/confirmEmail/${token}" target="_blank" style="display: inline-block; padding: 16px 36px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; color: #ffffff; text-decoration: none; border-radius: 6px;">Verify Email</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- end button -->

          <!-- start copy -->
          <tr>
            <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
            </td>
          </tr>
          <!-- end copy -->

          <!-- start copy -->
          <tr>
            <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px; border-bottom: 3px solid #d4dadf">
              <p style="margin: 0;">CodeCamps,<br> Thanks</p>
            </td>
          </tr>
          <!-- end copy -->

        </table>
        <!--[if (gte mso 9)|(IE)]>
        </td>
        </tr>
        </table>
        <![endif]-->
      </td>
    </tr>
    <!-- end copy block -->

    <!-- start footer -->
    <tr>
      <td align="center" bgcolor="#e9ecef" style="padding: 24px;">
        <!--[if (gte mso 9)|(IE)]>
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
        <tr>
        <td align="center" valign="top" width="600">
        <![endif]-->
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">

          <!-- start permission -->
          <tr>
            <td align="center" bgcolor="#e9ecef" style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;">
              <p style="margin: 0;">You received this email because we received a request for [type_of_action] for your account. If you didn't request [type_of_action] you can safely delete this email.</p>
            </td>
          </tr>
          <!-- end permission -->

          <!-- start unsubscribe -->
          <tr>
            <td align="center" bgcolor="#e9ecef" style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;">
              <p style="margin: 0;">To stop receiving these emails, you can <a href="https://www.blogdesire.com" target="_blank">unsubscribe</a> at any time.</p>
              <p style="margin: 0;">Paste 1234 S. Broadway St. City, State 12345</p>
            </td>
          </tr>
          <!-- end unsubscribe -->

        </table>
        <!--[if (gte mso 9)|(IE)]>
        </td>
        </tr>
        </table>
        <![endif]-->
      </td>
    </tr>
    <!-- end footer -->

  </table>
  <!-- end body -->

</body>
</html>`;


            await sendEmail(email, 'confirm Email', message)

            res.status(201).json({message:"done signup"})
        }
 
    }}catch{
        res.status(400).json({message:"error catch"});


    }
}
 
const userLogin = async (req,res)=>{

    const{email,password} = req.body;
    try{
    const user = await userModel.findOne({email});

    if(!user){
        res.json({message:"invalid account"});
    }else{

        if(!user.confirmEmail){
            res.status(400).json({message:"please confirm your email first"})
    
        }else{

        const match = await bcrypt.compare(password,user.password);

        if(!match){

            res.status(400).json({message:"invalid password"});


        }else{
            const token = jwt.sign({id:user._id},process.env.logintoken,{expiresIn:60*60*24});


            res.status(200).json({message:"done signin ",token});

        }}

    }}catch{
            res.json({message:"done signin ",token});

    }


}

const userconfirmEmail = async(req,res)=>{

    try{

    const{token} = req.params;
    const decoded = jwt.verify(token,process.env.logintoken);

    if(!decoded){

        res.status(400).json({message:"invalid token"})
    }else{

        const user = await userModel.findByIdAndUpdate({_id:decoded.id,confirmEmail:false},{confirmEmail:true});
        if(!user){

            res.status(400).json({message:"account already confirmed"})
        }else{

            res.status(200).json({message:"email confirmed Thx"})

        }
    }}catch{
        res.status(400).json({message:"error catch"})

    }

}

const subscribeToCourse = async (req, res) => {
    const { courseId } = req.body; 
    const userId = req.user._id; 

    try {
        const course = await courseModel.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        const existingSubscription = await SubscriptionModel.findOne({ user: userId, course: courseId });
        if (existingSubscription) {
            return res.status(400).json({ message: "User is already subscribed to this course" });
        }

        const subscription = await SubscriptionModel.create({ user: userId, course: courseId });
        res.status(201).json({ message: "Subscription successful", subscription });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const viewSubscribedCourses = async (req, res) => {
    const userId = req.user._id; 

    try {
        const subscriptions = await SubscriptionModel.find({ user: userId }).populate('course');

        if (subscriptions.length === 0) {
            return res.status(404).json({ message: "No subscriptions found for the user" });
        }

        const subscribedCourses = subscriptions.map(subscription => {
            return {
                courseId: subscription.course._id,

            };
        });

        res.status(200).json({ subscribedCourses });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const deleteCourse = async(req, res) => {

    const courseId = req.params.id;
    const userId = req.user._id;

    try {
        const deletedSubscription = await SubscriptionModel.findOneAndDelete({
            course: courseId,
            user: userId, 
        });

        if (!deletedSubscription) {
            return res.status(404).json({ message: "Subscription not found or already deleted" });
        }

        res.json({ message: "Subscription deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const submitReview = async (req, res) => {
    const { courseId, rating, comment } = req.body;
    const userId = req.user._id;

    try {
        const subscription = await SubscriptionModel.findOne({ user: userId, course: courseId, status: 'active' });
        if (!subscription) {
            return res.status(403).json({ message: "You must be subscribed and have attended the course to review it." });
        }

        const existingReview = await ReviewModel.findOne({ user: userId, course: courseId });
        if (existingReview) {
            return res.status(409).json({ message: "You have already submitted a review for this course." });
        }

        const course = await courseModel.findById(courseId).select('teacher admin');
        if (!course) {
            return res.status(404).json({ message: "Course not found." });
        }

        const review = await ReviewModel.create({
            user: userId,
            course: courseId,
            teacher: course.teacher, 
            rating,
            comment
        });

        res.status(201).json({ message: "Review submitted successfully", review });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateUserActivity = async (userId) => {
    try {
        const user = await userModel.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }

        user.points += 10;

        const now = new Date();
        if (user.streakStartTime) {
            const timeDiff = now - user.streakStartTime;
            const hoursDiff = timeDiff / (1000 * 60 * 60);

            if (hoursDiff <= 24) {
                user.streakLength += 1;
            } else if (hoursDiff > 24 && hoursDiff <= 48) {
                user.streakStartTime = now; 
            } else {
                user.streakLength = 1;
                user.streakStartTime = now;
            }
        } else {
            user.streakLength = 1;
            user.streakStartTime = now;
        }

        await user.save();

        return { points: user.points, streakLength: user.streakLength };
    } catch (error) {
        console.error('Error updating user activity:', error);
        throw error;
    }
};

const submitSolution = async (req, res) => {

    const { problemId } = req.params;
    const { solution } = req.body;
    const userId = req.user._id;

    try {
        const problem = await ProblemModel.findById(problemId);
        if (!problem) {
            return res.status(404).json({ message: "Problem not found" });
        }

        if (problem.answer === solution) {
            const activityUpdate = await updateUserActivity(userId);
            res.status(200).json({ 
                message: "Correct solution!",
                points: activityUpdate.points,
                streakLength: activityUpdate.streakLength
            });
        } else {
            res.status(400).json({ message: "Incorrect solution. Please try again." });
        }
    } catch (error) {
        console.error('Error submitting solution:', error);
        res.status(500).json({ message: "Error processing your solution", error: error.message });
    }
};


module.exports={userSignup,userLogin,subscribeToCourse,viewSubscribedCourses,deleteCourse,submitReview,submitSolution,userconfirmEmail}