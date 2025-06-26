// src/components/Chat/ChatHeader.jsx
const ChatHeader = ({ name }) => {
  return (
    <h4 className="text-xl font-semibold text-deepPlum mb-4 border-b pb-2">
      Chat with <strong>{name}</strong>
    </h4>
  );
};

export default ChatHeader;
