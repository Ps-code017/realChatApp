import { v2 } from "cloudinary";
import fs from "fs"

v2.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET 
    });

export const uploadOnCloudinary = async (localFilePath) => {
  if (!localFilePath) return null;

  const isPDF = localFilePath.endsWith(".pdf");

  try {
    const response = await v2.uploader.upload(localFilePath, {
      resource_type: isPDF ? "raw" : "auto",
      folder: "realChatApp",
    });

    console.log("resource_type:", response.resource_type);
    return response;
  } catch (err) {
    console.error("Cloudinary upload error:", err.message);
    throw new Error("Cloudinary upload failed");
  } finally {
    
    if (fs.existsSync(localFilePath)) {
      fs.unlink(localFilePath, (err) => {
        if (err) console.error("File delete error:", err.message);
      });
    }
  }
};




