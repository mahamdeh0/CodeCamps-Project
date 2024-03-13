let bcrypt = require('bcryptjs');
let jwt = require('jsonwebtoken');
const { teacherModel } = require("../../../DB/model/Teacher.model");
const { courseModel } = require("../../../DB/model/course.model");
const { articleModel } = require("../../../DB/model/article.model");
const { ReviewModel } = require("../../../DB/model/review.model");

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
            res.status(201).json({message:"done signUp"});
        }
    }}catch{
        res.status(400).json({err:error.message})


    }

}

const teacherLogin = async (req,res)=>{

    const{email,password} = req.body;
    try{
    const teacher = await teacherModel.findOne({email});

    if(!teacher){
        res.json({message:"invalid account"});
    }else{

        const match = await bcrypt.compare(password,teacher.password);

        if(!match){

            res.json({message:"invalid password"});


        }else{
            const token = jwt.sign({id:teacher._id},process.env.logintoken,{expiresIn:60*60*24});


            res.json({message:"done signin ",token});


        }

    }}catch{
        res.json({message:"ERROR signin "});

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


 
 
module.exports={teacherSignup ,teacherLogin,addcourse,addarticle,viewTeacherRating,viewCourses}