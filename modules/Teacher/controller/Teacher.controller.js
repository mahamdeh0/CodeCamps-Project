let bcrypt = require('bcryptjs');
let jwt = require('jsonwebtoken');
const { teacherModel } = require("../../../DB/model/Teacher.model");
const { courseModel } = require("../../../DB/model/course.model");
const { articleModel } = require("../../../DB/model/article.model");
const { ReviewModel } = require("../../../DB/model/review.model");
const { messageModel } = require("../../../DB/model/message.model");
const { sendEmail } = require('../../../services/SendEmail');

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
            res.status(400).json({message:"fail to signup"});
        }else{

            const token = jwt.sign({id:savedTeacher._id},process.env.logintoken,{expiresIn:'48h'} );

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
 
    }}catch (error){
        res.status(400).json({message:"error catch",error: error.message });


    }
}

const teacherLogin = async (req,res)=>{

    const{email,password} = req.body;
    try{
    const teacher = await teacherModel.findOne({email});

    if(!teacher){
        res.json({message:"invalid account"});
    }else{

        if(!teacher.confirmEmail){
            res.status(400).json({message:"please confirm your email first"})
    
        }else{

        const match = await bcrypt.compare(password,teacher.password);

        if(!match){

            res.status(400).json({message:"invalid password"});


        }else{
            const token = jwt.sign({id:teacher._id},process.env.logintoken,{expiresIn:60*60*24});


            res.status(200).json({message:"done signin ",token});


        }}

    }}catch{
        res.status(500).json({message:"ERROR catch "});

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
    }}catch{
        res.status(400).json({message:"error catch"})

    }

}

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

async function getConversationHistory(req, res) {
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
}

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



 
 
module.exports={teacherSignup ,teacherLogin,addcourse,addarticle,viewTeacherRating,viewCourses,teacherconfirmEmail,deleteteacher,getConversationHistory,sendMessageToUser}