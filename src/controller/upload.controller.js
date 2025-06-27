import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import fs from "fs"

export const uploadController=asyncHandler(async(req,res)=>{
    if(!req.files){
        throw new ApiError(400,"no file rovided");
    }
    // console.log("in upload controller")
    let uploads=[]
    for(const file of req.files){
        console.log(file.mimetype)
        const uploaded_image=await uploadOnCloudinary(file.path)
        
        if(!uploaded_image?.url){
            throw new ApiError(500,"cloudinary upload failed")
        }
        const fileType = uploaded_image.format || uploaded_image.resource_type || "unknown";

        console.log("after")
        console.log(fileType)

        uploads.push({file:uploaded_image.url,fileType,publicId:uploaded_image.public_id})
    }
    return res.status(200).json(new ApiResponse(200,"file uploaded",uploads))
})

