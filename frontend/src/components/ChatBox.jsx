import { useEffect, useState } from "react";
import { socket } from "../socket";

const ChatBox = () => {
  const [messages, setMessages] = useState([]);

  const currentUserId = "685e8a5ebc69130d44b855dd"; // your current user ID

  useEffect(() => {
    console.log("💬 ChatBox mounted");

    socket.on("receiveMessage", (msg) => {
      console.log("📩 Message received from server:", msg);
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  });

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-gray-100">
      {messages.length === 0 && (
        <p className="text-center text-gray-400">No messages yet</p>
      )}

      {messages.map((msg, index) => (
        <div
          key={index}
          className={`flex ${
            msg.sender?._id === currentUserId ? "justify-end" : "justify-start"
          }`}
        >
          <div
            className={`px-4 py-2 rounded-lg max-w-xs ${
              msg.sender?._id === currentUserId
                ? "bg-blue-500 text-white"
                : "bg-gray-300 text-black"
            }`}
          >
            <span className="block text-sm font-semibold">
              {msg.sender?.name || "Unknown"}
            </span>
            <span>{msg.content || "No message"}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatBox;
