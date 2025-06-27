import { useNavigate } from "react-router-dom";
import PrimaryButton from "./PrimaryButton";
import { FaComments } from "react-icons/fa";

const InterestCard = ({
  profile,
  onAccept,
  onReject,
  showChat = false, // for Mutual tab
}) => {

  const navigate = useNavigate()

  return (
    <div className="bg-white border rounded p-4 shadow-sm shadow-deepPlum hover:shadow-md  hover:shadow-deepPlum transition flex flex-row max-[1120px]:flex-col justify-between items-center gap-4">
      <div className="text-center md:text-left">
        <h3 className="text-xl font-bold text-deepPlum">{profile?.fullName}</h3>
        <p className="text-mutedBlack text-sm">
          Age: {profile?.age} | Community: {profile?.caste}
        </p>
        <p className="text-sm text-gray-600">Location: {profile?.location}</p>
      </div>

      {/* Actions */}
      <div className="flex flex-col max-lg:flex-row gap-2">
        {showChat ? (
          <PrimaryButton
            label={
              <span className="flex items-center gap-2">
                <FaComments /> Chat
              </span>
            }
            onClick={() => navigate(`/chat/${profile?._id}`)}
          />
        ) : (
          <>
            {onAccept && (
              <button
                onClick={() => onAccept(profile?._id)}
                className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
              >
                Accept
              </button>
            )}
            {onReject && (
              <button
                onClick={() => onReject(profile?._id)}
                className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
              >
                Reject
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default InterestCard;
