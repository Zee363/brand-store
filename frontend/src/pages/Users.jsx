import React, { useEffect, useState } from "react";
import axios from "axios";
import { getUserRole } from "../utils/auth";
import BackButton from "../components/BackArrow";
import "../styles/BackButton.css";

const Users = () => {
  const [users, setUsers] = useState([]);
  const role = getUserRole();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_PORT}/admin/users`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUsers(res.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    if (role === "super_admin") {
      fetchUsers();
    }
  }, [role]);

  if (role !== "super_admin") {
    return <div className="container mt-4 text-danger">Access Denied</div>;
  };

  
  const handleDelete = async (userId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;
  
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${process.env.REACT_APP_BACKEND_PORT}/admin/delete/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
  
      // Update local state after deletion
      setUsers(prevUsers => prevUsers.filter(user => user._id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user.");
    }
  };

  return (
    <div className="container mt-4">
        <BackButton />
      <h2 className="mb-4">Manage Users</h2>
      <table className="table table-striped">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Brand</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map(user => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{user.brand || "N/A"}</td>
                <td>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDelete(user._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr><td colSpan="4">No users found.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
