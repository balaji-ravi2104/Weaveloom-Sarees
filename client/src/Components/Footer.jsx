import React from "react";
import logo from "../images/logo.png";
import applogo from "../images/Pay/pay1.png";
import paymentlogo from "../images/Pay/pay2.png";

function Footer() {
  return (
    <div>
      <footer className="footer">
        <div className="footer-contact">
          <img className="logo-image" src={logo} alt="logo" />
          <h4>Contact</h4>
          <p>
            <strong>Address:</strong> 4th street, Hope College, Coimbatore, TamilNadu
          </p>
          <p>
            <strong>Phone:</strong> +91 9345603293 / +91 9789494627
          </p>
          <p>
            <strong>Hours:</strong> 10:00 - 20:00, Mon - Sat
          </p>
          <div className="footer-follow">
            <h4>Follow us</h4>
            <div className="icon">
              <i class="fab fa-facebook-f"></i>
              <i class="fab fa-twitter"></i>
              <i class="fab fa-instagram"></i>
              <i class="fab fa-pinterest-p"></i>
              <i class="fab fa-youtube"></i>
            </div>
          </div>
        </div>  

        <div className="footer-contact">
          <h4>About</h4>
          <a href="/">About us</a>
          <a href="/">Delivary Information</a>
          <a href="/">Privacy Policy</a>
          <a href="/">Terms & Conditions</a>
          <a href="/">Contact Us</a>
        </div>

        <div className="footer-contact">
          <h4>My Account</h4>
          <a href="/">Sign In</a>
          <a href="/">View Cart</a>
          <a href="/">My Wishlist</a>
          <a href="/">Track My order</a>
          <a href="/">Help</a>
        </div>

        <div className="footer-contact-install">
          <h4>Install App</h4>
          <p>From App Store or Google Play</p>
          <div className="footer-contact-row">
            <img src={applogo} alt="payment" />
            <p>Secured Payment Gateways</p>
            <img src={paymentlogo} alt="payment" />
          </div>
        </div>

        <div className="copyright">
            <p>@2023 By IWCC All Rights Reserved</p>
        </div>
        
      </footer>
    </div>
  );
}

export default Footer;
