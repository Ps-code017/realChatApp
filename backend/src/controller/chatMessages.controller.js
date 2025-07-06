import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { Message } from "../models/message.model.js";

export const getMessageByRoomId=asyncHandler(async(req,res)=>{
    const {roomId}=req.params
    if(!roomId){
        throw new ApiError("give roomId")
    }
    const msgs=await Message.find({chatRoom:roomId}).sort({createdAt:1}).populate([{path:"chatRoom",select:"name "},{path:"sender",select:"name avatar"}]);
    return res.status(200).json(new ApiResponse(200,"all messages fetched",msgs))
})