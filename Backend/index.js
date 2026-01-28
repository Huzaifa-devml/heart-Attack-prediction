import express from 'express'
import cors from'cors'
import mongoose from "mongoose"
import dotenv from"dotenv"
import cookieParser from 'cookie-parser'
import authRoutes from "./routes/authRoutes.js"
import {spawn} from 'child_process'


dotenv.config()
const app=express()
app.use(cors({
    origin:[
    "http://localhost:5173",
    "http://localhost:5174",
    "https://heart-attack-prediction-1god.vercel.app" 
    ],
    credentials:true
}))
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))
mongoose.connect(process.env.MONGO_URI).then(()=>console.log("mongodb connected"))
.catch((err)=>{
    console.error(err);
})
app.use('/api/auth',authRoutes)
app.post("/api/predict",(req,res)=>{
    console.log("predict api hit")
    const pythonprocess=spawn("python",[
        "predict.py",
        JSON.stringify(req.body)
    ])
    let result="";
    pythonprocess.stdout.on("data",(data)=>{
        result+=data.toString()
    });
    pythonprocess.stderr.on("data",(data)=>{
        console.error("python error",data.toString())
    });
    pythonprocess.on("close",()=>{
        res.json({prediction:result.trim()})
    })
})


app.listen(3000)