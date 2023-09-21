import React from 'react'
import "../styles/Home.css";

function Features() {
  return (
    <div className="feature" id="section-p1">
        <div className="feature-box">
          <img src={require("../images/features/f1.png")} alt="feature-1" />
          <h6 id="h6">Free Shipping</h6>
        </div>
        <div class="feature-box">
          <img src={require("../images/features/f2.png")} alt="feature-2" />
          <h6 id="h6">Online Order</h6>
        </div>
        <div class="feature-box">
          <img src={require("../images/features/f3.png")} alt="feature-3" />
          <h6 id="h6">Save Money</h6>
        </div>
        <div class="feature-box">
          <img src={require("../images/features/f4.png")} alt="feature-4" />
          <h6 id="h6">Promotions</h6>
        </div>
        <div class="feature-box">
          <img src={require("../images/features/f5.png")} alt="feature-5" />
          <h6 id="h6">Happy Sell</h6>
        </div>
        <div class="feature-box">
          <img src={require("../images/features/f6.png")} alt="feature-6" />
          <h6 id="h6">24/7 Support</h6>
        </div>
      </div>
  )
}

export default Features