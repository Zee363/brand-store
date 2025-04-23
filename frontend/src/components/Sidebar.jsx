import React from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css"; // Import Bootstrap Icons
import { getUserRole } from "../utils/auth"; 
import "../styles/Sidebar.css"; // Assuming you have a CSS file for styling

const Sidebar = () => {
    const role = getUserRole();

    return (
        <div className="sidebar p-3 text-white bg-dark" style={{ minHeight: "100vh", width: "250px" }}>
            <h4 className="mb-4">Stride Select</h4>
      <ul className="nav flex-column">
        <li className="nav-item mb-2">
        <i class="bi bi-house-door"></i> {"  "}
            <Link to="/dashboard">Dashboard</Link>
        </li>

        {role === 'brand_user' && (
          <>
            <li><Link to="/my-shoes">My Shoes</Link></li>
            <li><Link to="/create-shoe">Add New Shoe</Link></li>
            <li><Link to="/profile">Edit Profile</Link></li>
          </>
        )}

        {role === 'super_admin' && (
          <>
            <li><Link to="/admin-users">Manage Users</Link></li>
            <li><Link to="/all-shoes">All Shoes</Link></li>
          </>
        )}

        <li>
        <i className="bi bi-box-arrow-left me-2"></i>
            <Link to="/logout" className="text-danger">Logout</Link>
            </li>
      </ul>
    </div>
    )
}
    

export default Sidebar;