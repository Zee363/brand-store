import React, {useState} from "react";
import { Link } from "react-router-dom";
import "../styles/Signup.css";

const Signup = () => {
    const [formData, setFormData] = useState({
        name: "", 
        email: "",
        password: "",   
        brand: "",
        role:"",
    });

     const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

        const handleSubmit = async (e) => {
            e.preventDefault();
            console.log("Form submitted:", formData);  
            
            try {
                const response = await fetch("http://localhost:5002/register", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    console.error('Signup failed:', errorData);
                    throw new Error('Signup failed');
                  }

                const data = await response.json();
                console.log(data);
            }
            catch (error) {
                console.error("Error:", error);
            }
        }


        return (
            <div className="signup-container container-fluid">
               <form onSubmit={handleSubmit}>
                <h2 className="form-h2">SIGN UP</h2>
               <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required/>
                    </div>
                    <div className="form-group">
                    <label htmlFor="brand">Brands</label>
                    <select name="brand" id="brand" value={formData.brand} onChange={handleChange} required>
                    <option value=""> Select a Brand</option>
                    <option value="Nike">Nike</option>
                    <option value="Adidas">Adidas</option>
                    <option value="Puma">Puma</option>
                    </select>
                </div>
                <div className="form-group">
                 <label htmlFor="role">Role</label>
                 <select name="role" id="role" value={formData.role} onChange={handleChange} required>
                 <option value="">Select a Role</option>
                 <option value="brand_user">Brand User</option>
                 <option value="super_admin">Super Admin</option>
                </select>
             </div>

                    <span className="last-buttons">
                    <button type="submit">Sign Up</button>
                    <p className="button-par text-white">Already have an account? {""}<Link to={"/login"}>Login</Link></p>
                    </span>
    
                </form>
            </div>
    )
}

export default Signup;