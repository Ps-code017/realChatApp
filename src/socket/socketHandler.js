

export const socketHandler=async(socket,io)=>{
    console.log("new user connected",socket.id)

    socket.on("joinRoom",async({userId,roomId})=>{
        socket.join(roomId);
        console.log("user join room",userId,roomId)

        io.to(roomId).emit("userJoined",{userId})
    })

    
}