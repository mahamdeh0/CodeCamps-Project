let bcrypt = require('bcryptjs');
let jwt = require('jsonwebtoken');
const { teacherModel } = require("../../../DB/model/Teacher.model");
const { courseModel } = require("../../../DB/model/course.model");
const { articleModel } = require("../../../DB/model/article.model");
const { ReviewModel } = require("../../../DB/model/review.model");
const { BookModel } = require("../../../DB/model/book.model");
const { messageModel } = require("../../../DB/model/message.model");
const { productModel } = require("../../../DB/model/product.model");
const { orderModel } = require("../../../DB/model/order.model");
const { cartModel } = require("../../../DB/model/cart.model");
const { sendEmail } = require('../../../services/SendEmail');
const { nanoid } = require('nanoid');

const teacherSignup = async (req,res)=>{

    const {name,email,password,nationality,Experience,gender,phone,age}= req.body;

    try{
    const teacher = await teacherModel.findOne({email:email});

    if(teacher){

        res.status(409).json({message:"email exist"})
    }else{

        const hashPassword = await bcrypt.hash(password,parseInt(process.env.saltRound));
        const newTeacher = new teacherModel({email:email,teacherName:name, password:hashPassword,nationality:nationality,Experience:Experience,gender:gender,phone:phone,age:age});
        const savedTeacher = await newTeacher.save();

        if(!savedTeacher){
            res.status(400).json({message:"Registration failed"});
        }else{

            const token = jwt.sign({id:savedTeacher._id},process.env.logintoken,{expiresIn:'48h'} );
            const code = nanoid(6);

            let message = `
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
                          <a href="${req.protocol}://${req.headers.host}${process.env.BaseUrl}/Teacher/confirmEmail/${token}" target="_blank" style="display: inline-block; padding: 16px 36px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; color: #ffffff; text-decoration: none; border-radius: 6px;">Verify Email</a>
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
            const userupdate = await teacherModel.findOneAndUpdate({email:email},{sendcode:code});

            res.status(201).json({message:"An account has been created successfully"})
        }
 
    }}catch (error){
        res.status(400).json({message:"error catch",error: error.message });


    }
};

const getTeacherdata=async(req,res)=>{
  const{email} = req.body;
  console.log(email)
  try{
  const user = await teacherModel.findOne({email});

  if(!user){
      res.json({message:"invalid account"});
  }else{
    res.json(user);
  }}catch{
          res.status(500).json({message:"done signin "});
  }

}

const teacherconfirmEmail = async(req,res)=>{

    try{

    const{token} = req.params;
    const decoded = jwt.verify(token,process.env.logintoken);

    if(!decoded){

        res.status(400).json({message:"invalid token"})
    }else{

        const teacher = await teacherModel.findByIdAndUpdate({_id:decoded.id,confirmEmail:false},{confirmEmail:true});
        if(!teacher){

            res.status(400).json({message:"account already confirmed"})
        }else{

            res.status(200).json({message:"email confirmed Thx"})

        }
    }}catch(error){
        res.status(400).json({message:"error catch",error: error.message})

    }

};

const userconfirmEmailbycode = async(req,res)=>{

  const {code}=req.body;

  try{

    const user = await teacherModel.findOneAndUpdate({sendcode:code,confirmEmail:false},{confirmEmail:true});
    const userupdate = await teacherModel.findOneAndUpdate({sendcode:code},{sendcode:null});
    
    if(!user){
            res.status(400).json({message:"account already confirmed"})
        }else{

            res.status(200).json({message:"email confirmed Thx"})
        }
    }catch(error){
      res.status(500).json({ message: "Error ", error: error.message });
    }
};

const addcourse = async (req, res) => {
    const { courseName, Description, maximum, price, location, present } = req.body;
    const teacherId = req.teacher._id; 

    try {
        const newcourse = new courseModel({ courseName:courseName, Description:Description,maximum:maximum,price:price,location:location,present:present,teacher: teacherId });
        const savedcourse = await newcourse.save();
        if(savedcourse){
        res.status(201).json({ message: "Course successfully saved" });
    }else{
        res.status(500).json({ message: "Error saving course" });

    }
    } catch (error) {
        console.error("Error saving course:", error);
        res.status(500).json({ message: "Error saving course", error: error.message });
    }
};
 
const addarticle = async (req, res) => {
    const { articleName, Description } = req.body;
    const teacherId = req.teacher._id; 

    try {
        const newartical = new articleModel({ articleName:articleName, Description:Description,teacher: teacherId });
        const savedarticle= await newartical.save();
        if(savedarticle){
        res.status(201).json({ message: "article successfully saved" });
    }else{
        res.status(500).json({ message: "Error saving article" });

    }
    } catch (error) {
        console.error("Error saving article:", error);
        res.status(500).json({ message: "Error saving article", error: error.message });
    }
};

const addBook = async (req, res) => {
  try {
      const { title, author, publicationYear } = req.body;
      const teacherId = req.teacher._id;
      const pdfContent = req.file.buffer; 

      const newBook = new BookModel({ 
          title,
          author,
          publicationYear,
          pdfContent,
          teacher: teacherId
      });

      await newBook.save();
      res.status(201).json({ message: "Book successfully added" });
  } catch (error) {
      console.error("Error adding book:", error);
      res.status(500).json({ message: "Error adding book", error: error.message });
  }
};

const viewTeacherRating = async (req, res) => {
    const teacherId = req.teacher._id; 

    try {
        const courses = await courseModel.find({ teacher: teacherId });
        if (!courses.length) {
            return res.status(404).json({ message: "No courses found for this teacher." });
        }

        const courseIds = courses.map(course => course._id);

        const reviews = await ReviewModel.find({ course: { $in: courseIds } });

        if (reviews.length) {
            const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
            return res.status(200).json({ 
                message: "Average rating fetched successfully.",
                averageRating: averageRating.toFixed(2), // Optional: Rounds to 2 decimal places
                numberOfReviews: reviews.length
            });
        } else {
            return res.status(404).json({ message: "No reviews found for this teacher's courses." });
        }
    } catch (error) {
        console.error("Error fetching teacher rating:", error);
        res.status(500).json({ message: "Error fetching teacher rating", error: error.message });
    }
};

const viewCourses = async (req, res) => {
    const teacherId = req.teacher._id;

    try {
        const courses = await courseModel.find({ teacher: teacherId });

        if (courses.length > 0) {
            res.status(200).json({
                message: "Courses fetched successfully.",
                courses: courses.map(course => ({
                    id: course._id,
                    name: course.courseName,
                    description: course.Description,
                    maximum: course.maximum,
                    price: course.price,
                    location: course.location,
                    present: course.present
                }))
            });
        } else {
            res.status(404).json({ message: "No courses found for this instructor." });
        }
    } catch (error) {
        console.error("Error fetching instructor courses:", error);
        res.status(500).json({ message: "Error fetching instructor courses", error: error.message });
    }
};

const sendMessageToUser = async (req, res) => {
  const { userId, message } = req.body;
  const teacherId = req.teacher._id;

  try {
      const newMessage = new messageModel({ 
          sender: teacherId, 
          receiver: userId, 
          onModel: 'user', 
          message 
      });
      await newMessage.save();
      res.status(201).json({ message: "Message sent successfully" });
  } catch (error) {
      res.status(500).json({ message: "Failed to send message", error: error.message });
  }
};

const getConversationHistory = async (req, res) => {
  const { teacherId, userId } = req.params;

  try {
      const conversationMessages = await messageModel.find({
          $or: [

              { sender: teacherId, receiver: userId, onModel: 'user' },
              { sender: userId, receiver: teacherId, onModel: 'teacher' }]

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

const deleteteacher= async (req, res) => {
  const {email} = req.body; 
  if (!email) {
      return res.status(400).json({ message: "Email is required" });
  }

  try {
      const teacher = await teacherModel.findOne({ email: email });
      if (!teacher) {
          return res.status(404).json({ message: "teacher not found" });
      }

      await teacherModel.deleteOne({ email: email });
      res.status(200).json({ message: "teacher deleted successfully" });
  } catch (error) {
      console.error('Error deleting teacher:', error);
      res.status(500).json({ message: "Error deleting teacher", error: error.message });
  }
};

const forgetpassword = async(req,res)=>{

  try{

  const {code,email,newpassword}=req.body;
  const hash = await bcrypt.hash(newpassword,parseInt(process.env.saltRound));
  const user = await teacherModel.findOneAndUpdate({email:email,sendcode:code},{password:hash});
  const userupdate = await teacherModel.findOneAndUpdate({email:email},{sendcode:null});

  if(!user){
      res.json({message:'Password update failed'}) 
  }else{

      res.status(200).json({message:'The password has been updated successfully'})

  }}catch{

      res.status(500).json({messge:'catch'}) 
  }
};

const sendcode = async (req,res)=>{


  try{

  const {email}= req.body;
  const user = await teacherModel.findOne({email});
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
      updateuser = await teacherModel.updateOne({_id:user._id},{sendcode:code});
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

  const allowedUpdates = ['teacherName', 'age', 'gender', 'profilePic', 'Experience', 'nationality', 'achievements', 'phone'];
  const updates = {};

  allowedUpdates.forEach((field) => {
    if (req.body.hasOwnProperty(field)) {
      updates[field] = req.body[field];
    }
  });

  try {
    const teacher = await teacherModel.findById(id);

    if (!teacher) {
      return res.status(404).json({ message: 'teacher not found.' });
    }

    Object.keys(updates).forEach((update) => {
      teacher[update] = updates[update];
    });

    await teacher.save(); 

    res.status(200).json({ message: 'teacher updated successfully', teacher });
  } catch (error) {
    console.error('Error updating teacher:', error);
    res.status(500).json({ message: 'Failed to update teacher', error: error.message });
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
    const teacherId = req.teacher._id;

    let cart = await cartModel.findOne({ teacher: teacherId });
    if (!cart) {
      cart = new cartModel({
        teacher: teacherId,
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
    const teacherId = req.teacher._id;
    const cart = await cartModel.findOne({ teacher: teacherId })
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
    const teacherId = req.teacher._id;

    let cart = await cartModel.findOne({ teacher: teacherId }).populate('products.product');
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
    const teacherId = req.teacher._id;

    const cart = await cartModel.findOne({ teacher: teacherId });
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
      teacher: teacherId,
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
    const orders = await orderModel.find({ teacher: req.teacher._id })
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

module.exports={teacherSignup,forgetpassword,sendcode,update,removeFromCart,viewproduct,addToCart,viewCart,makeorder,myorders,addcourse,addarticle,addBook,viewTeacherRating,viewCourses,teacherconfirmEmail,userconfirmEmailbycode,deleteteacher,getConversationHistory,sendMessageToUser,getTeacherdata}