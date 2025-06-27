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
    attachments: [
    {
      fileUrl: { type: String, required: true },
      fileType: { type: String, enum: ["image", "file"], required: true },
      publicId: { type: String, required: true }
    }
    ]   
},{timestamps:true})

export const Message = mongoose.model("Message", messageSchema);