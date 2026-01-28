import mongoose from "mongoose";
const userSchema=new mongoose.Schema(
    {
        email:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true,
        },
        password:{
            type:String,
            required:true,


        },
        name:{
            type:String,
            lowercase:true,
            trim:true,
        },
        username:{
            type:String,
            required:true,
            trim:true,
            unique:true,
            trim:true,

        },


    }
);
export default mongoose.model("User",userSchema)