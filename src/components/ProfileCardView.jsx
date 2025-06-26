import { FaUserCircle } from "react-icons/fa";

const ProfileCardView = ({ profile, onEdit }) => {
  return (
    <div className="bg-white shadow-sm shadow-deepPlum rounded-lg p-6 md:p-10 max-w-5xl mx-auto mt-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-10">
        <FaUserCircle className="h-24 w-24 text-deepPlum" />
        <div>
          <h2 className="text-mutedBlack text-2xl font-bold mb-2">
            {profile.fullName}'s Profile
          </h2>
          <p className="text-lg text-deepPlum font-semibold">
            {profile.fullName}
          </p>
          <p className="text-sm text-mutedBlack">
            {profile.gender} {profile.age ? `| ${profile.age} yrs` : ""}
          </p>
        </div>
      </div>

      {/* Profile Detail Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InfoItem label="Email" value={profile.email} />
        <InfoItem label="Mobile" value={profile.mobile} />
        <InfoItem label="Gender" value={profile.gender} />
        <InfoItem label="Profile Created By" value={profile.profileCreatedBy} />
        <InfoItem label="Religion" value={profile.religion} />
        <InfoItem label="Caste" value={profile.caste} />
        <InfoItem label="Education" value={profile.education} />
        <InfoItem label="Occupation" value={profile.occupation} />
        <InfoItem label="Location" value={profile.location} />
        <InfoItem label="Height" value={profile.height} />
        <InfoItem label="Weight" value={profile.weight} />
        <InfoItem label="Marital Status" value={profile.maritalStatus} />

        <div className="md:col-span-2">
          <p className="text-sm text-mutedBlack">
            <strong>Bio:</strong> {profile.bio || "No bio provided"}
          </p>
        </div>
      </div>

      {onEdit && (
        <div className="mt-8 text-center">
          <button
            className="bg-deepPlum text-white px-6 py-2 rounded hover:bg-opacity-90"
            onClick={onEdit}
          >
            Edit
          </button>
        </div>
      )}
    </div>
  );
};

const InfoItem = ({ label, value }) => (
  <p className="text-sm text-mutedBlack">
    <strong>{label}:</strong> {value || "Not set"}
  </p>
);

export default ProfileCardView;
