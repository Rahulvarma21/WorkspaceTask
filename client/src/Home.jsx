import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import axios from "axios";

const Home = () => {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate(); 


  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get("http://localhost:8080/bookings");
        setBookings(response.data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-[poppins] font-bold text-center mt-4">📋 All Bookings</h2>
      <div className="p-4">
        {bookings.length === 0 ? (
          <p className="text-center font-[poppins]">No bookings available.</p>
        ) : (
          <table className="w-full border-collapse font-[poppins] border border-gray-300 mt-4">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">User</th>
                <th className="border p-2">Facility</th>
                <th className="border p-2">Building</th>
                <th className="border p-2">Floor</th>
                <th className="border p-2">Unit</th>
                <th className="border p-2">Date</th>
                <th className="border p-2">Time</th>
                <th className="border p-2">Payment</th>
                <th className="border p-2">Booking Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr
                  key={booking._id}
                  className="text-center cursor-pointer hover:bg-gray-100"
                  onClick={() => navigate(`/booking/${booking._id}`)} // Navigate on click
                >
                  {" "}
                  <td className="border p-2">{booking.user}</td>
                  <td className="border p-2">{booking.place}</td>
                  <td className="border p-2">{booking.building}</td>
                  <td className="border p-2">{booking.floor}</td>
                  <td className="border p-2">{booking.unit}</td>
                  <td className="border p-2">{booking.date}</td>
                  <td className="border p-2">{booking.time}</td>
                  <td className="border p-2">{booking.paymentMethod}</td>
                  <td className="border p-2">{booking.paymentStatus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Home;
