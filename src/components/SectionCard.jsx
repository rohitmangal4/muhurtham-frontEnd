// src/components/SectionCard.jsx
const SectionCard = ({ title, description }) => {
  return (
    <div className="p-6 bg-white border rounded shadow hover:shadow-md transition">
      <h3 className="text-xl font-semibold text-deepPlum">{title}</h3>
      <p className="mt-2 text-mutedBlack text-sm">{description}</p>
    </div>
  );
};

export default SectionCard;
