let bcrypt = require('bcryptjs');
let jwt = require('jsonwebtoken');
const { teacherModel } = require("../../../DB/model/Teacher.model");

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
 
 
module.exports={teacherSignup ,teacherLogin}