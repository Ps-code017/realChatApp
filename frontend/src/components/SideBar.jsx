const Sidebar = () => {
  // Later this will come from backend via socket
  const onlineUsers = ['Alice', 'Bob', 'Charlie'];

  return (
    <div className="w-64 bg-gray-800 text-white p-4">
      <h2 className="text-2xl font-semibold mb-4">Online Users</h2>
      <ul className="space-y-2">
        {onlineUsers.map((user, index) => (
          <li
            key={index}
            className="bg-gray-700 px-3 py-2 rounded hover:bg-gray-600 transition"
          >
            {user}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
