import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../components/Loder";
import { FaUserCircle } from "react-icons/fa";
import Profile from "./Profile";
import ProfileCardView from "../components/ProfileCardView";

const ViewProfile = () => {
  const user = JSON.parse(localStorage.getItem("muhurthamUser"));
  const { id } = useParams();
  const [profile, setProfile] = useState();
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        await axios
          .get(`http://localhost:7000/api/user/view/${id}`, {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          })
          .then((res) => {
            setProfile(res.data);
            console.log(res.data);
          })
          .catch((error) => {
            toast.error(error.response.data.message);
          });
      } catch (error) {
        toast.error("Profile Not Found", error);
      }
    };

    fetchProfile();
  }, [id]);

  if (!profile) return <Loader />;

  return (
    <>
      <ProfileCardView profile={profile} />
    </>
  )
 
};

const InfoItem = ({ label, value }) => (
  <p className=" text-sm font-semibold text-mutedBlack">
    <strong >{label}:</strong> {value || "Not set"}
  </p>
);

export default ViewProfile;
