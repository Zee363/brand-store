import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css"; // Import Bootstrap Icons
import { getUserRole } from "../utils/auth"; 
import "../styles/Sidebar.css"; // Assuming you have a CSS file for styling

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
        <Link to="/about"><i class="bi bi-house-door"></i></Link>
        </li>

        {role === 'brand_user' && (
          <>
            <li><Link to="">Adidas</Link></li>
            <li><Link to="">Nike</Link></li>
            <li><Link to="">Puma</Link></li>
            <li><Link to="">Reebok</Link></li>
          </>
        )}

        {role === 'super_admin' && (
          <>
            <li><Link to="/admin-users">Manage Users</Link></li>
            <li><Link to="/">All Shoes</Link></li>
          
            <li className="mt-3">
              <label htmlFor="brand-select" className="form-label text-white">Switch Brand</label>
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

        <li>
        <Link to="/logout" className="text-danger"><i className="bi bi-box-arrow-left me-2"></i></Link>
            </li>
      </ul>
    </div>
    )
}
    

export default Sidebar;