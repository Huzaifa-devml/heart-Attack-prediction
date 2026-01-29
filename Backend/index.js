import express from 'express'
import cors from'cors'
import mongoose from "mongoose"
import dotenv from"dotenv"
import cookieParser from 'cookie-parser'
import authRoutes from "./routes/authRoutes.js"
import {spawn} from 'child_process'
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



dotenv.config()
const app=express()
app.use(cors({
origin: (origin, callback) => {
    // allow requests with no origin (like Postman)
    if (!origin) return callback(null, true);

    // allow localhost
    if (origin.startsWith("http://localhost")) {
      return callback(null, true);
    }

    // allow ALL vercel preview + prod domains
    if (origin.endsWith(".vercel.app")) {
      return callback(null, true);
    }

    // block everything else
    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
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
    const pythonprocess=spawn("python3",[
        path.join(__dirname,"predict.py"),
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
        const finalresult=result.trim()
        if(!finalresult){
            console.error("empty prediction from python")
            return res.status(500).json({prediction:"error"})
        }
        res.json({prediction:finalresult})
    })
})


const PORT=process.env.PORT || 3000;
app.listen(PORT,()=>{
console.log(`SERVER RUNNING ON ${PORT}`)
})