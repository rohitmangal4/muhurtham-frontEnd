import { useEffect, useState } from "react";
import axios from "axios";

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [interests, setInterests] = useState([]);

  const admin = JSON.parse(localStorage.getItem("muhurthamUser"));

  const fetchUsers = async () => {
    try {
      const res = await axios.get("https://muhurtham-backend.onrender.com/api/admin/users");
      setUsers(res.data);
    } catch (err) {
      console.error("User fetch failed", err);
    }
  };

  const fetchInterests = async () => {
    try {
      const res = await axios.get("https://muhurtham-backend.onrender.com/api/admin/interests");
      setInterests(res.data);
    } catch (err) {
      console.error("Interest fetch failed", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure to delete this user?")) return;

    try {
      await axios.delete(`https://muhurtham-backend.onrender.com/api/admin/user/${id}`);
      fetchUsers();
    } catch (err) {
      alert("User delete failed");
    }
  };

  useEffect(() => {
    if (admin?.role === "admin") {
      fetchUsers();
      fetchInterests();
    }
  }, [admin]);

  if (!admin || admin.role !== "admin") {
    return <p className="text-center mt-20">Unauthorized access</p>;
  }

  return (
    <div className="min-h-screen pt-20 px-4 py-10 bg-linen">
      <h2 className="text-3xl font-bold text-deepPlum mb-6 text-center">
        Admin Panel
      </h2>

      {/* 🔹 Users Table */}
      <div className="overflow-x-auto mb-10">
        <h3 className="text-xl font-semibold mb-3">All Users</h3>
        <table className="min-w-full bg-white rounded shadow-md text-sm">
          <thead>
            <tr className="bg-warmPeach text-black">
              <th className="px-4 py-2">Name</th>
              <th>Email</th>
              <th>Gender</th>
              <th>Role</th>
              <th>Created By</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id} className="border-t">
                <td className="px-4 py-2">{u.name}</td>
                <td>{u.email}</td>
                <td>{u.gender || "-"}</td>
                <td>{u.role}</td>
                <td>{u.profileCreatedBy}</td>
                <td>
                  {u.role !== "admin" && (
                    <button
                      onClick={() => handleDelete(u._id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 🔹 Interests Table */}
      <div className="overflow-x-auto">
        <h3 className="text-xl font-semibold mb-3">All Interests</h3>
        <table className="min-w-full bg-white rounded shadow-md text-sm">
          <thead>
            <tr className="bg-warmPeach text-black">
              <th className="px-4 py-2">Sender</th>
              <th>Receiver</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {interests.map((i) => (
              <tr key={i._id} className="border-t">
                <td className="px-4 py-2">{i.sender?.name}</td>
                <td>{i.receiver?.name}</td>
                <td>{i.status}</td>
                <td>{new Date(i.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin;
