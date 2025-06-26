// src/components/ProfileCard.jsx
import { FaUserCircle } from "react-icons/fa";
import PrimaryButton from "./PrimaryButton";

const ProfileCard = ({ profile, onView, onInterest }) => {
  return (
    <div className="bg-white border rounded p-3 shadow shadow-warmPeach hover:shadow-md hover:shadow-warmPeach transition flex flex-col justify-between items-center text-center">
      {/* Profile Icon */}
      <FaUserCircle className="text-deepPlum text-5xl mb-3" />

      {/* Basic Info */}
      <h3 className="text-xl font-bold text-deepPlum">{profile.fullName}</h3>
      <p className="text-sm text-mutedBlack">Age: {profile.age} | {profile.caste}</p>
      <p className="text-sm text-gray-600">{profile.location}</p>

      {/* Actions */}
      <div className="mt-4 flex gap-2">
        <PrimaryButton label="View" onClick={() => onView(profile._id)} />
        <button
          onClick={() => onInterest(profile._id)}
          className="bg-warmPeach text-black px-4 py-1 rounded hover:bg-orange-300"
        >
          Interest
        </button>
      </div>
    </div>
  );
};

export default ProfileCard;
