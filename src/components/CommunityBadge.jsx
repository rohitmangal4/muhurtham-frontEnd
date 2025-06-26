// src/components/CommunityBadge.jsx
const CommunityBadge = ({ name }) => {
  return (
    <span className="bg-white text-deepPlum px-4 py-2 rounded shadow text-sm font-medium">
      {name}
    </span>
  );
};

export default CommunityBadge;
