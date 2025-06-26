import { useEffect, useState } from "react";
import axios from "axios";
import PrimaryButton from "../components/PrimaryButton";
import Loader from "../components/Loder";
import ProfileCardView from "../components/ProfileCardView";
import { toast } from "react-toastify";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("muhurthamUser"));
  const userId = user?.id;
  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  console.log("profile...." + profile)

  const fetchProfile = async () => {
    try {
      const res = await axios.get(
        `http://localhost:7000/api/user/me/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setProfile(res.data);
    } catch (err) {
      console.error("Failed to load profile");
    }
  };

  const calculateAge = (dobString) => {
    const today = new Date();
    const dob = new Date(dobString);
    let age = today.getFullYear() - dob.getFullYear();
    const m = today.getMonth() - dob.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
      age--;
    }
    return age;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "dob") {
      const age = calculateAge(value);
      setProfile((prev) => ({ ...prev, dob: value, age }));
    } else if (name === "hobbies") {
      setProfile((prev) => ({
        ...prev,
        hobbies: value.split(",").map((h) => h.trim()),
      }));
    } else {
      setProfile((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const res = await axios
        .put(`http://localhost:7000/api/user/update/${userId}`, profile, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((res) => {
          toast.success("Profile updated successfully");
          setProfile(res.data);
          setEditMode(false);
        }).catch((error)=>{
          toast.error("Failed to update profile");
        })
    } catch (err) {
      alert("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (!profile) return <Loader />;

  const inputStyle = "border p-2 rounded w-full";

  return (
    <div className="min-h-screen pt-12 px-4 py-8 bg-white max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold text-deepPlum text-center">
        My Profile
      </h2>

      {!editMode ? (
        <ProfileCardView profile={profile} onEdit={() => setEditMode(true)} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="fullName"
            value={profile.fullName || ""}
            onChange={handleChange}
            className={inputStyle}
            placeholder="Full Name"
          />
          <input
            name="email"
            value={profile.email || ""}
            onChange={handleChange}
            className={inputStyle}
            placeholder="Email"
            disabled
          />
          <input
            name="mobile"
            value={profile.mobile || ""}
            onChange={handleChange}
            className={inputStyle}
            placeholder="Mobile"
            disabled
          />

          <select
            name="gender"
            value={profile.gender || ""}
            onChange={handleChange}
            className={inputStyle}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>

          <select
            name="profileCreatedBy"
            value={profile.profileCreatedBy || ""}
            onChange={handleChange}
            className={inputStyle}
          >
            <option value="">Profile Created By</option>
            <option value="myself">Myself</option>
            <option value="son">Son</option>
            <option value="daughter">Daughter</option>
            <option value="relative">Relative</option>
            <option value="friend">Friend</option>
          </select>

          <input
            name="dob"
            type="date"
            value={profile.dob || ""}
            onChange={handleChange}
            className={inputStyle}
          />
          <input
            name="age"
            value={profile.age || ""}
            disabled
            className={inputStyle}
            placeholder="Age"
          />

          <select
            name="religion"
            value={profile.religion || ""}
            onChange={handleChange}
            className={inputStyle}
          >
            <option value="">Select Religion</option>
            <option value="hindu">Hindu</option>
            <option value="muslim">Muslim</option>
            <option value="christian">Christian</option>
            <option value="other">Other</option>
          </select>

          <select
            name="caste"
            value={profile.caste || ""}
            onChange={handleChange}
            className={inputStyle}
          >
            <option value="">Select Caste / Community</option>
            <option value="brahmin">Brahmin</option>
            <option value="vanniyar">Vanniyar</option>
            <option value="nair">Nair</option>
            <option value="mudaliar">Mudaliar</option>
            <option value="chettiar">Chettiar</option>
            <option value="reddy">Reddy</option>
            <option value="other">Other</option>
          </select>

          <input
            name="motherTongue"
            value={profile.motherTongue || ""}
            onChange={handleChange}
            className={inputStyle}
            placeholder="Mother Tongue"
          />
          <input
            name="education"
            value={profile.education || ""}
            onChange={handleChange}
            className={inputStyle}
            placeholder="Education"
          />
          <input
            name="occupation"
            value={profile.occupation || ""}
            onChange={handleChange}
            className={inputStyle}
            placeholder="Occupation"
          />
          <input
            name="income"
            value={profile.income || ""}
            onChange={handleChange}
            className={inputStyle}
            placeholder="Income"
          />
          <input
            name="location"
            value={profile.location || ""}
            onChange={handleChange}
            className={inputStyle}
            placeholder="Location"
          />
          <input
            name="height"
            value={profile.height || ""}
            onChange={handleChange}
            className={inputStyle}
            placeholder="Height"
          />
          <input
            name="weight"
            value={profile.weight || ""}
            onChange={handleChange}
            className={inputStyle}
            placeholder="Weight"
          />

          <select
            name="maritalStatus"
            value={profile.maritalStatus || ""}
            onChange={handleChange}
            className={inputStyle}
          >
            <option value="">Select Marital Status</option>
            <option value="single">Single</option>
            <option value="divorced">Divorced</option>
            <option value="widowed">Widowed</option>
          </select>

          <input
            name="hobbies"
            value={profile.hobbies?.join(", ") || ""}
            onChange={handleChange}
            className={inputStyle}
            placeholder="Hobbies (comma separated)"
          />

          <textarea
            name="bio"
            value={profile.bio || ""}
            onChange={handleChange}
            className="border p-2 rounded col-span-full"
            placeholder="Short Bio"
            rows={3}
          />

          <div className="col-span-full flex gap-4">
            <PrimaryButton
              label={loading ? "Saving..." : "Save"}
              onClick={handleUpdate}
            />
            <button
              onClick={() => setEditMode(false)}
              className="px-4 py-2 border rounded text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
