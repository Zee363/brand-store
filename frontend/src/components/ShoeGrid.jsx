import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ShoeCard from "./Shoecards";
import "../styles/ShoeGrid.css";


const shoesData = [
    { id: 1, name: "Nike Air Max Portal", image: "/air-max-portal.png", description: "A comfortable and stylish everyday sneaker fr women.", price: 2200, size: 5 },
    { id: 2, name: "Adidas Campus 00s", image: "/adidas-camous.webp", description: "Perfect for running and casual and laid back aesthetic.", price: 1600, size: 3 },
    { id: 3, name: "Puma King Indoor", image: "/king-indoor.avif", description: "Retro design with modern look, feel and definitely comfort .", price: 3000, size: 4 },
    { id: 4, name: "Reebok Club C Grounds", image: "/club-c-grounds.webp", description: "Pairs well with a very cool, laid back, and baggy aesthetic", price: 1044, size: 6 },
    { id: 5, name: "Nike Air Max Plus", image: "/air-max-plus.avif", description: "New-school vibes, all-day comfort. Simple but loud,", price: 2000, size: 3 },
    { id: 6, name: "Adidas Samba XLG", image: "/adidas-hero.avif", description: "Classic street style, reimagined and modern.", price: 2500, size: 5 },
    { id: 7, name: "Palermo Elevata", image: "/puma-hero.avif", description: "Sporty meets sleek.Elevate your look.", price: 1900,size: 5 },
    { id: 8, name: "Reebok Club C Exra", image: "/reebok-hero.webp", description: "Classic court style meets modern edge.", price: 1519, size: 6 },
  ];

const ShoeGrid = ({ onEdit, onDelete }) => {
  const [shoes, setShoes] = useState(shoesData);
  
  return (
    <div className="p-6">
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
