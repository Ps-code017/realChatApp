import { ChatRoom } from "../models/chatRoom.model.js";
import { Message } from "../models/message.model.js";



export const socketHandler=async(socket,io)=>{
    console.log("new user connected",socket.id)

    socket.on("joinRoom",async({userId,roomId})=>{
        try {
            socket.join(roomId);
            console.log("user join room",userId,roomId)
    
            await ChatRoom.findByIdAndUpdate(roomId,
                {
                    $addToSet:{
                        members:userId
                    },
                },
                {new:true}
            )
            io.to(roomId).emit("userJoined",{userId})
        } catch (err) {
            console.error("Socket error:", err.message);
            socket.emit("errorOccurred", { message: "fail to join room" });
            
        }
    });

    socket.on("sendMessage",async({roomId,senderId,file,fileType,content})=>{
        try {
            const message=await Message.create({chatRoom:roomId,sender:senderId,file,fileType,content})
    
            const populated = await message.populate([{ path: "chatRoom", select: "name participants" },{ path: "sender", select: "name avatar" }]);
            io.to(roomId).emit("receiveMessage",populated)
        } catch (error) {
            console.error("sendMessage error:", err.message);
            socket.emit("errorOccurred", { message: "Failed to send message." })   
        }
    })   
}