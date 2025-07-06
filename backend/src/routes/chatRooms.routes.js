import { Router } from "express";
import { verifyjwt } from "../middleware/auth.middleware.js";
import { createRoom, getRoomById, getRoomBySlug } from "../controller/chatRoom.controller.js";
const router=Router();

router.post("/create",verifyjwt,createRoom)
router.get("/id/:id",verifyjwt,getRoomById)
router.get("/:slug",verifyjwt,getRoomBySlug)

export default router