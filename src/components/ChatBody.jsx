// // src/components/ChatBody.jsx
// import React from "react";

// const ChatBody = ({ messages, currentUserId, messageEndRef }) => {
//   return (
//     <div className="flex-1 overflow-y-auto max-h-[60vh] mb-4 pr-2">
//       {messages.map((msg, idx) => {
//         const isSender = msg.senderId === currentUserId._id || msg.senderId?._id === currentUserId._id;

//         return (
//           <div
//             key={idx}
//             className={`mb-2 flex ${isSender ? "justify-end" : "justify-start"}`}
//           >
//             <div
//               className={`px-4 py-2 rounded max-w-xs shadow-md text-sm ${
//                 isSender
//                   ? "bg-deepPlum text-white rounded-br-none"
//                   : "bg-warmPeach text-black rounded-bl-none"
//               }`}
//             >
//               <p>{msg.content}</p>
//               <p className="text-[10px] text-right mt-1 opacity-70">
//                 {new Date(msg.timestamp || msg.createdAt).toLocaleTimeString([], {
//                   hour: "2-digit",
//                   minute: "2-digit",
//                 })}
//               </p>
//             </div>
//           </div>
//         );
//       })}
//       <div ref={messageEndRef} />
//     </div>
//   );
// };

// export default ChatBody;

// src/components/ChatBody.jsx
// import React, { useEffect } from "react";

// const ChatBody = ({ messages, currentUserId, messageEndRef }) => {
//   useEffect(() => {
//     messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   return (
//     <div className="flex-1 overflow-y-auto px-4 py-2 scroll-smooth">
//       {messages.map((msg, idx) => {
//         const isSender =
//           msg.senderId === currentUserId._id ||
//           msg.senderId?._id === currentUserId._id;

//         // Safe timestamp parse fallback
//         let timeString = "Invalid time";
//         try {
//           const date = new Date(msg.createdAt || msg.timestamp);
//           if (!isNaN(date.getTime())) {
//             timeString = date.toLocaleTimeString([], {
//               hour: "2-digit",
//               minute: "2-digit",
//             });
//           }
//         } catch (err) {
//           console.error("Time parse error", err);
//         }

//         return (
//           <div
//             key={idx}
//             className={`mb-2 flex ${
//               isSender ? "justify-end" : "justify-start"
//             }`}
//           >
//             <div
//               className={`px-4 py-2 rounded max-w-xs shadow-md text-sm ${
//                 isSender
//                   ? "bg-deepPlum text-white rounded-br-none"
//                   : "bg-warmPeach text-black rounded-bl-none"
//               }`}
//             >
//               <p ref={messageEndRef}>{msg.content}</p>
//               <p className="text-[10px] text-right mt-1 opacity-70">
//                 {timeString}
//               </p>
//             </div>
//           </div>
//         );
//       })}
//       <div ref={messageEndRef} />
//     </div>
//   );
// };

// export default ChatBody;


import React, { useEffect } from "react";

const ChatBody = ({ messages, currentUserId, messageEndRef }) => {
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto px-4 py-2 scroll-smooth">
      {messages.map((msg, idx) => {
        const isSender =
          msg.senderId === currentUserId._id ||
          msg.senderId?._id === currentUserId._id;

        let timeString = "Invalid time";
        try {
          const date = new Date(msg.createdAt || msg.timestamp);
          if (!isNaN(date.getTime())) {
            timeString = date.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            });
          }
        } catch {}

        const isLast = idx === messages.length - 1;

        return (
          <div
            key={idx}
            ref={isLast ? messageEndRef : null} // ✅ Only scroll to last message
            className={`mb-2 flex ${isSender ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`px-4 py-2 rounded max-w-xs shadow-md text-sm ${
                isSender
                  ? "bg-deepPlum text-white rounded-br-none"
                  : "bg-warmPeach text-black rounded-bl-none"
              }`}
            >
              <p>{msg.content}</p>
              <p className="text-[10px] text-right mt-1 opacity-70">{timeString}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ChatBody;
