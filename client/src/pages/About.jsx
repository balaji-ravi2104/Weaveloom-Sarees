import React, { useEffect, useRef } from "react";
import Navbar from "../Components/Navbar";
import "../styles/About.css";
import WeavingImage from "../images/Banner/B13.jpg";
import Features from '../Components/Features';
import NewsLetter from '../Components/NewsLetter';
import Footer from '../Components/Footer';

function About() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div id="about-header"></div>
      <div className="about-details">
        <img src={WeavingImage} alt="weaveing" />
        <div>
          <h2>Who we are?</h2>
          <p>
            Indian handloom weaving has a rich history spanning millennia,
            originating with the ancient Indus Valley Civilization. It thrived
            during the Mughal era, producing intricate textiles, and later faced
            challenges during colonial rule. However, post-independence efforts
            revitalized the industry, showcasing diverse regional traditions.
            Today, Indian handloom products enjoy global acclaim for their
            craftsmanship and artistic value.
          </p>
        </div>
      </div>

      <div id="about-video">
          <h1>Handloom Weaving Demo</h1>
          <div className="demo-video">

          </div>
      </div>

      <div>
        <Features />
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

export default About;
