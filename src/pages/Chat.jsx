import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { io } from "socket.io-client";
import ChatSidebar from "../components/ChatSidebar";
import ChatHeader from "../components/ChatHeader";
import ChatBody from "../components/ChatBody";
import ChatInput from "../components/ChatInput";

const socket = io("https://muhurtham-backend.onrender.com");

const ChatPage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("muhurthamUser"));
  const [chats, setChats] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMsgCountMap, setNewMsgCountMap] = useState({});
  const messageEndRef = useRef();

  // Join socket
  useEffect(() => {
    socket.emit("join", user._id);

    socket.on("receiveMessage", (msg) => {
      if (activeChat?._id === msg.senderId || activeChat?._id === msg.receiverId) {
        setMessages((prev) => [...prev, msg]);
      }
      if (!activeChat || activeChat._id !== msg.senderId) {
        setNewMsgCountMap((prev) => ({
          ...prev,
          [msg.senderId]: (prev[msg.senderId] || 0) + 1,
        }));
      }
    });

    return () => socket.disconnect();
  }, [user._id, activeChat]);

  // Fetch mutual chat list + load initial chat
  useEffect(() => {
    const fetchChatsAndUser = async () => {
      try {
        const res = await axios.get("https://muhurtham-backend.onrender.com/api/chat/mutual/list", {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setChats(res.data);

        if (userId) {
          const userRes = await axios.get(`https://muhurtham-backend.onrender.com/api/user/me/${userId}`, {
            headers: { Authorization: `Bearer ${user.token}` },
          });
          setActiveChat(userRes.data);
          loadMessages(userId);
        }
      } catch (err) {
        console.error("Fetch chat list/user failed", err);
      }
    };

    fetchChatsAndUser();
  }, [user.token, userId]);

  const loadMessages = async (receiverId) => {
    try {
      const res = await axios.get(`https://muhurtham-backend.onrender.com/api/chat/${receiverId}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setMessages(res.data);
    } catch (err) {
      console.error("Message fetch failed", err);
    }
  };

  const clearNewMsgCount = (userId) => {
    setNewMsgCountMap((prev) => ({
      ...prev,
      [userId]: 0,
    }));
  };

  const handleSend = async (msgText) => {
    if (!msgText || !activeChat) return;

    const msg = {
      senderId: user._id,
      receiverId: activeChat._id,
      content: msgText,
    };

    try {
      await axios.post("https://muhurtham-backend.onrender.com/api/chat/send", msg, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      socket.emit("sendMessage", msg);
      setMessages((prev) => [...prev, msg]);
    } catch (err) {
      console.error("Send message failed", err);
    }
  };

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="min-h-screen grid md:grid-cols-4 pt-16 px-4 md:px-6 gap-4 bg-linen">
      <ChatSidebar
        chats={chats}
        activeChat={activeChat}
        setActiveChat={(chatUser) => {
          setActiveChat(chatUser);
          loadMessages(chatUser._id);
          clearNewMsgCount(chatUser._id);
          navigate(`/chat/${chatUser._id}`);
        }}
        loadMessages={loadMessages}
        newMsgCountMap={newMsgCountMap}
        clearNewMsgCount={clearNewMsgCount}
      />

      <div className="md:col-span-3 border rounded-lg p-4 mb-16 bg-white flex flex-col">
        {!activeChat ? (
          <p className="text-center text-mutedBlack mt-10">Select a user to start chat</p>
        ) : (
          <>
            <ChatHeader name={activeChat?.fullName} />
            <ChatBody
              messages={messages}
              currentUserId={user}
              activeChat={activeChat}
              messageEndRef={messageEndRef}
            />
            <ChatInput onSend={handleSend} />
          </>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
