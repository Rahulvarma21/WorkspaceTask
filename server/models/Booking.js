const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  place: String,
  building: String,
  floor: String,
  unit: String,
  user: String,
  date: String,
  time: String,
  paymentMethod: String,
  comments: String,
  status: { type: String, default: "Confirmed" }, // Default to Confirmed
  paymentStatus: { type: String, default: "Pending" }, // Default to Pending
});

const Booking = mongoose.model("Booking", bookingSchema);
module.exports = Booking;
