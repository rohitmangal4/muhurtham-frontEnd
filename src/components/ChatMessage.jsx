const ChatMessage = ({ message, isSender, senderName }) => {
  return (
    <div className={`flex ${isSender ? "justify-end" : "justify-start"} mb-2`}>
      <div
        className={`max-w-xs md:max-w-sm px-4 py-2 rounded-lg text-sm shadow 
        ${
          isSender
            ? "bg-deepPlum text-white rounded-br-none"
            : "bg-warmPeach text-black rounded-bl-none"
        }`}
      >
        <p className="text-xs font-semibold mb-1">{senderName}</p>
        <p>{message.content}</p>
        <p className="text-[10px] text-right mt-1 opacity-70">
          {new Date(message.timestamp || message.createdAt).toLocaleTimeString(
            [],
            {
              hour: "2-digit",
              minute: "2-digit",
            }
          )}
        </p>
      </div>
    </div>
  );
};

export default ChatMessage;
