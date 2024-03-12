let bcrypt = require('bcryptjs');
let jwt = require('jsonwebtoken');
const { teacherModel } = require("../../../DB/model/Teacher.model");
const { courseModel } = require("../../../DB/model/course.model");

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





 
 
module.exports={teacherSignup ,teacherLogin,addcourse}