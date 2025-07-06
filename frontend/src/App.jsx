import { useState } from 'react'
import Greeting from './Components/Greeting'
import Sidebar from './components/SideBar'
import ChatBox from './components/ChatBox'
import MessageInput from './components/MessageInput'
import { useEffect } from 'react'
import { socket } from './socket'




function App() {
  const [count, setCount] = useState(0)

   const roomId = "685ed79e46abafaaa08f448e";
  const userId = "685e8a5ebc69130d44b855dd";
  const senderId = "685e8a5ebc69130d44b855dd";

   useEffect(() => {
    socket.emit("joinRoom", {roomId,userId});
    console.log("🧠 Joining room:", roomId);
  }, []);

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <ChatBox /> {/* Later: pass roomId or messages here if needed */}
        <MessageInput roomId={roomId} senderId={senderId} />
      </div>
    </div>
  )
}

export default App
