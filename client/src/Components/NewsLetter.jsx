import React, { useEffect, useState } from "react";
import axios from 'axios';

function NewsLetter() {
  const [Email, setEmail] = useState();

  const handelSubmit = async (e) =>{
    e.preventDefault();
    try{
      const response = await axios.post(`http://localhost:8080/api/newsletter`,Email)
      if(response.status === 200){
        alert('Sign Up For NewsLetters is Successful!!');
      }
    }catch(error){
      if(error.response.status === 500){
        alert('You have already sign up for NewsLetter. Thanks!!');
      }
    }
  }

  return (
    <div>
      <div className="news">
        <div className="news-text">
          <h4 id="news-h4">Sign Up For NewsLetters</h4>
          <br></br>
          <p id="news-p">
            Get E-mail updates about our latest collections and{" "}
            <span>special offers.</span>
          </p>
        </div>
        <div className="news-form">
          <form onSubmit={handelSubmit}>
            <input
              type="text"
              placeholder="Your email address"
              name="Email"
              id="Email"
              required 
              autoComplete="off"
              onChange={(e) => setEmail(setEmail(e.target.value))}
            />
            <button id="news-button">Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default NewsLetter;
