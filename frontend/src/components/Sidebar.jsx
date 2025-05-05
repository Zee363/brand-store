import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css"; 
import { getUserRole } from "../utils/auth"; 
import "../styles/Sidebar.css"; 

const Sidebar = () => {
    const role = getUserRole();
    const user = JSON.parse(localStorage.getItem("user"));
    const [selectedBrand, setSelectedBrand] = useState(user?.brand || "");


    const handleBrandChange = (e) => {
      const newBrand = e.target.value;
      const updatedUser = { ...user, brand: newBrand };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setSelectedBrand(newBrand);
      window.location.reload();
    };
    

    return (
        <div className="sidebar p-3 text-white" style={{ minHeight: "90vh" }}>
        <ul className="nav flex-column">
        <li className="nav-item mb-2">
        <Link to="/" className="nav-link text-white home-label"><i className="bi bi-house-door home"></i>Home</Link>
        </li>
        <li className="nav-item mb-2">
          <Link to="/about" className="nav-link text-white about-label"><i className="bi bi-info-circle me-2"></i>About</Link>
        </li>


        {/* Role-based Links */}
        {role === 'super_admin' && (
          <>
            <Link to="/users" className="nav-link text-white"><i class="bi bi-people-fill manage-users"></i>Manage Users</Link>
            
          
            <li className="mt-3">
              <label htmlFor="brand-select" className="form-label nav-link text-white"><i className="bi bi-arrow-left-right switch-arrows"></i>Switch Brands</label>
              <select
                id="brand-select"
                value={selectedBrand}
                onChange={handleBrandChange}
                className="form-select"
              >
                <option value="">Select Brand</option>
                <option value="Nike">Nike</option>
                <option value="Adidas">Adidas</option>
                <option value="Puma">Puma</option>
                <option value="Reebok">Reebok</option>
              </select>
            </li>
          </>
        )}

         {/* Auth Links */}
         <li className="nav-item mt-4">
          <Link to="/signup" className="btn btn w-100 mb-2 signup-button">Sign Up</Link>
          <Link to="/login" className="btn btn w-100 mb-2 login-button">Log In</Link>
        </li>

        <li>
        <Link to="/signup" className="nav-link  text-danger"><i className="bi bi-box-arrow-left me-2"></i></Link>
            </li>
      </ul>
    </div>
    )
}
    

export default Sidebar;