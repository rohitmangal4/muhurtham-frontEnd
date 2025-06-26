import { useEffect, useState } from "react";
import axios from "axios";
import InterestCard from "../components/InterestCard";

const Interests = () => {
  const [tab, setTab] = useState("mutual");
  const [data, setData] = useState([]);
  const user = JSON.parse(localStorage.getItem("muhurthamUser"));

  const fetchInterests = async () => {
    try {
      const endpoint = {
        received: "/api/interest/received",
        mutual: "/api/interest/mutual",
        sent: "/api/interest/sent",
        rejected: "/api/interest/rejected",
      }[tab];

      const res = await axios.get(`https://muhurtham-backend.onrender.com${endpoint}`, {
        headers: { Authorization: `Bearer ${user?.token}` },
      });

      setData(res.data);
    } catch (err) {
      console.error("Failed to fetch interests:", err);
    }
  };

  const handleAccept = async (interestId) => {
    try {
      await axios.put(
        `https://muhurtham-backend.onrender.com/api/interest/respond/${interestId}`,
        { status: "accepted" },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      fetchInterests();
    } catch (err) {
      console.error("Accept failed");
    }
  };

  const handleReject = async (interestId) => {
    try {
      await axios.put(
        `https://muhurtham-backend.onrender.com/api/interest/respond/${interestId}`,
        { status: "rejected" },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      fetchInterests();
    } catch (err) {
      console.error("Reject failed");
    }
  };

  useEffect(() => {
    fetchInterests();
  }, [tab]);

  return (
    <div className="min-h-screen pt-20 px-4 py-10 bg-linen">
      <h2 className="text-3xl font-bold text-center text-deepPlum mb-6">
        Your Interests
      </h2>

      {/* Tabs */}
      <div className="flex justify-center gap-4 mb-8 flex-wrap">
        {["mutual", "sent", "received", "rejected"].map((key) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`px-4 py-2 rounded-full ${
              tab === key
                ? "bg-deepPlum text-white"
                : "bg-white text-mutedBlack border"
            }`}
          >
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </button>
        ))}
      </div>

      {/* Interest List */}
      <div className="w-screen grid max-[440px]:grid-cols-1 max-md:grid-cols-2 max-[1350px]:grid-cols-3 min-[1350px]:grid-cols-4 gap-6">
        {data.length === 0 ? (
          <p className="text-center col-span-3 text-mutedBlack">
            No records found.
          </p>
        ) : (
          data.map((item) => {
            const profile =
              tab === "received" ? item.sender : item; // sender only for received tab
            const interestId = item._id;

            return (
              <InterestCard
                key={interestId}
                profile={profile}
                onAccept={
                  tab === "received" ? () => handleAccept(interestId) : null
                }
                onReject={
                  tab === "received" ? () => handleReject(interestId) : null
                }
                showChat={tab === "mutual"}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default Interests;
