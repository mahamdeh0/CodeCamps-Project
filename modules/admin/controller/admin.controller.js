let bcrypt = require('bcryptjs');
let jwt = require('jsonwebtoken');
const { adminModel } = require("../../../DB/model/Admin.model");

const adminSignup = async (req,res)=>{


    const {name,email,password,age,gender}= req.body;

    try{
    const admin = await adminModel.findOne({email:email});

    if(admin){

        res.status(409).json({message:"email exist"})
    }else{

        const hashPassword = await bcrypt.hash(password,parseInt(process.env.saltRound));
        const newAdmin = new adminModel({email:email,userName:name, password:hashPassword,age:age,gender:gender});
        const savedUser = await newAdmin.save();

        if(!savedUser){
            res.status(400).json({message:"fail to signup"});
        }else{
            res.status(201).json({message:"done signUp"});
        }
    }}catch{
        res.status(400).json({err:error.message})


    }

}

 
const adminLogin = async (req,res)=>{

    const{email,password} = req.body;
    try{
    const admin = await adminModel.findOne({email});

    if(!admin){
        res.json({message:"invalid account"});
    }else{

        const match = await bcrypt.compare(password,admin.password);

        if(!match){

            res.json({message:"invalid password"});


        }else{
            const token = jwt.sign({id:admin._id},process.env.logintoken,{expiresIn:60*60*24});


            res.json({message:"done signin ",token});


        }

    }}catch{
        res.status(400).json({err:error.message})

    }


}


module.exports={adminSignup,adminLogin}