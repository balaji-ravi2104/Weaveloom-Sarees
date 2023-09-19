import React from "react";
import { Link } from "react-router-dom";
import "../Components/Navbar.css";
import logoImage from "../images/logo.png";

function Navbar() {
  return (
    <div className="nav-header">
      <img src={logoImage} alt="logo"></img>
      <div>
        <nav>
          <ul className="nav-list">
            <Link className="nav-item" to="/">
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
            <a href="/" id="close">
              <i class="fas fa-times"></i>
            </a>
          </ul>
        </nav>
      </div>
      <div id="mobile">
        <Link to="/cart">
          <i class="fa-soLinkd fa-cart-shopping"></i>
        </Link>
        <i id="bar" class="fas fa-outdent"></i>
      </div>
    </div>
  );
}

export default Navbar;
