import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";
import http from "http"
import { Server } from "socket.io";
import { socketHandler } from "./socket/socketHandler.js";



const server=http.createServer(app)
const io=new Server(server,{
    cors:{
        origin:"http://localhost:5173",
        methods:["GET","POST"],
        credentials: true    
    }
})

dotenv.config({
})

io.on("connection", (socket) => {
  try {
    socketHandler(socket, io);
  } catch (err) {
    console.error("Error in socketHandler:", err.message);
  }
});


connectDB()
.then(()=>{
    server.listen(process.env.PORT || 8000,()=>{
        console.log(" socket server server running !!!",process.env.PORT )
    })
})
.catch((err)=>{
    console.log("connection failed", err)
})