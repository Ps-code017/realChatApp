import {ApiError} from "../utils/apiError.js"
import {ApiResponse} from "../utils/apiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import axios from "axios"
import { verifyGoogleToken } from "../utils/verifyGoogleToken.js"
import { User } from "../models/user.model.js"

const options={
    httpOnly:true,
    secure: true,

     sameSite: "Strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
}
const options_access={
    httpOnly:true,
    secure: true,

    sameSite: "Strict",
    maxAge: 15 * 60 * 1000, 
}

const googleRedirectController = asyncHandler(async (req, res) => {
  const url = `https://accounts.google.com/o/oauth2/v2/auth?` +
              `client_id=${process.env.GOOGLE_CLIENT_ID}` +
              `&redirect_uri=${process.env.GOOGLE_REDIRECT_URI}` +
              `&response_type=code` +
              `&scope=openid%20email%20profile`;

  res.redirect(url);
});

const googleCallbackController=asyncHandler(async(req,res)=>{
    const code=req.query.code
    if (!code) throw new ApiError(400, "Authorization code missing");

    let tokenRes

    try {
        tokenRes = await axios.post("https://oauth2.googleapis.com/token", {
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: process.env.GOOGLE_REDIRECT_URI,
        grant_type: "authorization_code"
        });
    } catch (err) {
        console.error("Google Token Error:", err?.response?.data || err.message);
        throw new ApiError(500, "Token exchange failed");
        
    }
  

  const idToken=tokenRes.data.id_token

  const googleUser=await verifyGoogleToken(idToken);
    if(!googleUser){
        throw new ApiError(401,"invalid token")
    }

    let user=await User.findOne({email: googleUser.email});

    if(!user){
        user=await User.create({
            name: googleUser.name,
            email: googleUser.email,
            avatar: googleUser.avatar,
            googleId: googleUser.googleId,
        })
    }
    const accessToken=user.generateAccessToken()
    const refreshToken=user.generateRefreshToken()
    user.refreshToken=refreshToken

    let loggedInUser=await User.findById(user._id).select("-googleId -refreshToken")
    await user.save();
    
    
    res.cookie("accessToken", accessToken, options_access)
    res.cookie("refreshToken", refreshToken, options)
   

    res.redirect(process.env.FRONTEND_REDIRECT_URI)
})

const logoutUser=asyncHandler(async(req,res)=>{
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset:{refreshToken:1}
        },
        {new:true}
    )
    return res.status(200).clearCookie("accessToken",options_access).clearCookie("refreshToken",options).json(new ApiResponse(200,"user logged out"))

})

const refreshAccessToken=asyncHandler(async(req,res)=>{
    const refreshTokenfromCookie=req.cookies.refreshToken;

    if(!refreshTokenfromCookie){
        throw new ApiError(401,"login again");
    }
    let decoded_token
    try{
        decoded_token=jwt.verify(refreshTokenfromCookie,process.env.REFRESH_SECRET)
    }catch(err){
        throw new ApiError(403,"Invalid token")
    }

    const user=await User.findById(decoded_token._id)
    if(!user || user.refreshToken!==refreshTokenfromCookie){
        throw new ApiError(403,"token mismatch or user not found")
    }

    const newAccessToken=user.generateAccessToken()
    const newRefreshToken=user.generateRefreshToken()

    user.refreshToken=newRefreshToken
    await user.save();

    return res
    .status(200)
    .cookie("refreshToken", newRefreshToken, options)
    .cookie("accessToken", newAccessToken, options_access)
    .json( new ApiResponse(200,"token success refreshed",{accessToken: newAccessToken} ) );

})

const authSuccess=asyncHandler(async(req,res)=>{
    const user=await User.findById(req.user._id).select("-refreshToken -googleId")
    return res.status(200).json(new ApiResponse(200,"successfull auth",{accessToken:req.cookies.accessToken,user}))
})

export{
    googleRedirectController,
    googleCallbackController,
    refreshAccessToken,
    logoutUser,
    authSuccess
}