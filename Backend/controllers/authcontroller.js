import bcrypt from "bcryptjs"
import User from "../models/user.js"
import jwt from "jsonwebtoken"


export const registerUser=async function(req,res){
    try{
        const{email,password,username,name}=req.body;

    
    if(!email || !password){
        return res.status(400).json({
            success:false,
            message:"Email and password are required"
        })
    }

        const existingUser=await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                success:false,
                message:"User already exists"
            })
        }

        const hashedPassword=await bcrypt.hash(password,10);
        await User.create({
            email,
            password:hashedPassword,
            username,
            name
        })
        return res.status(201).json({
            success:true,
            message:"user registred sucessfully"
        });
    

    
}
catch(error){
    return res.status(500).json({
        success:false,
        message:"server error"
    })
}

};
export const loginUser=async function(req,res){
    try{
        const{email,password}=req.body
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"Email and password is required"
            })
        }
        const user=await User.findOne({email});
        if(!user){
            return res.status(400).json({
                success:false,
                message:"invalid credentials"
            })
        }
        const ismatch=await bcrypt.compare(password,user.password);
        if(!ismatch){
            return res.status(400).json({
                success:false,
                message:"invalid credentials"
            })

        }
        //creation of json webtoken for creating and managing sessions
        const token=jwt.sign(
            {userId:user._id},
            process.env.JWT_SECRET,
            {expiresIn:"7d"}
        );
        res.cookie("token",token,{
            httpOnly:true,
            sameSite:"none",
            secure:false,
            maxAge:7*24*60*60*1000
        })



        return res.status(200).json({
            success:true,
            message:"login sucessful"
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"server error"
        })
    }
};