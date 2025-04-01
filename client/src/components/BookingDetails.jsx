import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const BookingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Hook for navigation

  const [booking, setBooking] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/booking/${id}`)
      .then((res) => setBooking(res.data))
      .catch((err) => console.error("Error fetching booking:", err));
  }, [id]);

  const updatePaymentStatus = async () => {
    try {
      await axios.post(`http://localhost:8080/updatePayment/${id}`, {
        paymentStatus: "Confirmed",
      });
      setBooking((prev) => ({ ...prev, paymentStatus: "Confirmed" }));
      navigate("/");
    } catch (err) {
      console.error("Error updating payment status:", err);
    }
  };

  if (!booking) return <p>Loading...</p>;

  return (
    <div className="font-[poppins] p-6">
      <div className="bg-black text-white text-lg font-semibold py-3 px-4 rounded-t-md">
        Booking Details
      </div>
      <div className="border border-gray-300 bg-white rounded-b-md shadow-md p-4">
        <h2 className="text-xl font-semibold mb-3">{booking.place}</h2>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <p>
            <strong>Booking ID:</strong> {booking._id}
          </p>
          <p>
            <strong>Status:</strong>{" "}
            <span className="bg-green-200 text-green-800 px-2 py-1 rounded">
              {booking.status}
            </span>
          </p>
          <p>
            <strong>Booked on:</strong> {booking.bookedOn}
          </p>
          <p>
            <strong>Booked by:</strong> {booking.user}
          </p>
          <p>
            <strong>Scheduled Date:</strong> {booking.date}
          </p>
          <p>
            <strong>Selected Slot:</strong> {booking.time}
          </p>
          <p>
            <strong>GST:</strong> ₹1.8
          </p>
          <p>
            <strong>Payable Amount:</strong> ₹11.8
          </p>
          <p>
            <strong>Payment Status:</strong>{" "}
            <span
              className={`px-2 py-1 rounded ${
                booking.paymentStatus === "Confirmed"
                  ? "bg-green-200 text-green-800"
                  : "bg-yellow-200 text-yellow-800"
              }`}
            >
              {booking.paymentStatus}
            </span>
          </p>
          <p>
            <strong>Payment Method:</strong> {booking.paymentMethod}
          </p>
          <p>
            <strong>Amount Paid:</strong> ₹0.0
          </p>
        </div>

        <div className="flex justify-end mt-4 space-x-3">
          <button
            className="bg-red-600 text-white px-3 py-1 rounded-md"
            onClick={updatePaymentStatus}
          >
            Capture Payment
          </button>
          <button
            className="bg-yellow-500 text-white px-3 py-1 rounded-md"
            onClick={updatePaymentStatus}
          >
            Request Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;
