import React from "react";
import { Link } from "react-router-dom";
import "../Components/Navbar.css";

function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/register">Sign Up</Link>
        </li>
        <li>
          <Link to="/login">Sign In</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
