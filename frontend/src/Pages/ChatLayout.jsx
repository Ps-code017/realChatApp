import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/SideBar";
import ChatBox from "../components/ChatBox";
import MessageInput from "../components/MessageInput";

const ChatLayout = () => {
  const [currentUserId, setCurrentUserId] = useState(null);
  const [roomId, setRoomId] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/api/auth/success", {
          withCredentials: true,
        });
        setCurrentUserId(res.data.data.user._id);
      } catch (err) {
        console.error("User fetch failed:", err.message);
      }
    };

    fetchUser();
  }, []);

  if (!currentUserId) return <div>Loading...</div>;

  return (
    <div className="flex h-screen">
      <Sidebar setRoomId={setRoomId} />
      <div className="flex flex-col flex-1">
        {roomId ? (
          <>
            <ChatBox currentUserId={currentUserId} roomId={roomId} />
            <MessageInput senderId={currentUserId} roomId={roomId} />
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            Select a chatroom to start chatting
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatLayout;
