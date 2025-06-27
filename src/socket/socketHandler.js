import { Message } from "../models/message.model";
import { ApiError } from "../utils/apiError";


export const socketHandler=async(socket,io)=>{
    console.log("new user connected",socket.id)

    socket.on("joinRoom",async({userId,roomId})=>{
        socket.join(roomId);
        console.log("user join room",userId,roomId)

        io.to(roomId).emit("userJoined",{userId})
    })

    socket.on("sendMessage",async({roomId,senderId,file,fileType,content})=>{
        if(!roomId||!senderId||!file||!fileType||!content){
            throw new ApiError(400,"all field required")
        }
        const message=await Message.create({chatRoom:roomId,sender:senderId,file,fileType,content})

        const populate=(await message.populate("chatRoom","name members")).populate("sender","name avatar")
        io.to(roomId).emit("receiveMessage",{populate})
    })

    
}