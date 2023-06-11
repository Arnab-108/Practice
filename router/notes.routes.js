const express = require("express")
const {notesModel} = require("../model/notes.model")
const {auth}=require("../middleware/auth.middleware")
const notesRoutes = express.Router()

notesRoutes.use(auth)

notesRoutes.get("/",async(req,res)=>{
    try {
        const notes = await notesModel.find({userID:req.body.userID})
        res.send(notes)
    } catch (error) {
        res.send({err:error})
    }
})

notesRoutes.post("/add",async(req,res)=>{
    try {
        const note = new notesModel(req.body)
        await note.save()
        res.send({msg:"A new note is added!",note:req.body})
    } catch (error) {
        res.send({error:error})
    }
})

notesRoutes.patch("/update/:id",async(req,res)=>{
    const {id} = req.params
    const note = await notesModel.findOne({_id:id})
    try {
        if(req.body.userID!==note.userID){
            res.send({err:error.message})
        }
        else{
            await notesModel.findByIdAndUpdate({_id:id},req.body)
            res.send({msg:`${id} is Updated`})
        }
    } catch (error) {
        res.send({err:error.message})
    }
})

notesRoutes.delete("/delete/:id",async(req,res)=>{
    const {id} = req.params
    const note = await notesModel.findOne({_id:id})
    try {
        if(req.body.userID!==note.userID){
            res.send({err:"Something went wrong!"})
        }
        else{
            await notesModel.findByIdAndDelete({_id:id})
            res.send({msg:`${id} is Deleted`})
        }
    } catch (error) {
        res.send({err:error.message})
    }
})


module.exports = {notesRoutes}