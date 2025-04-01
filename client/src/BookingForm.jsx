import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const BookingForm = () => {
  const [formData, setFormData] = useState({
    place: "Conference Room", // Default facility
    time: "",
    building: "",
    floor: "",
    unit: "",
    user: "",
    date: "",
    paymentMethod: "Post Paid",
    comment: "",
  });
    const navigate = useNavigate(); // Hook for navigation
  

  // Available options
  const facilities = ["Conference Room", "Meeting Room", "Private Office"];
  const buildings = ["Building A", "Building B", "Building C"];
  const floors = ["1st Floor", "2nd Floor", "3rd Floor"];
  const units = ["Unit 101", "Unit 202", "Unit 303"];
  const users = ["John Doe", "Jane Smith", "Alice Johnson"];

  // Sample time slots (this could be dynamic in the future)
  const timeSlots = [
    "10:00 AM - 10:30 AM",
    "11:00 AM - 11:30 AM",
    "12:00 PM - 12:30 PM",
    "02:00 PM - 02:30 PM",
    "03:00 PM - 03:30 PM",
    "06:00 PM - 06:30 PM",
    "08:00 PM - 08:30 PM",
    "10:00 PM - 10:30 PM",
    "11:00 PM - 11:30 PM",
  ];

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle date selection
  const handleDateChange = (e) => {
    setFormData({ ...formData, date: e.target.value, timeSlot: "" }); // Reset time slot when date changes
  };

  // Handle form submission
  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/bookings",
        formData
      );
      console.log("Booking saved:", response.data);
      alert("Booking successfully saved!");
      navigate('/')
    } catch (error) {
      console.error("Error saving booking:", error);
      alert("Failed to save booking.");
    }
  };

  return (
    <div className="font-[poppins] max-w-5xl mx-auto p-6 bg-white shadow-md rounded-md">
      {/* Header */}
      <div className="text-center py-2 bg-black text-white font-semibold text-lg rounded-t-md">
        Book Facility
      </div>

      {/* Form */}
      <div className="p-4 space-y-4">
        {/* Facility, Building, Floor, Unit */}
        <div className="grid grid-cols-4 gap-4">
          <div>
            <label className="block">Facility:</label>
            <select
              name="facility"
              value={formData.facility}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            >
              <option value="">Select Facility</option>
              {facilities.map((facility, index) => (
                <option key={index} value={facility}>
                  {facility}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block">Building:</label>
            <select
              name="building"
              value={formData.building}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            >
              <option value="">Select Building</option>
              {buildings.map((building, index) => (
                <option key={index} value={building}>
                  {building}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block">Floor:</label>
            <select
              name="floor"
              value={formData.floor}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            >
              <option value="">Select Floor</option>
              {floors.map((floor, index) => (
                <option key={index} value={floor}>
                  {floor}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block">Unit:</label>
            <select
              name="unit"
              value={formData.unit}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            >
              <option value="">Select Unit</option>
              {units.map((unit, index) => (
                <option key={index} value={unit}>
                  {unit}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* User, Date */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block">User:</label>
            <select
              name="user"
              value={formData.user}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            >
              <option value="">Select User</option>
              {users.map((user, index) => (
                <option key={index} value={user}>
                  {user}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block">Select Date:</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleDateChange}
              className="w-full border p-2 rounded"
            />
          </div>
        </div>

        {/* Time Slots (only visible if a date is selected) */}
        {formData.date && (
          <div>
            <label className="block font-semibold">Select Slot</label>
            <div className="mt-2">
              <span className="text-sm text-gray-600">Available Time Slot</span>
              <div className="flex flex-wrap gap-3 mt-2">
                {timeSlots.map((slot, index) => (
                  <button
                    key={index}
                    className={`px-4 py-2 rounded ${
                      formData.timeSlot === slot
                        ? "bg-green-600 text-white"
                        : "bg-green-300 text-black"
                    }`}
                    onClick={() => setFormData({ ...formData, timeSlot: slot })}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Payment Mode */}
        <div>
          <label className="block font-semibold">Payment Mode</label>
          <div className="flex space-x-4 mt-2">
            <button
              className={`px-4 py-2 rounded ${
                formData.paymentMode === "Post Paid"
                  ? "bg-black text-white"
                  : "border border-gray-400"
              }`}
              onClick={() =>
                setFormData({ ...formData, paymentMode: "Post Paid" })
              }
            >
              Post Paid
            </button>
            <button
              className={`px-4 py-2 rounded ${
                formData.paymentMode === "Prepaid"
                  ? "bg-black text-white"
                  : "border border-gray-400"
              }`}
              onClick={() =>
                setFormData({ ...formData, paymentMode: "Prepaid" })
              }
            >
              Prepaid
            </button>
          </div>
        </div>

        {/* Comment */}
        <div>
          <label className="block">Comment:</label>
          <textarea
            name="comment"
            value={formData.comment}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            rows="3"
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            onClick={handleSubmit}
            className="bg-green-500 text-white px-6 py-2 rounded"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
