import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";
import logoImage from "../images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

function Navbar() {
  return (
    <div className="nav-header">
      <img src={logoImage} alt="logo"></img>
      <div>
          <ul className="nav-list">
            <Link className="nav-item" to="/home">
              Home
            </Link>
            <Link className="nav-item" to="/shop">
              Shop
            </Link>
            <Link className="nav-item" to="/blog">
              Blog
            </Link>
            <Link className="nav-item" to="/about">
              About
            </Link>
            <Link className="nav-item" to="/contact">
              Contact
            </Link>
            <Link className="nav-item" to="/cart">
            <FontAwesomeIcon icon={faShoppingCart} />
            </Link>
          </ul>
      </div>
    </div>
  );
}

export default Navbar;
