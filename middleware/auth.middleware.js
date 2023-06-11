const jwt = require("jsonwebtoken")
require("dotenv").config()
const auth = (req,res,next)=>{
    const token = req.headers.authorization?.split(" ")[1]
    if(token){
        try {
            const decoded  = jwt.verify(token,process.env.secret)
            if(decoded){
                console.log(decoded)
                req.body.userID = decoded.userID
                req.body.user = decoded.user
                next()
            }
            else{
                res.send({msg:"Not Authorized!!"})
            }
        } catch (error) {
            res.send({err:error.message})
        }
    }
    else{
        res.send({msg:"Please login first!"})
    }
}

module.exports={auth}