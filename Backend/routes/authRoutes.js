import express from "express"
import { registerUser,loginUser } from "../controllers/authcontroller.js"
import authMiddlewer from "../middleware/authmiddleware.js"

import User from "../models/user.js"
const router=express.Router()
router.post("/register",registerUser)
router.post("/login",loginUser)
router.post("/logout",(req,res)=>{
    res.clearCookie("token",{
        httpOnly:true,
        sameSite:"lax",
        secure:false,
    });
    return res.status(200).json({message:"logged out successfully"})
})
router.get("/me",authMiddlewer,async (req,res)=>{
 const user=await User.findById(req.userId).select("-password")

res.json({
    success:true,
    user
})
})
export default router;