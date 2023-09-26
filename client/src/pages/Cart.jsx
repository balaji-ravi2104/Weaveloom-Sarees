import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authActions } from "../store";

function Cart() {
  const nagivate = useNavigate();
  const dispatch = useDispatch();

  const checkIsLoggedIn = async () => {
    const isTokenValid = localStorage.getItem("authToken");
    if (!isTokenValid) {
      alert("You are not logged in!! Please login and Continue");
      nagivate("/login");
    } else {
      dispatch(authActions.login());
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    scrollToTop();
    checkIsLoggedIn();
  }, []);
  return (
    <div>
      <Navbar />
    </div>
  );
}

export default Cart;
