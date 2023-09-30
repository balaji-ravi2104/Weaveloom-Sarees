import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../styles/Navbar.css";
import logoImage from "../images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { authActions } from "../store";
axios.defaults.withCredentials = true;

function Navbar({user}) {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const navigate = useNavigate();
  const [showUserDetails, setShowUserDetails] = useState(false);

  const sendLogoutReq = async () => {
    const res = await axios.post(`http://localhost:8080/api/auth/logout`);

    if (res.status === 200) {
      localStorage.removeItem("authToken");
      return res;
    }
    return new Error("Unable to logout");
  };

  const handelLogout = async () => {
    sendLogoutReq()
      .then(() => dispatch(authActions.logout()))
      .then(() => {
        navigate("/");
      });
  };

  const toogleUserDetails = () => {
    setShowUserDetails(!showUserDetails);
  };
  return (
    <div className="nav-header">
      <img src={logoImage} alt="logo"></img>
      <div>
        <ul className="nav-list">
          {!isLoggedIn && (
            <>
              <NavLink className="nav-item" to="/register">
                SignUp
              </NavLink>
              <NavLink className="nav-item" to="/login">
                SignIn
              </NavLink>
            </>
          )}
          {isLoggedIn && (
            <>
              <NavLink className="nav-item" to="/home">
                Home
              </NavLink>
              <NavLink className="nav-item" to="/shop">
                Shop
              </NavLink>
              <NavLink className="nav-item" to="/blog">
                Blog
              </NavLink>
              <NavLink className="nav-item" to="/about">
                About
              </NavLink>
              <NavLink className="nav-item" to="/contact">
                Contact
              </NavLink>
              <NavLink className="nav-item" to="/cart">
                <FontAwesomeIcon icon={faShoppingCart} />
              </NavLink>
              <div
                className={`user-details-container ${
                  showUserDetails ? "active" : ""
                }`}
              >
                <div className="user-details">
                  <button className="close-button" onClick={toogleUserDetails}>
                    <i className="fas fa-times"></i>
                  </button>
                  <p>Welcome to the Indian Weaving Clothing Company {user}!!</p>
                  <button className="logout" onClick={handelLogout}>Logout</button>
                </div>
              </div>
              <button className="nav-profile" onClick={toogleUserDetails}>
                p
              </button>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Navbar;