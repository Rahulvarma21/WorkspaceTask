import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="font-[poppins] bg-black p-4 text-white flex justify-between">
      <h1 className="text-lg font-bold">Workspace Booking</h1>
      <div>
        <Link to="/" className="mx-4 hover:underline">
          Home
        </Link>
        <Link to="/book" className="hover:underline">
          Book Facility
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
