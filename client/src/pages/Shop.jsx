import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import "../styles/Home.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import "../styles/Shop.css";
import NewsLetter from "../Components/NewsLetter";
import Footer from "../Components/Footer";
import SareesList from "../Components/SareesList";
import Pagination from "../Components/Pagination";
import { authActions } from "../store";

function Shop() {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(8);
  const nagivate = useNavigate();

  // const navigate = useNavigate();

  const fetchSarees = async () => {
    try {
      await axios
        .get(`http://localhost:8080/api/products`)
        .then((response) => {
          setProducts(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const scrollToTop = () =>{
    window.scrollTo({
      top: 0,
      behavior: "smooth" 
    });
  }

  const checkIsLoggedIn = async () =>{
    const isTokenValid = localStorage.getItem("authToken");
    if(!isTokenValid){
      alert("You are not logged in!! Please login and Continue");
      dispatch(authActions.logout());
      nagivate("/login");
    }else{
      dispatch(authActions.login());
    }
  }

  useEffect(() => {
    scrollToTop();
    fetchSarees();
    checkIsLoggedIn();
  }, []);

  // Calculation part of Pagination
  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currentPost  = products.slice(firstPostIndex,lastPostIndex);

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div id="shop-header"></div>

      <div>
        <SareesList products={currentPost} currentPage={currentPage}/>
        <Pagination totalPost={products.length} postPerPage={postPerPage} setCurrentPage={setCurrentPage} currentPage={currentPage} />
      </div>

      <div>
        <NewsLetter />
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
}

export default Shop;
