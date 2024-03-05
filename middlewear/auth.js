let jwt = require('jsonwebtoken');
const {userModel}= require('../DB/model/user.model');


const auth= ()=>{

    return async (req,res,next)=>{

        let {token}= req.headers;
        if(!token.startsWith(process.env.startToken)){

            res.json({message:"error token"})
        }else{

            token = token.split(process.env.startToken)[1];
            const decoded =await jwt.verify(token,process.env.logintoken);
            const user = await userModel.findById(decoded.id);
            req.user= user;
            next();

        }
        
    }
}

module.exports={auth} 