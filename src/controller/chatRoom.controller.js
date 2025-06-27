import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ChatRoom } from "../models/chatRoom.model.js";
import slugify from "slugify";

const createRoom=asyncHandler(async(req,res)=>{
    const {name}=req.body;

    if(!name){
        throw new ApiError(400,"give name of room")
    }
    const slug=slugify(name)
    const room=await ChatRoom.create({name,creator:req.user._id,slug})

    return res.status(200).json(new ApiResponse(200,"room created",room))
})

const getRoomById=asyncHandler(async(req,res)=>{
    const roomId=req.params.id
    if(!roomId){
        throw new ApiError(400,"give id for room")
    }
    const room=await ChatRoom.findById(roomId).populate("members","name avatar");
    if(!room){
        throw new ApiError(400,"no room exist")
    }
    return res.status(200).json(new ApiResponse(200,"room fetched",room))
})

const getRoomBySlug=asyncHandler(async(req,res)=>{
    const { slug } = req.params;
    const room = await ChatRoom.findOne({ slug }).populate("members", "name avatar");
    if(!room){
        throw new ApiError(400,"no room exist")
    }
    return res.status(200).json(new ApiResponse(200,"room fetched",room))
})

export{
    createRoom,
    getRoomById,
    getRoomBySlug
}