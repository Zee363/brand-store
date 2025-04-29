import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Sidebar from "../components/Sidebar";
import ShoeCard from "../components/Shoecards";
import ShoeGrid from "../components/ShoeGrid";
import "../styles/Sidebar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Dashboard.css";  

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
});
    
    const [shoes, setShoes] = useState(() => {
    const storedShoes = localStorage.getItem("shoes");
    return storedShoes ? JSON.parse(storedShoes) : [];

  });

  const [newShoe, setNewShoe] = useState({
    name: "",
    image: "",
    description: "",
    size: "",
    brandId: "",
    price: "",
  });

  useEffect(() => {
    const fetchData = async () => {
    const token = localStorage.getItem("token");
    console.log("Token from localStorage:", token); 

      try {
        const decodedToken = jwtDecode(token);
        setCurrentUser(decodedToken); 

        const response = await axios.get("http://localhost:5002/admin/users", {
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

  
    const handleCreateShoe = async (e) => {
    e.preventDefault();

    const brandId = currentUser.role === "brand_user" ? currentUser.brandId : newShoe.brandId;
    if (!currentUser || (currentUser.role !== "brand_user" && currentUser.role !== "super_admin")) {
      alert("You are not authorized to create shoes.");
      return;
    }

    const token = localStorage.getItem("token");


    try {
      const response = await axios.post("http://localhost:5002/shoes/create", newShoe,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

    const addShoe = response.data;
    console.log(newShoe);
    
        setShoes([...shoes, addShoe]);
        
        // reset form fields
        setNewShoe({
            id: "",
            name: "",
            price: "",
            brandId: "",
            description: "",
            size: "",
            image: "",
        });
      } catch (error) {
        console.error("Error creating shoe:", error);
        alert("Error creating shoe. Please try again.");
      }
    };

  const handleEditShoe = async (id) => {  
   
    try {
      const shoe = shoes.find((shoe) => shoe.id === id);

      if (!shoe) {
        alert("Shoe not found");
        return;
      } 

      if ( currentUser.role === "brand_user" || shoe.brandId === currentUser.brandId ) {
      setEditingShoeId(id);
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
    const response = await axios.put(`http://localhost:5002/shoes/update/${editingShoeId}`, editedShoe, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    
    console.log('Shoe updated:', response.data);

    // Update the shoes state locally
    setShoes((prevShoes) =>
      prevShoes.map((shoe) =>
        shoe.id === editingShoeId ? { ...shoe, ...editedShoe } : shoe
      )
    );  

    setEditingShoeId(null);
    setEditedShoe({
      name: "",
      image: "",
      description: "",
      size: "",
      price: "",
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
    const response = await axios.delete(`http://localhost:5002/shoes/delete/${shoeId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Shoe deleted successfully:", response.data);

    // Update local state by filtering out deleted shoe
    setShoes((prevShoes) => prevShoes.filter((shoe) => shoe.id !== shoeId));
    
  } catch (error) {
    console.error("Error deleting shoe:", error);
    const message = error.response?.data?.message || "Failed to delete shoe. Please try again.";
    alert(message);
  }
};



    return (
        <div style={{ display: "flex", minHeight: "100vh" }}>
        <Sidebar />
  
        <div style={{ padding: "1rem" }}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Dashboard</h2>
         </div>

         {/* Form to create a new shoe */}
        <form onSubmit={handleCreateShoe} className="mb-4  dashboard-form">
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
                placeholder="brand"
                value={newShoe.brandId}
                onChange={(e) =>
                  setNewShoe({ ...newShoe, brandId: e.target.value })
                }
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
              <button type="submit" className="btn btn-secondary">
                Add
              </button>
            </div>
          </div>
        </form>

  

          <div className="row">
            <ShoeGrid shoes={shoes} onEdit={handleEditShoe}/>
            {shoes.map((shoe) => (
            <div className="col-md-3" key={shoe.id}>
              {editingShoeId === shoe.id ? (
                <form onSubmit={handleUpdateShoe}>
                  <input
                    type="text"
                    className="form-control mb-1"
                    value={editedShoe.name}
                    onChange={(e) => setEditedShoe({ ...editedShoe, name: e.target.value })}
                    placeholder="Shoe Name"
                  />
                  <input
                    type="text"
                    className="form-control mb-1"
                    value={editedShoe.image}
                    onChange={(e) => setEditedShoe({ ...editedShoe, image: e.target.value })}
                    placeholder="Image URL"
                  />
                  <input
                    type="text"
                    className="form-control mb-1"
                    value={editedShoe.description}
                    onChange={(e) => setEditedShoe({ ...editedShoe, description: e.target.value })}
                    placeholder="Description"
                  />
                  <input
                    type="number"
                    className="form-control mb-1"
                    value={editedShoe.price}
                    onChange={(e) => setEditedShoe({ ...editedShoe, price: e.target.value })}
                    placeholder="Price"
                  />
                  <button type="submit" className="btn btn-success btn-sm me-2">Update</button>
                  <button type="button" className="btn btn-secondary btn-sm" onClick={() => setEditingShoeId(null)}>Cancel</button>
                </form>
              ) : (
                <ShoeCard shoe={shoe} onEdit={() => handleEditShoe(shoe.id)} onDelete={() => handleDelete(shoe.id)} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;