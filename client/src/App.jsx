import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import BookingForm from "./components/BookingForm";
import Navbar from "./components/Navbar"; 
import BookingDetails from "./components/BookingDetails";
import "@fontsource/poppins";

function App() {
  return (
    <div className="p-6">
      <Navbar /> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book" element={<BookingForm />} />
        <Route path="/booking/:id" element={<BookingDetails />} />
      </Routes>
    </div>
  );
}

export default App;
