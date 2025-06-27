import { Router } from "express";
const router=Router()
import { getAllChatRooms } from "../controller/home.controller.js";
import { verifyjwt } from "../middleware/auth.middleware.js";

router.get("/",verifyjwt,getAllChatRooms)

export default router;