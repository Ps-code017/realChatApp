import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ChatRoom } from "../models/chatRoom.model.js";

export const getAllChatRooms=asyncHandler(async(req,res)=>{
    const rooms=await ChatRoom.find({}).populate([{path:"creator", select:"name avatar"},{path:"members", select:"name avatar"}])

    return res.status(200).json(new ApiResponse(200,"all chatrooms fetched",rooms))
})