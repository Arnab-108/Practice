const express = require("express")
const {userModel} = require("../model/user.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const userRouter = express.Router()
require("dotenv").config()
userRouter.post("/register",(req,res)=>{
    const {name,email,password,city,age} = req.body
    try {
        bcrypt.hash(password,5,async(err,hash)=>{
            if(err){
                res.send({err:err.message})
            }
            else{
                const user = new userModel({name,email,password:hash,city,age})
                await user.save()
                res.send({msg:"User has been registered",user:req.body})
            }
        })
        
    } catch (error) {
        res.send({err:error.message})
    }
})

userRouter.post("/login",async(req,res)=>{
    const {email,password} = req.body
    try {
        const user = await userModel.findOne({email:email})
        if(user){
            bcrypt.compare(password,user.password,async(err,result)=>{
                if(result){
                    let token = jwt.sign({userID:user._id,user:user.name},process.env.secret,{
                        expiresIn:"2d"
                    })
                    res.send({msg:"Logged In",token:token})
                }else{
                    res.status(400).send({err:"Provide the correct password!"})
                }
            })
        }
        else{
            res.status(400).send({msg:"User does not exists!"})
        }

    } catch (error) {
        res.send({err:error})
    }
})

module.exports={userRouter}