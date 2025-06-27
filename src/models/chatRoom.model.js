import mongoose from "mongoose";

const chatRoomSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    creator:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    members:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
},{timestamps:true})

export const ChatRoom = mongoose.model("ChatRoom", chatRoomSchema);