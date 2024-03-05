const methods = ['body','params','headers','query'];

const validation = (shcema)=>{
    let validarray = []

    return (req,res,next)=>{

        methods.forEach(key=>{

            if(shcema[key]){
                const valid = shcema[key].validate(req[key],{abortEarly:false});

                if(valid?.error?.details){
                    validarray.push(valid.error.details)
                    
                }

            }
        })
 
        if(validarray.length > 0){
            res.json({message:'validation error',err:validarray});

        }else{
            next();
        }

    
    }
} 

module.exports={validation}   

