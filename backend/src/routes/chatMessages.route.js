import { Router } from "express";
import { verifyjwt } from "../middleware/auth.middleware.js";
import { getMessageByRoomId } from "../controller/chatMessages.controller.js";
const router=Router();

router.get("/:roomId",verifyjwt,getMessageByRoomId)

export default router;