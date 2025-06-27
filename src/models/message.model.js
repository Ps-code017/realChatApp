import mongoose from "mongoose";

const messageSchema=new mongoose.Schema({
    sender:{
        unique:true,
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    chatRoom:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"chatRoom"
    },
    content:{
        type:String
    },
    file:[
        {type:String}
    ],
    fileType:{
        type:String
    },
    publicId:{
        type:String
    }    
},{timestamps:true})

export const Message = mongoose.model("Message", messageSchema);