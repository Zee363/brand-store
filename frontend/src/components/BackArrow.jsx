// components/BackButton.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../styles/BackButton.css";

const BackButton = ({ to = -1, label = "Back" }) => {
  const navigate = useNavigate();

  return (
    <div>
    <button
      className="btn  d-flex align-items-center"
      onClick={() => navigate(to)}
    >
      <i className="bi bi-arrow-left me-2"></i>
      {label}
    </button>
    </div>
  );
};

export default BackButton;
