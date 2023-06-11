const express = require("express")
const {connection} = require("./db")
const {userRouter} = require("./router/user.router")
const {notesRoutes} = require("./router/notes.routes")
const cors = require("cors")
const app = express()
app.use(express.json())
app.use(cors())
app.use("/users",userRouter)
app.use("/notes",notesRoutes)



app.listen(8080,async()=>{
    try {
        await connection
        console.log("Connected to the DB!")
        console.log("server is running at port 8080")
    } catch (error) {
        console.log(error)

    }
   
})