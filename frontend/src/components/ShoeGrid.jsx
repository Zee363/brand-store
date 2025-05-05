import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ShoeCard from "./Shoecards";
import "../styles/ShoeGrid.css";


const ShoeGrid = ({ onEdit, onDelete }) => {
  const [shoes, setShoes] = useState(shoesData);
  
  return (
    <div className="shoe-grid p-6 container-fluid">
      <div className="row">
        {shoes.map((shoe) => (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" key={shoe.id}>
          <ShoeCard shoe={shoe}  onEdit={onEdit} onDelete={onDelete} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShoeGrid;
