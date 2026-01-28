import jwt from "jsonwebtoken"
const authMiddlewer=(req,res,next)=>{
    const token=req.cookies.token;
    if(!token){
        return res.status(401).json({
            success:false,
            message:"Not authenticated"
        })
    }
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        req.userId=decoded.userId;
        next()
    }
    catch(error){
        return res.status(401).json({
            success:false,
            message:"invalid token"
        })
    }

}
export default authMiddlewer