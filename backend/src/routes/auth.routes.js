import { Router } from "express";
import { authSuccess, googleCallbackController, googleRedirectController, logoutUser, refreshAccessToken } from "../controller/auth.controller.js";
import { verifyjwt } from "../middleware/auth.middleware.js";
const router=Router();

router.get('/google',googleRedirectController)
router.get("/google/callback",googleCallbackController)
router.get("/success",verifyjwt,authSuccess)
router.post("/refresh-token",refreshAccessToken)
router.post("/logout",verifyjwt,logoutUser)

export default router;