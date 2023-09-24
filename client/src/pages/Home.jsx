import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import Features from "../Components/Features";
import "../styles/Home.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Banner from "../Components/Banner";
import NewsLetter from "../Components/NewsLetter";
import Footer from "../Components/Footer";

function Home() {
  const [products, setProducts] = useState([]);
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

  const scrollToTop = () =>{
    window.scrollTo({
      top: 0,
      behavior: "smooth" 
    });
  }

  useEffect(() => {
    scrollToTop();
    fetchSarees();
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

      {products.length > 0 ? (
        <div id="product-main">
          <h2 id="product-main h2">Featured Products</h2>
          <p id="product-main p">Latest Collection new Morden Design</p>
          <div className="pro-container">
            {products.slice(0, 8).map((e, i) => ( 
              <div className="pro">
                <img src={e.img} alt={e.title} />
                <div className="des">
                  <span>{e.title}</span>
                  <h5>{e.desc}</h5>
                  <div class="star">
                    <li class="fas fa-star"></li>
                    <li class="fas fa-star"></li>
                    <li class="fas fa-star"></li>
                    <li class="fas fa-star"></li>
                    <li class="fas fa-star"></li>
                  </div>
                  <h4>Rs.{e.price}</h4>
                </div>
                <a href="/cart">
                  <li class="fa-solid fa-cart-shopping cart"></li>
                </a>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>Loading</div>
      )}

      {/* Banner Section */}
      <div>
        <Banner />
      </div>

      {products.length > 0 ? (
        <div id="product-main">
          <h2 id="product-main h2">Featured Products</h2>
          <p id="product-main p">Latest Collection new Morden Design</p>
          <div className="pro-container">
            {products.slice(0, 8).map((e, i) => (
              <div className="pro">
                <img src={e.img} alt={e.title} />
                <div className="des">
                  <span>{e.title}</span>
                  <h5>{e.desc}</h5>
                  <div class="star">
                    <li class="fas fa-star"></li>
                    <li class="fas fa-star"></li>
                    <li class="fas fa-star"></li>
                    <li class="fas fa-star"></li>
                    <li class="fas fa-star"></li>
                  </div>
                  <h4>Rs.{e.price}</h4>
                </div>
                <a href="/cart">
                  <li class="fa-solid fa-cart-shopping cart"></li>
                </a>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>Loading</div>
      )}

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
