import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Sidebar from "../components/Sidebar";
import ShoeCard from "../components/Shoecards";
import "../styles/Sidebar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Dashboard.css";  
import BackButton from "../components/BackArrow";

const Dashboard = () => {
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState(null) ;
    const [editingShoeId, setEditingShoeId] = useState(null);
    const [editedShoe, setEditedShoe] = useState({
     name: "",
     image: "",
     description: "",
     size: "",
     price: "",
     brand: "",
});
    
    const [shoes, setShoes] = useState([]);

  const [newShoe, setNewShoe] = useState({
    name: "",
    image: "",
    description: "",
    size: "",
    brand: "",
    price: "",
  });

  
  useEffect(() => {
    const fetchData = async () => {
    const token = localStorage.getItem("token");
    console.log("Token from localStorage:", token); 

      try {
        const decodedToken = jwtDecode(token);
        console.log("Decoded Token:", decodedToken);
        setCurrentUser(decodedToken); 

        const response = await axios.get(`${process.env.REACT_APP_BACKEND_PORT}/dashboard`, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });

      const data = response.data; 
      console.log("Fetched shoes:", data);
      setShoes(data);
    } catch (error) {
      console.error("Error fetching shoes:", error);
    } finally {
      setLoading(false);
    }
  };
  
      fetchData();
  }, []);

  const selectedBrand = localStorage.getItem("selectedBrand") || currentUser?.brand || "";

  let filteredShoes = shoes;

if (selectedBrand && selectedBrand !== "All Brands") {
  filteredShoes = shoes.filter(
    (shoe) => shoe.brand?.toLowerCase() === selectedBrand.toLowerCase()
  );
}


  if (loading) {
    return <div className="text-center">Loading shoes...</div>;
  }

  
    const handleCreateShoe = async (e) => {
    e.preventDefault();
    
    if (!currentUser || (currentUser.role !== "brand_user" && currentUser.role !== "super_admin")) {
      alert("You are not authorized to create shoes.");
      return;
    }

    
    const token = localStorage.getItem("token");

    const brand = currentUser.role === "brand_user" ? currentUser.brand : newShoe.brand;

    if (currentUser.role === "super_admin" && !brand) {
      console.log("Please enter a brand for the shoe.");
      alert("Super admin must provide a brand.");
      return;
    }

    const shoeToSend = { ...newShoe, brand}; 
    console.log("SENDING SHOE:", shoeToSend);


    try {

      const response = await axios.post(`${process.env.REACT_APP_BACKEND_PORT}/shoes/create`, shoeToSend, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

    const addedShoe = response.data;
    console.log("Shoe added:", addedShoe);

    setShoes((prevShoes) => [...prevShoes, addedShoe]);
        
        // reset form fields
        setNewShoe({
            name: "",
            image: "",
            description: "",
            size: "",
            brand: "",
            price: "",
        });
      } catch (error) {
        console.error("Error creating shoe:", error);
        alert("Error creating shoe. Please try again.");
      }
    };

  const handleEditShoe = async (shoeId) => {  
    try {
      const shoe = shoes.find((shoe) => shoe._id === shoeId);

      if (!shoe) {
        alert("Shoe not found");
        return;
      } 

      if (currentUser.role === "super_admin" || (currentUser.role === "brand_user" && shoe.brand === currentUser.brand)) {
      setEditingShoeId(shoeId);
      setEditedShoe(shoe);
    } else {
      alert("You are not authorized to edit this shoe.");
    }
  } catch (error) {
      console.error("Error fetching shoe for edit:", error);
      alert("Failed to fetch shoe details.");
    }
  }

    const handleUpdateShoe = async (e) => {
      e.preventDefault();
  
  const token = localStorage.getItem("token");

  try {
    const response = await axios.put(`${process.env.REACT_APP_BACKEND_PORT}/shoes/update/${editingShoeId}`, editedShoe, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    
    console.log('Shoe updated:', response.data);

    // Update the shoes state locally
    setShoes((prevShoes) =>
      prevShoes.map((shoe) =>
        shoe._id === editingShoeId ? { ...shoe, ...editedShoe } : shoe
      )
    );  

    setEditingShoeId(null);
    setEditedShoe({
      name: "",
      image: "",
      description: "",
      size: "",
      price: "",
      brand: "",
    });

  } catch (error) {
    console.error('Error updating shoe:', error);
    alert("Failed to update shoe. Please try again.");
  }
} 


const handleDelete = async (shoeId) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this shoe?");
  if (!confirmDelete) return;

  const token = localStorage.getItem("token");

  try {
    const response = await axios.delete(`${process.env.REACT_APP_BACKEND_PORT}/shoes/delete/${shoeId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Shoe deleted successfully:", response.data);

    // Update local state by filtering out deleted shoe
    setShoes((prevShoes) => prevShoes.filter((shoe) => shoe._id !== shoeId));
    
  } catch (error) {
    console.error("Error deleting shoe:", error);
    const message = error.response?.data?.message || "Failed to delete shoe. Please try again.";
    alert(message);
  }
};



    return (
        <div style={{ display: "flex", minHeight: "100vh" }}>
        <Sidebar />
        <BackButton />
  
        <div style={{ padding: "1rem" }}>
        <div className="d-flex justify-content-between align-items-center mb-4">
         </div>

         {/* Form to create a new shoe */}
        <form onSubmit={handleCreateShoe} className="mb-4  dashboard-form">
        <h3 style={{textAlign: "center", fontStyle: "italic"}}>Create Your Own Shoe!</h3>
          <div className="row">
            <div className="col-12">
              <input
                type="text"
                className="form-control"
                placeholder="Shoe Name"
                value={newShoe.name}
                onChange={(e) =>
                  setNewShoe({ ...newShoe, name: e.target.value })
                }
              />
            </div>
            <div className="col-12" >
              <input
                type="text"
                className="form-control"
                placeholder="Image URL"
                value={newShoe.image}
                onChange={(e) =>
                  setNewShoe({ ...newShoe, image: e.target.value })
                }
              />
            </div>
            <div className="col-12" >
              <input
                type="text"
                className="form-control"
                placeholder="Description"
                value={newShoe.description}
                onChange={(e) =>
                  setNewShoe({ ...newShoe, description: e.target.value })
                }
              />
            </div>
            <div className="col-12" >
              <input
                type="number"
                className="form-control"
                placeholder="Size"
                value={newShoe.size}
                onChange={(e) =>
                  setNewShoe({ ...newShoe, size: e.target.value })
                }
              />
            </div>
            <div  className="col-12" >
              <input
                type="text"
                className="form-control"
                placeholder="Brand"
                value={newShoe.brand || ""}
                onChange={(e) => {
                  console.log("Typed brand:", e.target.value);
                  setNewShoe({ ...newShoe, brand: e.target.value });
                }}
              />
            </div>
            <div className="col-12" >
              <input
                type="number"
                className="form-control"
                placeholder="Price"
                value={newShoe.price}
                onChange={(e) =>
                  setNewShoe({ ...newShoe, price: e.target.value })
                }
              />
            </div>
            <div className="col-12">
              <button type="submit" className="btn btn-secondary">Add</button>
            </div>
          </div>
        </form>

        <div className="row" style={{gap: "44px"}}>
          {filteredShoes.map((shoe) => (
            <div className="col-md-3 edit-cards" key={shoe._id}>
              {editingShoeId === shoe._id ? (
                <form onSubmit={handleUpdateShoe}>
                  {["name", "image", "description", "price"].map((field) => (
                    <input
                      key={field}
                      type={field === "price" ? "number" : "text"}
                      className="form-control mb-1"
                      value={editedShoe[field]}
                      onChange={(e) => setEditedShoe({ ...editedShoe, [field]: e.target.value })}
                      placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    />
                  ))}
                  <button type="submit" className="btn btn-success btn-sm me-2">Update</button>
                  <button type="button" className="btn btn-secondary btn-sm" onClick={() => setEditingShoeId(null)}>Cancel</button>
                </form>
              ) : (
                <ShoeCard shoe={shoe} onEdit={() => handleEditShoe(shoe._id)} onDelete={() => handleDelete(shoe._id)} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

          
export default Dashboard;