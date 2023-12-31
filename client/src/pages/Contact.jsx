import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import "../styles/Contact.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Balaji from "../images/people/Balaji.JPG";
import Parthipan from "../images/people/Parthipan.JPG";
import Bhuvanesh from "../images/people/Bhuvanesh.JPG";
import NewsLetter from "../Components/NewsLetter";
import Footer from "../Components/Footer";
import axios from "axios";
import { authActions } from "../store";

function Contact() {
  const dispatch = useDispatch();
  const nagivate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "", 
    subject: "",
    feedback: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateEmail = (email) => {
    // Regular expression for email validation
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handelSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(formData.email)) {
      alert("Please enter a valid email address.");
      return;
    }

    const apiurl = `http://localhost:8080/api/feedback/create`;
    const payload = {
      username : formData.username,
      email : formData.email,
      subject : formData.subject,
      feedback : formData.feedback,
    };

    try {
      const response = await axios.post(apiurl,payload);
      if(response.status === 200){
        alert("Feedback Send Successfully!!");
      }else if(response.status === 500){
        alert("Something Went Wrong! Try again later!!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkIsLoggedIn = async () =>{
    dispatch(authActions.login());
    const isTokenValid = localStorage.getItem("authToken");
    if(!isTokenValid){
      alert("You are not logged in!! Please login and Continue");
      dispatch(authActions.logout());
      nagivate("/login");
    }else{
      dispatch(authActions.login());
    }
  }

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
      <div>
        <Navbar />
      </div>
      <div id="contact-header">
        <h2>#let's_talk</h2>
        <p>LEAVE A MESSAGE.We love to hear from you!</p>
      </div>
      <div id="contact-details">
        <div class="details">
          <span>GET IN TOUCH</span>
          <h2>Visit one of our shop locations or contact us today</h2>
          <h3>Head Office</h3>
          <div>
            <li>
              <i class="fa-sharp fa-regular fa-map"></i>
              <p>4th street, Hope College, Coimbatore, TamilNadu</p>
            </li>
            <li>
              <i class="fa-regular fa-envelope"></i>
              <p>iwcc@gmail.com</p>
            </li>
            <li>
              <i class="fas fa-phone"></i>
              <p>+91 9876523145</p>
            </li>
            <li>
              <i class="far fa-clock"></i>
              <p>Monday to Saturday: 9:00am to 16:00pm</p>
            </li>
          </div>
        </div>
        <div className="map-details">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.1946746388685!2d77.01890826459146!3d11.024015942153767!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba8578504ccd143%3A0xf6d770ee9054632b!2sHope%20College%2C%20Peelamedu%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1679378130459!5m2!1sen!2sin"
            width="600"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Maps - Hope College, Peelamedu, Tamil Nadu"
          ></iframe>
        </div>
      </div>

      <div id="form-details">
        <form onSubmit={handelSubmit}>
          <span>LEAVE MESSAGE</span>
          <h2>We love to here from you</h2>
          <input
            type="text"
            placeholder="Your Name"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            autoComplete="off"
            required
          ></input>
          <input
            type="text"
            placeholder="E-mail"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            autoComplete="off"
            required
          ></input>
          <input
            type="text"
            placeholder="Subject"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
            autoComplete="off"
            required
          ></input>
          <textarea
            cols="30"
            rows="10"
            placeholder="Your Message"
            id="feedback"
            name="feedback"
            value={formData.feedback}
            onChange={handleInputChange}
            autoComplete="off"
            required
          ></textarea>
          <button class="Button">Submit</button>
        </form>

        <div className="people">
          <div>
            <img src={Balaji} alt="balaji" />
            <p>
              <span>Balaji Ravi</span> CEO <br></br>
              Phone: +91 9345603293 <br></br> Email: balajiiwcc@gmail.com
            </p>
          </div>

          <div>
            <img src={Parthipan} alt="Parthipan" />
            <p>
              <span>Parthipan Manikandan</span> Director <br></br>
              Phone: +91 9789494627 <br></br> Email: parthipaniwcc@gmail.com
            </p>
          </div>

          <div>
            <img src={Bhuvanesh} alt="Bhuvanesh" />
            <p>
              <span>Bhuvanesh Boopathi</span> Sales Manager <br></br>
              Phone: +91 6383373886 <br></br> Email: bhuvaniwcc@gmail.com
            </p>
          </div>
        </div>
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

export default Contact;
