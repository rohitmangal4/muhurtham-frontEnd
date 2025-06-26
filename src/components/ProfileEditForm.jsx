// src/components/ProfileEditForm.jsx
import { useState, useEffect } from "react";
import PrimaryButton from "./PrimaryButton";

const ProfileEditForm = ({ initialData = {}, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    community: "",
    location: "",
    ...initialData,
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto bg-white p-6 rounded shadow-md"
    >
      <h2 className="text-2xl font-bold text-deepPlum mb-4 text-center">
        Update Your Profile
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <select
          name="community"
          value={formData.community}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        >
          <option value="">Select Community</option>
          <option value="Iyer">Iyer</option>
          <option value="Iyengar">Iyengar</option>
          <option value="Chettiar">Chettiar</option>
          <option value="Pillai">Pillai</option>
          <option value="Mudaliar">Mudaliar</option>
        </select>
        <input
          type="text"
          name="location"
          placeholder="City or Town"
          value={formData.location}
          onChange={handleChange}
          className="border p-2 rounded col-span-full"
          required
        />
      </div>

      <div className="mt-6 text-center">
        <PrimaryButton label="Save Profile" type="submit" />
      </div>
    </form>
  );
};

export default ProfileEditForm;
