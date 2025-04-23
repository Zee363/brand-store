import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Shoecards.css";

const ShoeCard = ({ shoe }) => {
    return (
        <div className="bg-white p-4 rounded-2xl shadow-md hover:shadow-lg transition">
        <img
          src={shoe.image}
          alt={shoe.name}
          className="w-full h-48 object-cover rounded-xl" style={{ width: "150%", height: "280px", objectFit: "cover" }}
        />
        <h2 className="text-xl font-semibold mt-3">{shoe.name}</h2>
        <p className="text-gray-500 text-sm mt-1">{shoe.description}</p>
        <p className="text-black font-bold mt-2">${shoe.price}</p>
      </div>
    )
}

export default ShoeCard;