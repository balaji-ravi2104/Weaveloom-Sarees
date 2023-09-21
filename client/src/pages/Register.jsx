import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/register.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Perform form validation
    const validationErrors = validate(username, email, password);
    setFormErrors(validationErrors);

    // Check if there are validation errors
    if (Object.keys(validationErrors).length === 0) {
      try{
        await axios.post('http://localhost:8080/api/auth/register',{
          username,
          email,
          password,
        }).then(response =>{
          if(response.status(200)){
            navigate("/login");
          }
        }).catch(e =>{
          if (e.response.status === 409) {
            alert("User Already Exists!! Login Instead");
            navigate("/login");
          } else {
            console.log("Error", e);
          }
        })
      }catch(error){
        console.log(error);
      }
    }
  };

  useEffect(() => {
    console.log(formErrors);
  }, [formErrors]);

  const validate = (name, email, password) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name) {
      errors.name = "UserName is Required!";
    }
    if (!email) {
      errors.email = "Email is Required!";
    } else if (!regex.test(email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!password) {
      errors.password = "Password is Required!";
    } else if (password.length < 4) {
      errors.password = "Password must be more than 4 characters!";
    } else if (password.length > 10) {
      errors.password = "Password must be less than 10 characters!";
    }
    return errors;
  };

  return (
    <div className="body">
      <div className="image-container">
        <img src={require("../images/Register.jpg")} alt="Register" />
      </div>
      <div className="space-container"></div>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <h2 id="h2">Sign Up</h2>
          <div>
            <label>
              <strong>Username</strong>
            </label>
            <br />
            <input
              type="text"
              placeholder="Enter Name"
              name="Name"
              value={username}
              autoComplete="off"
              required
              onChange={(e) => setName(e.target.value)}
            ></input>
            {formErrors.name && (
              <div className="message">{formErrors.name}</div>
            )}
          </div>
          <div>
            <label>
              <strong>Email</strong>
            </label>
            <br />
            <input
              type="text"
              placeholder="Enter Email"
              name="Email"
              value={email}
              autoComplete="off"
              required
              onChange={(e) => setEmail(e.target.value)}
            ></input>
            {formErrors.email && (
              <div className="message">{formErrors.email}</div>
            )}
          </div>
          <div>
            <label>
              <strong>Password</strong>
            </label>
            <br />
            <input
              type="password"
              placeholder="Enter Password"
              name="Password"
              value={password}
              autoComplete="off"
              required
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            {formErrors.password && (
              <div className="message">{formErrors.password}</div>
            )}
          </div>
          <button id="button"type="submit">Next</button>
        </form>
        <p>Already Have an Account?</p>
        <Link to="/login" className="button">
          Login
        </Link>
      </div>
    </div>
  );
}

export default Register;
