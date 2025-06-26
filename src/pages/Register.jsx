import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PrimaryButton from "../components/PrimaryButton";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    password: "",
    gender: "",
    profileCreatedBy: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.profileCreatedBy) {
      return toast.error("Select who is creating the profile");
    }

    if (formData.profileCreatedBy === "myself" && !formData.gender) {
      return toast.error("Gender is required if created by yourself");
    }

    try {
      setLoading(true);
      const res = await axios.post("https://muhurtham-backend.onrender.com/api/auth/register", formData);
      localStorage.setItem("muhurthamUser", JSON.stringify(res.data));
      toast.success("Registered Successfully!");
      setTimeout(() => navigate("/home"), 1000);
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 px-4 py-12 bg-linen flex justify-center">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-8 w-full max-w-xl">
        <h2 className="text-3xl font-bold text-deepPlum text-center mb-6">
          Create Your Muhurtham Account
        </h2>

        <div className="grid grid-cols-1 gap-4">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            required
            className="border p-2 rounded"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="border p-2 rounded"
          />
          <input
            type="text"
            name="mobile"
            placeholder="Mobile Number"
            value={formData.mobile}
            onChange={handleChange}
            required
            className="border p-2 rounded"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="border p-2 rounded"
          />

          <select
            name="profileCreatedBy"
            value={formData.profileCreatedBy}
            onChange={handleChange}
            required
            className="border p-2 rounded"
          >
            <option value="">Profile created by?</option>
            <option value="myself">Myself</option>
            <option value="son">Son</option>
            <option value="daughter">Daughter</option>
            <option value="relative">Relative</option>
            <option value="friend">Friend</option>
          </select>

          {formData.profileCreatedBy === "myself" && (
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              className="border p-2 rounded"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          )}
        </div>

        <div className="mt-6 text-center">
          <PrimaryButton label={loading ? "Registering..." : "Register"} type="submit" />
        </div>

        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <span className="text-deepPlum font-semibold cursor-pointer" onClick={() => navigate("/")}>
            Login
          </span>
        </p>

      </form>
    </div>
  );
};

export default Register;
