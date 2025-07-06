import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { socket } from "../socket";

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const currentUserId = "685e8a5ebc69130d44b855dd";
  const roomId = "685ed79e46abafaaa08f448e";

  const bottomRef = useRef(null);
  const scrollableRef = useRef(null);

  const scrollToBottom = (behavior = "auto") => {
    bottomRef.current?.scrollIntoView({ behavior });
  };

  // Fetch messages once
  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(`/api/messages/${roomId}`);
        setMessages(res.data.data); // Your backend returns ApiResponse
      } catch (err) {
        console.error("Fetch error", err);
      }
    };

    getMessages();
  }, []);

  // Scroll to bottom only after messages are loaded AND rendered
  useEffect(() => {
    if (messages.length > 0) {
      // Timeout ensures DOM has rendered all messages
      setTimeout(() => scrollToBottom("auto"), 0);
    }
  }, [messages]);

  // Socket listener for real-time messages
  useEffect(() => {
    socket.on("receiveMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => socket.off("receiveMessage");
  }, []);

  return (
    <div
      ref={scrollableRef}
      className="flex-1 overflow-y-auto p-4 space-y-2 bg-gray-100"
    >
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`flex ${
            msg.sender?._id === currentUserId
              ? "justify-end"
              : "justify-start"
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
      <div ref={bottomRef} />
    </div>
  );
};

export default ChatBox;
