let bcrypt = require('bcryptjs');
let jwt = require('jsonwebtoken');
const { userModel } = require("../../../DB/model/user.model");
const { courseModel } = require("../../../DB/model/course.model");
const { messageModel } = require("../../../DB/model/message.model");
const { SubscriptionModel } = require("../../../DB/model/subscription.model");
const { ReviewModel } = require("../../../DB/model/review.model");
const { ProblemModel } = require("../../../DB/model/problem.model");
const { articleModel } = require("../../../DB/model/article.model");
const { BookModel } = require("../../../DB/model/book.model");
const { orderModel } = require("../../../DB/model/order.model");
const { productModel } = require("../../../DB/model/product.model");
const { cartModel } = require("../../../DB/model/cart.model");
const { sendEmail } = require('../../../services/SendEmail');
const { nanoid } = require('nanoid');

const userSignup = async (req,res)=>{

    const {name,email,password,age,gender}= req.body;
    console.log({name,email,password,age,gender});
    try{
    const user = await userModel.findOne({email:email});

    if(user){
          console.log("email already exist")
        res.status(409).json({message:"email already exist"})
    }else{

        const hashPassword = await bcrypt.hash(password,parseInt(process.env.saltRound));
        const newUser = new userModel({email:email,userName:name, password:hashPassword,age:age,gender:gender});
        const savedUser = await newUser.save();

        if(!savedUser){
          console.log("Failed to register")
            res.status(400).json({message:"Failed to register"});
        }else{

            const token = jwt.sign({id:savedUser._id},process.env.logintoken,{expiresIn:'48h'} );
            const code = nanoid(6);

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
                        <tr>
                        <h4>You can also use the code</h4>
                        </tr>
                        <tr>
                        <td style="background-color: rgb(0, 210, 244); padding: 12px 35px; border-radius: 50px;" align="center" class="ctaButton"> <a href="#" style="color:#fff;font-family:Poppins,Helvetica,Arial,sans-serif;font-size:13px;font-weight:600;font-style:normal;letter-spacing:1px;line-height:20px;text-decoration:none;display:block" target="_blank" class="text">code :${code}</a>
                        </td>
                      </tr>
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
            const userupdate = await userModel.findOneAndUpdate({email:email},{sendcode:code});

            res.status(201).json({message:"An account has been created successfully",token})
        }
 
    }}catch(error){
      res.status(500).json({ message: "Error ", error: error.message });
    }
};

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
        res.status(500).json({message:"error catch"})
    }
};

const userconfirmEmailbycode = async(req,res)=>{

  const {code}=req.body;

  try{

    const user = await userModel.findOneAndUpdate({sendcode:code,confirmEmail:false},{confirmEmail:true});
    const userupdate = await userModel.findOneAndUpdate({sendcode:code},{sendcode:null});
    
    if(!user){
            res.status(400).json({message:"account already confirmed"})
        }else{

            res.status(200).json({message:"email confirmed Thx"})
        }
    }catch(error){
      res.status(500).json({ message: "Error ", error: error.message });
    }
};

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
        res.status(500).json({ message: error.message });
    }
};

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
        res.status(500).json({ message: error.message });
    }
};

const viwebooks =  async (req, res) => {
  try {
    const { bookId } = req.params;
    const book = await BookModel.findById(bookId);
    if (!book || !book.pdfContent) {
      return res.status(404).json({ message: "Book or PDF content not found" });
    }
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `inline; filename="${book.title}.pdf"`,
    });
    res.send(book.pdfContent);
  } catch (error) {
    console.error("Error viewing book:", error);
    res.status(500).json({ message: "Error viewing book", error: error.message });
  }
};

const viwearticle = async (req, res) => {
  try {
      const articles = await articleModel.find()
                             .populate('teacher', 'name') 
                             .populate('admin', 'name'); 
      res.json(articles);
  } catch (error) {
      console.error("Error fetching articles:", error);
      res.status(500).json({ message: "Error fetching articles", error: error.message });
  }
};

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

        res.status(200).json({ message: "Subscription deleted successfully" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

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
        res.status(500).json({ message: error.message });
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

const sendMessageToTeacher = async (req, res) => {
  const { teacherId, message } = req.body;
  const userId = req.user._id;

  try {
      const newMessage = new messageModel({ 
          sender: userId, 
          receiver: teacherId, 
          onModel: 'teacher', 
          message 
      });
      await newMessage.save();
      res.status(201).json({ message: "Message sent successfully" });
  } catch (error) {
      res.status(500).json({ message: "Failed to send message", error: error.message });
  }
};

const getConversationHistory = async  (req, res)=> {
  const { userId, teacherId } = req.params;

  try {
      const conversationMessages = await messageModel.find({
          $or: [
              { sender: userId, receiver: teacherId, onModel: 'teacher' },
              { sender: teacherId, receiver: userId, onModel: 'user' }
          ]
      }).sort({ createdAt: 'asc' });

      res.status(200).json(conversationMessages);
  } catch (error) {
      console.error(`Error fetching conversation history: ${error.message}`);
      res.status(500).send({
          message: "Unable to retrieve conversation history due to a server error.",
          error: error.message
      });
  }
};

const deleteuser = async (req, res) => {
  const {email} = req.body; 
  if (!email) {
      return res.status(400).json({ message: "Email is required" });
  }

  try {
      const user = await userModel.findOne({ email: email });
      if (!user) {
          return res.status(404).json({ message: "User not found" });
      }

      await userModel.deleteOne({ email: email });
      res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ message: "Error deleting user", error: error.message });
  }
};

const forgetpassword = async(req,res)=>{

  try{

  const {code,email,newpassword}=req.body;
  const hash = await bcrypt.hash(newpassword,parseInt(process.env.saltRound));
  const user = await userModel.findOneAndUpdate({email:email,sendcode:code},{password:hash});
  const userupdate = await userModel.findOneAndUpdate({email:email},{sendcode:null});

  if(!user){
      res.status(404).json({message:'Password update failed'}) 
  }else{

      res.status(200).json({message:'The password has been updated successfully'})

  }}catch{

      res.status(500).status(500).json({messge:'catch'}) 
  }
};

const sendcode = async (req,res)=>{

  try{
  const {email}= req.body;
  const user = await userModel.findOne({email});
  if(!user){

      res.status(404).json({message:'invalid email'});

  }else{

      const code = nanoid(6);

      let message = `<!-- © 2018 Shift Technologies. All rights reserved. -->
      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout:fixed;background-color:#f9f9f9" id="bodyTable">
        <tbody>
          <tr>
            <td style="padding-right:10px;padding-left:10px;" align="center" valign="top" id="bodyCell">
              <table border="0" cellpadding="0" cellspacing="0" width="100%" class="wrapperWebview" style="max-width:600px">
                <tbody>
                  <tr>
                    <td align="center" valign="top">
                      <table border="0" cellpadding="0" cellspacing="0" width="100%">
                        <tbody>
                          <tr>
                            <td style="padding-top: 20px; padding-bottom: 20px; padding-right: 0px;" align="right" valign="middle" class="webview"> <a href="#" style="color:#bbb;font-family:'Open Sans',Helvetica,Arial,sans-serif;font-size:12px;font-weight:400;font-style:normal;letter-spacing:normal;line-height:20px;text-transform:none;text-align:right;text-decoration:underline;padding:0;margin:0" target="_blank" class="text hideOnMobile">Oh wait, there's more! →</a>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table border="0" cellpadding="0" cellspacing="0" width="100%" class="wrapperBody" style="max-width:600px">
                <tbody>
                  <tr>
                    <td align="center" valign="top">
                      <table border="0" cellpadding="0" cellspacing="0" width="100%" class="tableCard" style="background-color:#fff;border-color:#e5e5e5;border-style:solid;border-width:0 1px 1px 1px;">
                        <tbody>
                          <tr>
                            <td style="background-color:#00d2f4;font-size:1px;line-height:3px" class="topBorder" height="3">&nbsp;</td>
                          </tr>
                          <tr>
                            <td style="padding-top: 60px; padding-bottom: 20px;" align="center" valign="middle" class="emailLogo">
                              <a href="#" style="text-decoration:none" target="_blank">
                                <img alt="" border="0" src="http://email.aumfusion.com/vespro/img/hero-img/blue/logo.png" style="width:100%;max-width:150px;height:auto;display:block" width="150">
                              </a>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding-bottom: 20px;" align="center" valign="top" class="imgHero">
                              <a href="#" style="text-decoration:none" target="_blank">
                                <img alt="" border="0" src="http://email.aumfusion.com/vespro/img/hero-img/blue/heroGradient/user-account.png" style="width:100%;max-width:600px;height:auto;display:block;color: #f9f9f9;" width="600">
                              </a>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding-bottom: 5px; padding-left: 20px; padding-right: 20px;" align="center" valign="top" class="mainTitle">
                              <h2 class="text" style="color:#000;font-family:Poppins,Helvetica,Arial,sans-serif;font-size:28px;font-weight:500;font-style:normal;letter-spacing:normal;line-height:36px;text-transform:none;text-align:center;padding:0;margin:0">CodeCamps welcomes you."</h2>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding-bottom: 30px; padding-left: 20px; padding-right: 20px;" align="center" valign="top" class="subTitle">
                              <h4 class="text" style="color:#999;font-family:Poppins,Helvetica,Arial,sans-serif;font-size:16px;font-weight:500;font-style:normal;letter-spacing:normal;line-height:24px;text-transform:none;text-align:center;padding:0;margin:0">Password Reset</h4>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding-left:20px;padding-right:20px" align="center" valign="top" class="containtTable ui-sortable">
                              <table border="0" cellpadding="0" cellspacing="0" width="100%" class="tableDescription" style="">
                                <tbody>
                                  <tr>
                                    <td style="padding-bottom: 20px;" align="center" valign="top" class="description">
                                      <p class="text" style="color:#666;font-family:'Open Sans',Helvetica,Arial,sans-serif;font-size:14px;font-weight:400;font-style:normal;letter-spacing:normal;line-height:22px;text-transform:none;text-align:center;padding:0;margin:0">This is your code to reset your password.</p>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              <table border="0" cellpadding="0" cellspacing="0" width="100%" class="tableButton" style="">
                                <tbody>
                                  <tr>
                                    <td style="padding-top:20px;padding-bottom:20px" align="center" valign="top">
                                      <table border="0" cellpadding="0" cellspacing="0" align="center">
                                        <tbody>
                                          <tr>
                                            <td style="background-color: rgb(0, 210, 244); padding: 12px 35px; border-radius: 50px;" align="center" class="ctaButton"> <a href="#" style="color:#fff;font-family:Poppins,Helvetica,Arial,sans-serif;font-size:13px;font-weight:600;font-style:normal;letter-spacing:1px;line-height:20px;text-decoration:none;display:block" target="_blank" class="text">code :${code}</a>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                          <tr>
                            <td style="font-size:1px;line-height:1px" height="20">&nbsp;</td>
                          </tr>
                          <tr>
                            <td align="center" valign="middle" style="padding-bottom: 40px;" class="emailRegards">
                              <!-- Image and Link // -->
                              <a href="#" target="_blank" style="text-decoration:none;">
                                <img mc:edit="signature" src="http://email.aumfusion.com/vespro/img//other/signature.png" alt="" width="150" border="0" style="width:100%;
          max-width:150px; height:auto; display:block;">
                              </a>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table border="0" cellpadding="0" cellspacing="0" width="100%" class="space">
                        <tbody>
                          <tr>
                            <td style="font-size:1px;line-height:1px" height="30">&nbsp;</td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table border="0" cellpadding="0" cellspacing="0" width="100%" class="wrapperFooter" style="max-width:600px">
                <tbody>
                  <tr>
                    <td align="center" valign="top">
                      <table border="0" cellpadding="0" cellspacing="0" width="100%" class="footer">
                        <tbody>
                          <tr>
                            <td style="padding-top:10px;padding-bottom:10px;padding-left:10px;padding-right:10px" align="center" valign="top" class="socialLinks">
                              <a href="#facebook-link" style="display:inline-block" target="_blank" class="facebook">
                                <img alt="" border="0" src="http://email.aumfusion.com/vespro/img/social/light/facebook.png" style="height:auto;width:100%;max-width:40px;margin-left:2px;margin-right:2px" width="40">
                              </a>
                              <a href="#twitter-link" style="display: inline-block;" target="_blank" class="twitter">
                                <img alt="" border="0" src="http://email.aumfusion.com/vespro/img/social/light/twitter.png" style="height:auto;width:100%;max-width:40px;margin-left:2px;margin-right:2px" width="40">
                              </a>
                              <a href="#pintrest-link" style="display: inline-block;" target="_blank" class="pintrest">
                                <img alt="" border="0" src="http://email.aumfusion.com/vespro/img/social/light/pintrest.png" style="height:auto;width:100%;max-width:40px;margin-left:2px;margin-right:2px" width="40">
                              </a>
                              <a href="#instagram-link" style="display: inline-block;" target="_blank" class="instagram">
                                <img alt="" border="0" src="http://email.aumfusion.com/vespro/img/social/light/instagram.png" style="height:auto;width:100%;max-width:40px;margin-left:2px;margin-right:2px" width="40">
                              </a>
                              <a href="#linkdin-link" style="display: inline-block;" target="_blank" class="linkdin">
                                <img alt="" border="0" src="http://email.aumfusion.com/vespro/img/social/light/linkdin.png" style="height:auto;width:100%;max-width:40px;margin-left:2px;margin-right:2px" width="40">
                              </a>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding: 10px 10px 5px;" align="center" valign="top" class="brandInfo">
                              <p class="text" style="color:#bbb;font-family:'Open Sans',Helvetica,Arial,sans-serif;font-size:12px;font-weight:400;font-style:normal;letter-spacing:normal;line-height:20px;text-transform:none;text-align:center;padding:0;margin:0">©&nbsp;CodeCamps  Inc. | 800 Broadway, Suite 1500 | New York, NY 000123, USA.</p>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding: 0px 10px 20px;" align="center" valign="top" class="footerLinks">
                              <p class="text" style="color:#bbb;font-family:'Open Sans',Helvetica,Arial,sans-serif;font-size:12px;font-weight:400;font-style:normal;letter-spacing:normal;line-height:20px;text-transform:none;text-align:center;padding:0;margin:0"> <a href="#" style="color:#bbb;text-decoration:underline" target="_blank">View Web Version </a>&nbsp;|&nbsp; <a href="#" style="color:#bbb;text-decoration:underline" target="_blank">Email Preferences </a>&nbsp;|&nbsp; <a href="#" style="color:#bbb;text-decoration:underline" target="_blank">Privacy Policy</a>
                              </p>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding: 0px 10px 10px;" align="center" valign="top" class="footerEmailInfo">
                              <p class="text" style="color:#bbb;font-family:'Open Sans',Helvetica,Arial,sans-serif;font-size:12px;font-weight:400;font-style:normal;letter-spacing:normal;line-height:20px;text-transform:none;text-align:center;padding:0;margin:0">If you have any quetions please contact us <a href="#" style="color:#bbb;text-decoration:underline" target="_blank">support@mail.com.</a>
                                <br> <a href="#" style="color:#bbb;text-decoration:underline" target="_blank">Unsubscribe</a> from our mailing lists</p>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding-top:10px;padding-bottom:10px;padding-left:10px;padding-right:10px" align="center" valign="top" class="appLinks">
                              <a href="#Play-Store-Link" style="display: inline-block;" target="_blank" class="play-store">
                                <img alt="" border="0" src="http://email.aumfusion.com/vespro/img/app/play-store.png" style="height:auto;margin:5px;width:100%;max-width:120px" width="120">
                              </a>
                              <a href="#App-Store-Link" style="display: inline-block;" target="_blank" class="app-store">
                                <img alt="" border="0" src="http://email.aumfusion.com/vespro/img/app/app-store.png" style="height:auto;margin:5px;width:100%;max-width:120px" width="120">
                              </a>
                            </td>
                          </tr>
                          <tr>
                            <td style="font-size:1px;line-height:1px" height="30">&nbsp;</td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td style="font-size:1px;line-height:1px" height="30">&nbsp;</td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>`;

      await sendEmail(email,'Update password',message);
      const updateuser = await userModel.updateOne({_id:user._id},{sendcode:code});
      if(!updateuser){
          res.status(404).json({message:'invalid code'});
      }else{
          res.status(200).json({message:'The code has been sent successfully'});
      }
  }}catch(error){

    res.status(500).json({message:'error catch', error: error.message});
  }
};

const update =  async (req, res) => {
  const { id } = req.params; 

  const allowedUpdates = ['userName', 'age', 'gender', 'profilePic'];
  const updates = {};

  allowedUpdates.forEach((field) => {
    if (req.body.hasOwnProperty(field)) {
      updates[field] = req.body[field];
    }
  });

  try {
    const user = await userModel.findById(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    Object.keys(updates).forEach((update) => {
      user[update] = updates[update];
    });

    await user.save(); 

    res.status(200).json({ message: 'User updated successfully', user });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Failed to update user', error: error.message });
  }
};

const viewproduct = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.send(products);
  } catch (error) {
    res.status(500).send();
  }
};

const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user._id;

    let cart = await cartModel.findOne({ user: userId });
    if (!cart) {
      cart = new cartModel({
        user: userId,
        products: [],
        totalPrice: 0
      });
    }

    const product = await productModel.findById(productId);
    if (!product || product.stockQuantity < quantity) {
      return res.status(400).json({ message: 'Product not available or insufficient stock.' });
    }

    const productIndex = cart.products.findIndex(item => item.product.toString() === productId);
    if (productIndex > -1) {

      cart.products[productIndex].quantity += quantity;
    } else {

      cart.products.push({ product: productId, quantity });
    }

    cart.totalPrice += product.price * quantity;

    await cart.save();

    res.status(200).json({ message: 'Product added to cart successfully', cart });
  } catch (error) {
    console.error('Failed to add product to cart:', error);
    res.status(500).json({ message: 'Failed to add product to cart', error: error.toString() });
  }
};

const viewCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const cart = await cartModel.findOne({ user: userId })
                                .populate('products.product', 'name price description')
                                .exec();

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found.' });
    }

    res.status(200).json({ cart });
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ message: 'Failed to fetch cart', error: error.toString() });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body; 
    const userId = req.user._id;

    let cart = await cartModel.findOne({ user: userId }).populate('products.product');
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found.' });
    }

    const productIndex = cart.products.findIndex(item => item.product._id.toString() === productId);
    if (productIndex === -1) {
      return res.status(404).json({ message: 'Product not found in cart.' });
    }

    if (quantity && cart.products[productIndex].quantity > quantity) {
      cart.products[productIndex].quantity -= quantity;
    } else {
      cart.products.splice(productIndex, 1); 
    }

    cart.totalPrice = cart.products.reduce((total, currentItem) => {
      return total + (currentItem.quantity * currentItem.product.price); 
    }, 0);

    await cart.save();

    res.status(200).json({ message: 'Item removed from cart successfully', cart });
  } catch (error) {
    console.error('Failed to remove product from cart:', error);
    res.status(500).json({ message: 'Failed to remove product from cart', error: error.toString() });
  }
};

const makeorder = async (req, res) => {
  try {
    const userId = req.user._id;

    const cart = await cartModel.findOne({ user: userId });
    if (!cart || cart.products.length === 0) {
      return res.status(400).json({ message: 'Your cart is empty.' });
    }

    const orderProducts = await Promise.all(cart.products.map(async (item) => {
      const product = await productModel.findById(item.product);
      if (!product) {
        throw new Error(`Product with ID ${item.product} not found`);
      }
      if (product.stockQuantity < item.quantity) {
        throw new Error(`Not enough stock for product with ID ${item.product}`);
      }

      const priceForProduct = product.price * item.quantity;
      product.stockQuantity -= item.quantity; 
      await product.save();

      return { product: item.product, quantity: item.quantity, priceForProduct };
    }));

    const order = new orderModel({
      user: userId,
      products: orderProducts,
      totalPrice: cart.totalPrice,
      paymentStatus: 'pending'
    });

    await order.save();

    await cartModel.findByIdAndDelete(cart._id);

    res.status(201).json({ message: 'Order created successfully', order });
  } catch (error) {
    console.error('Failed to create order:', error);
    res.status(500).json({ message: 'Failed to create order', error: error.toString() });
  }
};

const myorders  = async (req, res) => {
  try {
    const orders = await orderModel.find({ user: req.user._id })
                                   .populate('products.product', 'name price') 
                                   .exec();

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: 'No orders found.' });
    }

    res.status(200).json({ orders });
  } catch (error) {
    console.error('Error fetching order history:', error);
    res.status(500).json({ message: 'Failed to fetch order history', error: error.toString() });
  }
};

module.exports={userconfirmEmailbycode,viewproduct,myorders,addToCart,removeFromCart,viewCart,sendcode,update,makeorder,forgetpassword,sendMessageToTeacher,userSignup,subscribeToCourse,viwearticle,viewSubscribedCourses,viwebooks,deleteCourse,submitReview,submitSolution,userconfirmEmail,deleteuser,getConversationHistory}