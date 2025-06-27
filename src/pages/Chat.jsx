

// import { useEffect, useState, useRef } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { io } from "socket.io-client";
// import ChatSidebar from "../components/ChatSidebar";
// import ChatHeader from "../components/ChatHeader";
// import ChatBody from "../components/ChatBody";
// import ChatInput from "../components/ChatInput";

// // Socket instance — declared outside to persist across renders
// const socket = io("https://muhurtham-backend.onrender.com", {
//   autoConnect: false,
// });

// const ChatPage = () => {
//   const { userId } = useParams();
//   const navigate = useNavigate();
//   const user = JSON.parse(localStorage.getItem("muhurthamUser"));
//   const [chats, setChats] = useState([]);
//   const [activeChat, setActiveChat] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [newMsgCountMap, setNewMsgCountMap] = useState({});
//   const messageEndRef = useRef();

//   // ⚡ Connect socket only once
//   useEffect(() => {
//     if (!user?._id) return;

//     socket.connect();

//     socket.emit("join", user._id);

//     socket.on("receiveMessage", (msg) => {
//       const isRelevant =
//         activeChat?._id === msg.senderId || activeChat?._id === msg.receiverId;

//       if (isRelevant) {
//         setMessages((prev) => [...prev, msg]);
//         scrollToBottom();
//       }

//       if (!isRelevant) {
//         setNewMsgCountMap((prev) => ({
//           ...prev,
//           [msg.senderId]: (prev[msg.senderId] || 0) + 1,
//         }));
//       }
//     });

//     return () => {
//       socket.off("receiveMessage");
//     };
//   }, [user._id, activeChat]);

//   // 🔁 Scroll when new messages appear
//   const scrollToBottom = () => {
//     messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   // 📥 Load chat list + optionally active chat
//   useEffect(() => {
//     const fetchChatsAndUser = async () => {
//       try {
//         const res = await axios.get(
//           "https://muhurtham-backend.onrender.com/api/chat/mutual/list",
//           {
//             headers: { Authorization: `Bearer ${user.token}` },
//           }
//         );
//         setChats(res.data);

//         if (userId) {
//           const userRes = await axios.get(
//             `https://muhurtham-backend.onrender.com/api/user/me/${userId}`,
//             {
//               headers: { Authorization: `Bearer ${user.token}` },
//             }
//           );
//           setActiveChat(userRes.data);
//           loadMessages(userId);
//         }
//       } catch (err) {
//         console.error("Fetch chat list/user failed", err);
//       }
//     };

//     fetchChatsAndUser();
//   }, [user.token, userId]);

//   // 🧾 Load all messages between user and active chat
//   const loadMessages = async (receiverId) => {
//     try {
//       const res = await axios.get(
//         `https://muhurtham-backend.onrender.com/api/chat/${receiverId}`,
//         {
//           headers: { Authorization: `Bearer ${user.token}` },
//         }
//       );
//       setMessages(res.data);
//       scrollToBottom();
//     } catch (err) {
//       console.error("Message fetch failed", err);
//     }
//   };

//   const clearNewMsgCount = (userId) => {
//     setNewMsgCountMap((prev) => ({
//       ...prev,
//       [userId]: 0,
//     }));
//   };

//   // 📨 Handle sending new message
//   const handleSend = async (msgText) => {
//     if (!msgText || !activeChat) return;

//     const msg = {
//       senderId: user._id,
//       receiverId: activeChat._id,
//       content: msgText,
//       createdAt: new Date().toISOString(), // ensure timestamp
//     };

//     try {
//       await axios.post(
//         "https://muhurtham-backend.onrender.com/api/chat/send",
//         msg,
//         {
//           headers: { Authorization: `Bearer ${user.token}` },
//         }
//       );

//       socket.emit("sendMessage", msg);
//       setMessages((prev) => [...prev, msg]);
//       scrollToBottom();
//     } catch (err) {
//       console.error("Send message failed", err);
//     }
//   };

//   return (
//     <div className="min-h-screen grid md:grid-cols-4 pt-16 px-4 md:px-6 gap-4 bg-linen">
//       <ChatSidebar
//         chats={chats}
//         activeChat={activeChat}
//         setActiveChat={(chatUser) => {
//           setActiveChat(chatUser);
//           loadMessages(chatUser._id);
//           clearNewMsgCount(chatUser._id);
//           navigate(`/chat/${chatUser._id}`);
//         }}
//         loadMessages={loadMessages}
//         newMsgCountMap={newMsgCountMap}
//         clearNewMsgCount={clearNewMsgCount}
//       />

//       <div className="md:col-span-3 border rounded-lg p-4 mb-16 bg-white flex flex-col h-[75vh]">
//         {!activeChat ? (
//           <p className="text-center text-mutedBlack mt-10">
//             Select a user to start chat
//           </p>
//         ) : (
//           <>
//             <ChatHeader name={activeChat?.fullName} />
//             <div className="flex-1 flex flex-col overflow-hidden">
//               <ChatBody
//                 messages={messages}
//                 currentUserId={user}
//                 activeChat={activeChat}
//                 messageEndRef={messageEndRef}
//               />
//               <ChatInput onSend={handleSend} />
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ChatPage;


// src/pages/ChatPage.jsx

import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { io } from "socket.io-client";
import ChatSidebar from "../components/ChatSidebar";
import ChatHeader from "../components/ChatHeader";
import ChatBody from "../components/ChatBody";
import ChatInput from "../components/ChatInput";

// ✅ Socket instance (persistent)
const socket = io("https://muhurtham-backend.onrender.com", {
  autoConnect: false,
});

const ChatPage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("muhurthamUser"));
  const [chats, setChats] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMsgCountMap, setNewMsgCountMap] = useState({});
  const messageEndRef = useRef();
  const [loadingMessages, setLoadingMessages] = useState(false);

  // ✅ Connect to Socket.IO once
  useEffect(() => {
    if (!user?._id) return;

    socket.connect();
    socket.emit("join", user._id);

    socket.on("receiveMessage", (msg) => {
      const isRelevant =
        String(activeChat?._id) === String(msg.senderId) ||
        String(activeChat?._id) === String(msg.receiverId);

      if (isRelevant) {
        setMessages((prev) => [...prev, msg]);
        scrollToBottom();
      } else {
        setNewMsgCountMap((prev) => ({
          ...prev,
          [msg.senderId]: (prev[msg.senderId] || 0) + 1,
        }));
      }
    });

    return () => {
      socket.off("receiveMessage");
      socket.disconnect();
    };
  }, [user._id, activeChat]);

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // 📥 Load mutual chat users and set selected chat
  useEffect(() => {
    const fetchChatsAndUser = async () => {
      try {
        const res = await axios.get(
          "https://muhurtham-backend.onrender.com/api/chat/mutual/list",
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );
        setChats(res.data);

        if (userId) {
          const userRes = await axios.get(
            `https://muhurtham-backend.onrender.com/api/user/me/${userId}`,
            {
              headers: { Authorization: `Bearer ${user.token}` },
            }
          );
          setActiveChat(userRes.data);
          loadMessages(userId);
        }
      } catch (err) {
        console.error("Fetch chat list/user failed", err);
      }
    };

    fetchChatsAndUser();
  }, [user.token, userId]);

  // 🧾 Load message history
  const loadMessages = async (receiverId) => {
    try {
      setLoadingMessages(true);
      const res = await axios.get(
        `https://muhurtham-backend.onrender.com/api/chat/${receiverId}`,
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      setMessages(res.data);
      setLoadingMessages(false);
      scrollToBottom();
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

  // 📨 Send message
  const handleSend = async (msgText) => {
    if (!msgText || !activeChat) return;

    const msg = {
      senderId: user._id,
      receiverId: activeChat._id,
      content: msgText,
      createdAt: new Date().toISOString(),
    };

    try {
      await axios.post(
        "https://muhurtham-backend.onrender.com/api/chat/send",
        msg,
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );

      socket.emit("sendMessage", msg);
      setMessages((prev) => [...prev, msg]);
      scrollToBottom();
    } catch (err) {
      console.error("Send message failed", err);
    }
  };

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

      <div className="md:col-span-3 border rounded-lg p-4 mb-16 bg-white flex flex-col h-[75vh]">
        {!activeChat ? (
          <p className="text-center text-mutedBlack mt-10">
            Select a user to start chat
          </p>
        ) : (
          <>
            <ChatHeader name={activeChat?.fullName} />
            <div className="flex-1 flex flex-col overflow-hidden">
              {loadingMessages ? (
                <div className="text-center text-mutedBlack py-8">
                  Loading messages...
                </div>
              ) : (
                <ChatBody
                  messages={messages}
                  currentUserId={user._id}
                  activeChat={activeChat}
                  messageEndRef={messageEndRef}
                />
              )}
              <ChatInput onSend={handleSend} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
