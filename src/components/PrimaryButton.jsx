// src/components/PrimaryButton.jsx
const PrimaryButton = ({ label, onClick, type = "button" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="bg-warmPeach text-black px-5 py-2 rounded font-semibold hover:bg-orange-300 transition"
    >
      {label}
    </button>
  );
};

export default PrimaryButton;
