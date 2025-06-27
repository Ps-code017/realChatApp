import express from "express";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static("public"))
app.use(cookieParser())

//import routes
import authRouter from "./routes/auth.routes.js"

//give path to routes app.use('/api/home',homerouter)
app.use("/api/auth",authRouter)

export {app};