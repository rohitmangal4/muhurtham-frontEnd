// src/components/MatchesSuggestionGrid.jsx
import ProfileCard from "./ProfileCard";

const MatchesSuggestionGrid = ({ profiles, onView, onInterest }) => {
  if (!profiles?.length) {
    return (
      <div className="text-center text-mutedBlack py-10">
        No matches found at the moment. Please update your profile or try again later.
      </div>
    );
  }

  return (
    <div className="grid max-md:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 py-8">
      {profiles.map((profile) => (
        <ProfileCard
          key={profile._id}
          profile={profile}
          onView={onView}
          onInterest={onInterest}
        />
      ))}
    </div>
  );
};

export default MatchesSuggestionGrid;
