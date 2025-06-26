// src/components/ChatInput.jsx
import { useState } from "react";
import { IoSend } from "react-icons/io5";

const ChatInput = ({ onSend }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    onSend(message.trim());
    setMessage("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center border-t border-gray-200 p-3 bg-white"
    >
      <input
        type="text"
        placeholder="Type your message..."
        className="flex-1 px-4 py-2 border rounded-l-md focus:outline-none text-sm"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        type="submit"
        className="bg-deepPlum text-white px-4 py-2 rounded-r-md hover:bg-deepPlum/90"
        title="Send"
      >
        <IoSend size={18} />
      </button>
    </form>
  );
};

export default ChatInput;
