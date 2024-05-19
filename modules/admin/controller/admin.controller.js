let bcrypt = require('bcryptjs');
let jwt = require('jsonwebtoken');
const { adminModel } = require("../../../DB/model/Admin.model");
const { courseModel } = require("../../../DB/model/course.model");
const { articleModel } = require("../../../DB/model/article.model");
const { QuizModel } = require("../../../DB/model/quiz.model");
const { userModel } = require("../../../DB/model/user.model");
const { Image } = require("../../../DB/model/images.model");
const { teacherModel } = require("../../../DB/model/Teacher.model");
const { productModel } = require("../../../DB/model/product.model");
const { sendEmail } = require('../../../services/SendEmail');

const adminSignup = async (req,res)=>{

    const {name,email,password}= req.body;

    try{
    const admin = await adminModel.findOne({email:email});

    if(admin){

        res.status(409).json({message:"Email already exists"})
    }else{

        const hashPassword = await bcrypt.hash(password,parseInt(process.env.saltRound));
        const newAdmin = new adminModel({email:email,userName:name, password:hashPassword});
        const savedAdmin = await newAdmin.save();

        if(!savedAdmin){
            res.status(400).json({message:"Registration failed"});
        }else{

            const token = jwt.sign({id:savedAdmin._id},process.env.logintoken,{expiresIn:'48h'} );

            res.status(201).json({message:"An account has been created successfully",token})
        }
 
    }}catch(error){
        res.status(400).json({message:"error catch", error: error.message });

    }
}
  
const adminLogin = async (req,res)=>{

    const{email,password} = req.body;
    console.log(req.body)
    try{
    const admin = await adminModel.findOne({email});
  
    if(!admin){
        res.json({message:"invalid account"});
    }else{


        const match = await bcrypt.compare(password,admin.password);

        if(!match){

            res.status(400).json({message:"invalid password"});


        }else{
            const token = jwt.sign({id:admin._id},process.env.logintoken,{expiresIn:60*60*24});


            res.status(200).json({message:"done signin ",token,name:admin.userName});


        }

    }}catch{
        res.status(400).json({err:error.message})

    }


}

const adminconfirmEmail = async(req,res)=>{

    try{

    const{token} = req.params;
    const decoded = jwt.verify(token,process.env.logintoken);

    if(!decoded){

        res.status(400).json({message:"invalid token"})
    }else{

        const admin = await adminModel.findByIdAndUpdate({_id:decoded.id,confirmEmail:false},{confirmEmail:true});
        if(!admin){

            res.status(400).json({message:"account already confirmed"})
        }else{

            res.status(200).json({message:"email confirmed Thx"})

        }
    }}catch(error){
        res.status(400).json({message:"error catch", error: error.message})

    }

}

const addcourse = async (req, res) => {
  const { courseName, Description, maximum, price, location, present,CriditHoure } = req.body;
  const adminId = req.admin._id; 

    try {
        const newcourse = new courseModel({ courseName:courseName, Description:Description,maximum:maximum,price:price,location:location,present:present,CriditHoure:CriditHoure,admin: adminId });
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
    const adminId = req.admin._id; 

    try {
        const newartical = new articleModel({ articleName:articleName, Description:Description,admin: adminId });
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

const approveCourse = async (req, res) => {
    const { courseId } = req.params;
    try {
        const course = await courseModel.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }
        
        course.isApproved = true;
        await course.save();

        res.status(200).json({ message: "Course approved successfully" });
    } catch (error) {
        console.error("Error approving course:", error);
        res.status(500).json({ message: "Error approving course", error: error.message });
    }
};
const unapproveCourse = async (req, res) => {
    const { courseId } = req.params;
    try {
        const course = await courseModel.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }
        
        course.isApproved = false;
        await course.save();

        res.status(200).json({ message: "Course approved successfully" });
    } catch (error) {
        console.error("Error approving course:", error);
        res.status(500).json({ message: "Error approving course", error: error.message });
    }
};
const addQuiz = async (req, res) => {
  try {
    const { name, description, problems } = req.body;

    if (!name || !description || !Array.isArray(problems)) {
        res.status(400).send('Missing or invalid data.');
        return;
    }

    const newQuiz = new QuizModel({
        name,
        description,
        problems
    });

    await newQuiz.save();

    res.status(201).send(newQuiz);
} catch (error) {
    res.status(500).send('Server error: ' + error.message);
}
};

const viewAllUsersAndTeachersAndCourses = async (req, res) => {
    try {
        const users = await userModel.find({}, 'userName _id mainImage').populate('mainImage').lean(); 
        const teachers = await teacherModel.find({}, 'teacherName _id mainImage').populate('mainImage').lean();
        const courses = await courseModel.find({}, 'courseName _id mainImage coverImage isApproved').populate('mainImage').populate('coverImage').lean();

        const summary = {
            totalUsers: users.length,
            totalTeachers: teachers.length,
            totalCourses: courses.length,
            users: users.map(user => ({ 
                id: user._id, 
                name: user.userName,
                mainImage: user.mainImage ? { data: user.mainImage.data.toString('base64'), contentType: user.mainImage.contentType } : null,
            })),
            teachers: teachers.map(teacher => ({ 
                id: teacher._id, 
                name: teacher.teacherName,
                mainImage: teacher.mainImage ? { data: teacher.mainImage.data.toString('base64'), contentType: teacher.mainImage.contentType } : null,
            })),
            courses: courses.map(course => {
                // Create the course object
                const courseObj = { 
                    id: course._id, 
                    name: course.courseName,
                    mainImage: course.mainImage ? { 
                        data: course.mainImage.data.toString('base64'), 
                        contentType: course.mainImage.contentType 
                    } : null,
                    coverImage: course.coverImage ? { 
                        data: course.coverImage.data.toString('base64'), 
                        contentType: course.coverImage.contentType 
                    } : null,
                    isApproved: course.isApproved
                };
            
                return courseObj;
            })
            
        };

        res.status(200).json(summary);
    } catch (error) {
        console.error("Error fetching users and teachers summary:", error);
        res.status(500).json({ message: "Error retrieving data", error: error.message });
    }
};


const addProduct = async (req, res) => {

    const { name, description, price, category, stockQuantity, imageType,base64Data} = req.body;
    
    if (!name || price === undefined || !category || stockQuantity === undefined || !imageType ||!base64Data) {
      return res.status(400).json({ message: 'Please provide name, price, category, stock quantity, and image file.' });
    }
  
    try {
      // Save the image file to the database
      const image = new Image({
        data: base64Data,
        contentType:imageType
      });
      await image.save();
  
      // Save the product with the image reference
      const product = new productModel({
        name,
        description,
        price,
        category,
        stockQuantity,
        image: image._id // Use the image ID as a reference
      });
  
      await product.save();
      res.status(201).json({ message: 'Product added successfully', product });
    } catch (error) {
      console.error('Error adding product:', error);
      res.status(500).json({ message: 'Failed to add product', error: error.message });
    }
  };
  

const deleteproduct = async (req, res) => {

  const { id } = req.params; 

  try {
    const deletedProduct = await productModel.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    res.status(200).json({ message: 'Product deleted successfully.' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Failed to delete product', error: error.message });
  }
};

const updateproduct = async (req, res) => {

  const { id } = req.params; 
  const updates = {};
  const allowedUpdates = ['name', 'description', 'price', 'category', 'stockQuantity', 'images'];
  
  allowedUpdates.forEach((field) => {
    if (req.body.hasOwnProperty(field)) {
      updates[field] = req.body[field];
    }
  });

  try {
    const product = await productModel.findById(id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    Object.keys(updates).forEach((update) => {
      product[update] = updates[update];
    });

    await product.save(); 

    res.status(200).json({ message: 'Product updated successfully', product });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Failed to update product', error: error.message });
  }
};

module.exports={unapproveCourse,adminSignup,adminLogin,addProduct,deleteproduct,updateproduct,approveCourse,addcourse,addarticle,addQuiz,viewAllUsersAndTeachersAndCourses,adminconfirmEmail}