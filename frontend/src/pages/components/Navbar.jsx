import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
    <div className='navbar-container container-fluid'> 
        <nav className="navbar navbar-expand-lg bg-body-tertiary rounded" aria-label="">
      <div className="container-fluid">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample11" aria-controls="navbarsExample11" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse d-lg-flex" id="navbarsExample11">
          <a className="navbar-brand col-lg-3 me-0" href="#">Stride Select</a>
          <ul className="navbar-nav col-lg-6 justify-content-lg-center">
            <li className="nav-item">
              <Link to="/" className="nav-link active" aria-current="page">Home</Link>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">Brands</a>
              <ul className="dropdown-menu">
                <li><Link to="/adidas" className="dropdown-item">Adidas</Link></li>
                <li><Link to="/nike" className="dropdown-item">Nike</Link></li>
                <li><Link to="/puma" className="dropdown-item">Puma</Link></li>
                <li><Link to="/reebok" className="dropdown-item">Reebok</Link></li>
              </ul>
            </li>
            <li className="nav-item">
              <Link to="/sneakers" className="nav-link">Sneakers</Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className="nav-link">About</Link>
            </li>
          </ul>
          <div className="d-lg-flex col-lg-3 justify-content-lg-end gap-2">
           <Link to="/signup"><button className="btn btn-primary">Sign Up</button></Link>
           <Link to="/login"><button className="btn btn-primary">Log In</button></Link>
          </div>
        </div>
      </div>
    </nav>
    </div>
    );
};

export default Navbar;
