import React,{useState,useEffect} from "react";
import Navbar from "../Components/Navbar";
import "../styles/Home.css";
// import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Shop.css";
import NewsLetter from "../Components/NewsLetter";
import Footer from "../Components/Footer";

function Shop() {
  const [products, setProducts] = useState([]);
  // const navigate = useNavigate();

  const fetchSarees = async () => {
    try {
      await axios
        .get(`http://localhost:8080/api/products`)
        .then((response) => {
          setProducts(response.data);
        }).catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    fetchSarees();
  }, []);

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div id="shop-header"></div>
      
      {products.length>0 ? (
          <div id="product-main">
          <div className="pro-container">
          {products.map((e, i) => (
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
        ):(
          <div>Loading</div>
        )}

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
