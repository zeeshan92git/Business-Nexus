import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/login.jsx";
import Navbar from "./components/navbar.jsx";
import Home from "./pages/home.jsx";
import About from "./pages/about.jsx";
import Dashboard from "./pages/dashboard.jsx";
import Profile from "./pages/profile.jsx";
import { ToastContainer } from 'react-toastify';
function App() {
  return (
    <>
      <div className=" bg-gray-900 min-h-screen">

        <Navbar />
        <ToastContainer/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
        </Routes>
      </div>
    </>
  )
};
export default App; 