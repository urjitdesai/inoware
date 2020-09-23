require('dotenv').config()
const cors=require("cors")
const express= require('express')
const app=express()
const userRouter= require("./api/users/user.router")

app.use(express.json())
app.use(cors())
app.use("/api/users", userRouter)
// app.get("/api", (req,res)=>{
//     res.json({
//         success: 1,
//         message: "This is rest api working"
//     })
// })
console.log(process.env.APP_PORT);
app.listen(process.env.APP_PORT, ()=> {
    console.log("Server running on", process.env.APP_PORT);
})