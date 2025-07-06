import express from "express";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static("public"))
app.use(cookieParser())

//import routes
import authRouter from "./routes/auth.routes.js"
import homeRouter from "./routes/home.route.js"
import uploadRouter from "./routes/upload.route.js"
import chatroomRouter from "./routes/chatRooms.routes.js"


//give path to routes app.use('/api/home',homerouter)
app.use("/api/home",homeRouter)
app.use("/api/auth",authRouter)
app.use("/api/upload",uploadRouter)
app.use("/api/chatRoom",chatroomRouter)

export {app};