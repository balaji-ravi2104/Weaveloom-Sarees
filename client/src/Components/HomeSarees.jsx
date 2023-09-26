import React from 'react';
import {Link} from 'react-router-dom';

const HomeSarees = ({products}) => {
  return (
    <div>
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
}

export default HomeSarees;
