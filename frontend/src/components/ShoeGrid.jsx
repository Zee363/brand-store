import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ShoeCard from "./Shoecards";
import "../styles/ShoeGrid.css";

const shoesData = [
    { id: 1, name: "Nike Air Max Portal", image: "/air-max-portal.png", description: "A comfortable and stylish everyday sneaker fr women.", price: 2200 },
    { id: 2, name: "Adidas Campus 00s", image: "/adidas-camous.webp", description: "Perfect for running and casual wear.", price: 1600 },
    { id: 3, name: "Puma King Indoor", image: "/king-indoor.avif", description: "Retro design with modern comfort.", price: 3000 },
    { id: 4, name: "Club C Grounds", image: "/club-c-grounds.webp", description: "Pairs well with a very cool, laid back aesthetic.", price: 1044 },
  ];

const ShoeGrid = () => {
  const [shoes, setShoes] = useState(shoesData);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Explore Our Shoes</h1>
      <div className="row">
        {shoes.map((shoe) => (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" key={shoe.id}>
          <ShoeCard key={shoe.id} shoe={shoe} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShoeGrid;