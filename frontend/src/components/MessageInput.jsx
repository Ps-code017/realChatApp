import { useState } from 'react';
// import { Socket as socket } from 'socket.io-client';
import { socket } from "../socket";

const MessageInput = ({roomId,senderId}) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (!message.trim()) return;

    console.log("🟢 Emitting message:", {
  roomId,
  senderId,
  content: message
});

    
     socket.emit("sendMessage", {
      roomId,
      senderId,
      content: message,
      attachments: [] 
    });
    

    setMessage(''); // Clear input after sending
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="p-4 bg-white flex border-t">
      <input
        type="text"
        className="flex-1 border px-3 py-2 rounded-l-md outline-none"
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button
        onClick={handleSend}
        className="bg-blue-500 text-white px-4 py-2 rounded-r-md"
      >
        Send
      </button>
    </div>
  );
};

export default MessageInput;
