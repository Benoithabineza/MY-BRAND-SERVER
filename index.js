import express from  'express'
import mongoose from 'mongoose'
import Blog from "./blogModel.js"

const app=express()
app.use(express.json())
mongoose.connect('mongodb://localhost/blog',{useNewUrlParser:true,useUnifiedTopology:true}).then(console.log("database connected"))


app.post("/create",(req,res)=>{
    const post =Blog.create({
        title:req.body.title,
        body:req.body.body,
        picture:"",
        time:Date.now(),
        likes:0,
        views:0,


    }).then((post)=>{
        res.status(201).json({
            success:true,
            post:post
        })
    }).catch(error=>{
        console.log(error)
        res.status (500).json({
            success:false,
            message:"fail to create a user",
        })
    })



    
})


app.listen (3000 , console.log('server is on'))
