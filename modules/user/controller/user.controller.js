let bcrypt = require('bcryptjs');
let jwt = require('jsonwebtoken');
const { userModel } = require("../../../DB/model/user.model");

const userSignup = async (req,res)=>{


    const {name,email,password,age,gender}= req.body;

    try{
    const user = await userModel.findOne({email:email});

    if(user){

        res.status(409).json({message:"email exist"})
    }else{

        const hashPassword = await bcrypt.hash(password,parseInt(process.env.saltRound));
        const newUser = new userModel({email:email,userName:name, password:hashPassword,age:age,gender:gender});
        const savedUser = await newUser.save();

        if(!savedUser){
            res.status(400).json({message:"fail to signup"});
        }else{
            res.status(201).json({message:"done signUp"});
        }
    }}catch{
        res.status(400).json({err:error.message})


    }

}

 
const userLogin = async (req,res)=>{

    const{email,password} = req.body;
    try{
    const user = await userModel.findOne({email});

    if(!user){
        res.json({message:"invalid account"});
    }else{

        const match = await bcrypt.compare(password,user.password);

        if(!match){

            res.json({message:"invalid password"});


        }else{
            const token = jwt.sign({id:user._id},process.env.logintoken,{expiresIn:60*60*24});


            res.json({message:"done signin ",token});


        }

    }}catch{
        res.status(400).json({err:error.message})

    }


}

  
module.exports={userSignup,userLogin}