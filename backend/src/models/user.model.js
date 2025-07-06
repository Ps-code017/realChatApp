import mongoose from "mongoose";
import jwt from "jsonwebtoken"

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    avatar:{
        type:String
    },
    googleId:{
        type:String,
        required:true,
        unique:true
    },
    refreshToken:{
        type:String
    }


},{timestamps:true})

userSchema.methods.generateRefreshToken=function(){
    return jwt.sign({
        _id:this._id,
        gid:this.googleId
    },
    process.env.REFRESH_SECRET,
    {
        expiresIn:process.env.REFRESH_EXPIRY

    })
};
userSchema.methods.generateAccessToken=function(){
    return jwt.sign({
        _id:this._id,
        gid:this.googleId,
        email:this.email
    },
    process.env.ACCESS_SECRET,
    {
        expiresIn:process.env.ACCESS_EXPIRY

    })
};

export const User=mongoose.model("User",userSchema)
