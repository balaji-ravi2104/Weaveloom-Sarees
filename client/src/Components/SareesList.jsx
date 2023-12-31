import React,{useEffect,useRef} from "react";
import {Link} from 'react-router-dom'
import "../styles/Home.css";

const SareesList = ({ products,currentPage }) => {
  
  const sareesListRef = useRef(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (sareesListRef.current) {
      sareesListRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentPage]);


  return (
    <div ref={sareesListRef}>
      {products.length > 0 ? (
        <div id="product-main">
          <h2 id="product-main h2">Featured Products</h2>
          <p id="product-main p">Latest Collection new Morden Design</p>
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
                <Link to="/cart">
                  <li class="fa-solid fa-cart-shopping cart"></li>
                </Link>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
};

export default SareesList;
