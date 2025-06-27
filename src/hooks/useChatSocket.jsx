// src/hooks/useChatSocket.js
import { useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("https://muhurtham-backend.onrender.com", {
  autoConnect: false,
});

const useChatSocket = (userId, activeChat, onReceiveMessage, onUnreadCount) => {
  useEffect(() => {
    if (!userId) return;

    socket.connect();
    socket.emit("join", userId);

    socket.on("receiveMessage", (msg) => {
      const isForCurrentChat =
        activeChat && (msg.senderId === activeChat._id || msg.receiverId === activeChat._id);

      if (isForCurrentChat) {
        onReceiveMessage(msg); // 👈 Direct append
      } else {
        onUnreadCount(msg.senderId); // 👈 Increase badge
      }
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [userId, activeChat]);
};

export { socket, useChatSocket };
