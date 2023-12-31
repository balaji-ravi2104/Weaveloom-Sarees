import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import "../styles/register.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { authActions } from "../store";

function Login() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userId, setUserId] = useState();
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate(email, password);
    setFormErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        await axios
          .post("http://localhost:8080/api/auth/login", {
            email,
            password,
          })
          .then((response) => {
            if (response.status === 200) {
              dispatch(authActions.login());
              setUserId(response.data.user._id);
              localStorage.setItem("authToken", response.data.token);
              navigate("/home");
            }
          })
          .catch((error) => {
            if (error.response.status === 404) {
              alert("User Not Found! Please Register...");
              navigate("/register");
            } else if (error.response.status === 401) {
              alert("Wrong password or username!");
            }
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    console.log(formErrors);
  }, [formErrors]);

  const validate = (email, password) => {
    const errors = {};
    if (!email) {
      errors.email = "Email is required!!";
    }
    if (!password) {
      errors.password = "Password is required!!";
    }
    return errors;
  };

  return (
    <div className="body">
      <div className="image-container">
        <img src={require("../images/Login.jpg")} alt="Register" />
      </div>
      <div className="space-container"></div>
      <div className="container" style={{ width: "400px", height: "400px" }}>
        <form onSubmit={handleSubmit}>
          <h2 id="h2">Sign In</h2>
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
            {formErrors.email && (
              <div className="message">{formErrors.email}</div>
            )}
          </div>
          <div>
            <label>Password</label>
            <br />
            <input
              type="password"
              placeholder="Enter Password"
              name="Password"
              id="pass"
              autoComplete="off"
              required
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            {formErrors.password && (
              <div className="message">{formErrors.password}</div>
            )}
          </div>
          <button id="button" type="submit">
            Login
          </button>
        </form>
        <div>
          <Link to="/forgetPassword" className="f-pass">
            Forget Password?
          </Link>
        </div>
        <p>Don't Have an Account?</p>
        <Link to="/register" className="button">
          Register
        </Link>
      </div>
    </div>
  );
}
export default Login;
