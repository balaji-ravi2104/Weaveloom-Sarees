import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import Features from "../Components/Features";
import "../styles/Home.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import Banner from "../Components/Banner";
import NewsLetter from "../Components/NewsLetter";
import Footer from "../Components/Footer";
import { authActions } from "../store";
import HomeSarees from "../Components/HomeSarees";
axios.defaults.withCredentials = true;

function Home() {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState();
  const [id, setId] = useState();
  const navigate = useNavigate();

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

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const sendRequest = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/user`, {
        withCredentials: true,
      });
      const data = res.data;
      return data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const checkAuthentication = async () => {
    const data = await sendRequest();
    if (data) {
      dispatch(authActions.login());
      setUser(data.username);
      setId(data._id);
    }
  };

  const checkIsLoggedIn = async () =>{
    dispatch(authActions.login());
    const isTokenValid = localStorage.getItem("authToken");
    if(!isTokenValid){
      alert("You are not logged in!! Please login and Continue");
      dispatch(authActions.logout());
      navigate("/login");
    }else{
      dispatch(authActions.login());
    }
  }

  useEffect(() => {
    checkIsLoggedIn();
    fetchSarees();
    scrollToTop();
    checkAuthentication();
  }, []);

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div id="main-container">
        <h4 id="main-h4">Trade-in-offer</h4>
        <h2 id="main-h2">Super value deals</h2>
        <h1 id="main-h1">On all Sarees</h1>
        <p id="main-p">Save more money with cupons & up to 80% off!</p>
        {/* <p>User-{user}</p>
        <p>User-ID-{id}</p> */}
        <br></br>
        <button
          className="main-button"
          onClick={() => {
            navigate("/shop");
          }}
        >
          Shop Now
        </button>
      </div>

      {/* Feature section */}
      <Features />

      {/* fetching sarees images */}
      <HomeSarees products={products} />

      {/* Banner Section */}
      <div>
        <Banner />
      </div>

      {/* fetching sarees images */}
      <HomeSarees products={products} />

      {/* Newsletter Section */}
      <div>
        <NewsLetter />
      </div>

      {/* Footer */}
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default Home;
