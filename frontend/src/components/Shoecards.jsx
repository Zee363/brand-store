import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Shoecards.css";

const ShoeCard = ({ shoe, onEdit, onDelete }) => {
     if (!shoe) return null; 

    return (
        <div className="bg-white p-4 rounded-2xl shadow-md hover:shadow-lg transition">
        <img
          src={shoe.image}
          alt={shoe.name}
          className="w-full h-48 object-cover rounded-xl"
          style={{ width: "100%", height: "280px", objectFit: "cover" }}
        />
        <h2 className="text-xl font-semibold mt-3">{shoe.name}</h2>
        <p className="text-gray-500 text-sm mt-1">{shoe.description}</p>
        <p className="text-black font-bold mt-2">ZAR{" "}{shoe.price}</p>
        <p className="text-gray-500 text-sm mt-1">Size UK{" "}{shoe.size}</p>

        <span className="d-flex justify-content-between buttons">
        <button className="btn btn-sm edit-button" onClick={onEdit}>Edit</button> {""}
        <button className="btn btn-sm delete-button" onClick={onDelete}>Delete</button>
      </span>
        
      </div>
    );
};

export default ShoeCard;