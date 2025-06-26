import React from "react";
import { useNavigate } from "react-router-dom";

const ChatSidebar = ({ chats, activeChat, setActiveChat, loadMessages, newMsgCountMap, clearNewMsgCount }) => {
  const navigate = useNavigate();

  const handleChatSelect = (chatUser) => {
    setActiveChat(chatUser);
    loadMessages(chatUser._id);
    clearNewMsgCount(chatUser._id);
    navigate(`/chat/${chatUser._id}`);
  };

  return (
    <div className="border-r pr-4">
      <h3 className="text-lg font-bold text-deepPlum mb-4">Chats</h3>
      {chats.length === 0 && <p>No chats yet</p>}
      {chats.map((chatUser) => {
        const isActive = activeChat?._id === chatUser._id;
        const unreadCount = newMsgCountMap?.[chatUser._id] || 0;

        return (
          <div
            key={chatUser._id}
            onClick={() => handleChatSelect(chatUser)}
            className={`cursor-pointer px-3 py-2 rounded mb-2 flex justify-between items-center ${
              isActive ? "bg-deepPlum text-white" : "hover:bg-linen"
            }`}
          >
            <span className="truncate max-w-[150px]">{chatUser.fullName || "Unnamed"}</span>
            {unreadCount > 0 && (
              <span className="ml-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                {unreadCount} new
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ChatSidebar;