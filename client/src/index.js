import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import Login from "../src/pages/Login"
import Welcome from '../src/pages/Welcome';
import Register from "../src/pages/Register";
import ForgetPassword from "./Components/ForgetPassword";
import ResetPassword from "./Components/ResetPassword";
import Home from './pages/Home';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
      <React.Fragment>
        <Routes>
          <Route path='/' element={<Welcome />} /> 
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path='/home' element={<Home />}/>
          <Route path="/forgetPassword" element={<ForgetPassword />}/>
          <Route path="/changePassword" element={<ResetPassword />}/>
        </Routes>
      </React.Fragment>
    </BrowserRouter>
);
