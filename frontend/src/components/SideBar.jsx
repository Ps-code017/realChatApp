import { useEffect, useState } from "react";
import axios from "axios";

const Sidebar = ({ setRoomId }) => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await axios.get("/api/home", { withCredentials: true });
        setRooms(res.data.data); // adjust if your response structure differs
      } catch (err) {
        console.error("Failed to load chat rooms", err.message);
      }
    };

    fetchRooms();
  }, []);

  return (
    <div className="w-64 bg-gray-200 p-4 overflow-y-auto">
      <h2 className="text-xl font-bold mb-4">Chat Rooms</h2>
      <ul className="space-y-2">
        {rooms.map((room) => (
          <li
            key={room._id}
            onClick={() => setRoomId(room._id)}
            className="cursor-pointer p-2 bg-white rounded hover:bg-blue-100"
          >
            {room.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
