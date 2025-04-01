import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import BookingForm from "./BookingForm";
import Navbar from "./Navbar"; 
import BookingDetails from "./BookingDetails";
import "@fontsource/poppins";

function App() {
  return (
    <div className="p-6">
      <Navbar /> {/* ✅ Navbar is now common */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book" element={<BookingForm />} />
        <Route path="/booking/:id" element={<BookingDetails />} />
      </Routes>
    </div>
  );
}

export default App;
