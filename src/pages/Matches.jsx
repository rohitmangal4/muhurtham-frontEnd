import { useEffect, useState } from "react";
import axios from "axios";
import MatchesSuggestionGrid from "../components/MatchesSuggestionGrid";
import Loader from "../components/Loder";
import { toast } from "react-toastify";

const Matches = () => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("muhurthamUser"));

  const fetchSuggestions = async () => {
    try {
      const res = await axios.get(`http://localhost:7000/api/user/suggestions`, {
        headers: { Authorization: `Bearer ${user?.token}` },
      });
      setProfiles(res.data);
    } catch (err) {
      console.error("Failed to fetch matches:", err);
    } finally {
      setLoading(false);
    }
  };

  const sendInterest = async (receiverId) => {
  try {
    await axios.post(
      `http://localhost:7000/api/interest/send/${receiverId}`,
      {}, // No body needed
      {
        headers: { Authorization: `Bearer ${user?.token}` },
      }
    );

    toast.success("Interest sent successfully 💌");
    setProfiles((prev) => prev.filter((p) => p._id !== receiverId));
  } catch (err) {
    toast.error(err.response?.data?.message || "Failed to send interest");
  }
};

  useEffect(() => {
    fetchSuggestions();
  }, []);

  if (loading) return <Loader message="Loading suggested profiles..." />;

  return (
    <div className="min-h-screen pt-20 px-4 py-10 bg-white">
      <h2 className="text-3xl font-bold text-center text-deepPlum mb-8">
        Suggested Profiles for You
      </h2>

      <MatchesSuggestionGrid
        profiles={profiles}
        onView={(id) => (window.location.href = `/view/${id}`)}
        onInterest={sendInterest}
      />
    </div>
  );
};

export default Matches;
