import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js";
import { verifyjwt } from "../middleware/auth.middleware.js";
import { uploadController } from "../controller/upload.controller.js";

const router=Router()
router.post("/",verifyjwt,upload.array("attachements",5),uploadController)


export default router