import React from 'react'
import "../pages/register.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [otpDigits, setOtpDigits] = useState(['', '', '', '']);
  const navigate = useNavigate();

  const handleDigitChange = (index, value) => {
    const updatedDigits = [...otpDigits];
    updatedDigits[index] = value;
    setOtpDigits(updatedDigits);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/password/passwordreset', { email })
        .then(response => {
          if (response.status === 200) {
            // alert("Email sent successfully");
            alert(response.data);
          }
        }).catch(error => {
          if (error.response.status === 404) {
            alert("User Not Found!");
          } else if (error.response.status === 500) {
            alert("An error occurred while sending the email");
          }
        }).catch(error => {
          console.log(error);
        })
    } catch (error) {
      console.log(error);
    }
  };


  const handleSubmitOTP = async (e) => {
    e.preventDefault();
    const userOTP = otpDigits.join('');
    // console.log(otp);
    try {
      await axios.post("http://localhost:8080/api/password/verifyOTP", {
        email,
        otp: userOTP
      }).then(response => {
        console.log(response);
        if (response.status === 200) {
          alert("OTP verified successfully");
          navigate("/changePassword",{state : {message :email}});
        }
      }).catch(error => {
        if (error.response.status === 401) {
          alert("Invalid OTP");
        } else if (error.response.status === 400) {
          alert("OTP not found");
        } else if (error.response.status === 500) {
          alert("An error occurred");
        }
      })
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="body">
      <div className="image-container">
        <img src={require("../images/Login.jpg")} alt="Register" />
      </div>
      <div className="space-container"></div>
      <div className="container" style={{ width: "400px", height: "400px" }}>
        <form onSubmit={handleSubmit}>
          <h2>Forget Password</h2>
          <div>
            <label>Email</label>
            <br />
            <input
              type="text"
              placeholder="Enter Email"
              name="Email"
              autoComplete="off"
              required
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </div>
          <button type="submit">Get OTP</button>
        </form>

        <form onSubmit={handleSubmitOTP} style={{ marginTop: '20px' }}>
          {otpDigits.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleDigitChange(index, e.target.value)}
              style={{ width: "30px", marginRight: "10px" }}
              required
            />
          ))}
          <br />
          <button type="submit">Verify OTP</button>
        </form>
      </div>
    </div>
  );
}

export default ForgetPassword;