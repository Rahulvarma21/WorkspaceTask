const express = require("express");
const Booking = require("../models/Booking");

const app = express();

app.get("/bookings", async (req, res) => {
  try {
    const allBookings = await Booking.find();
    res.status(200).json(allBookings);
  } catch (error) {
    res.status(500).json({ error: "Error fetching bookings", details: error });
  }
});

app.post("/bookings", async (req, res) => {
  try {
    const {
      place,
      time,
      building,
      floor,
      unit,
      user,
      date,
      paymentMethod,
      comment,
    } = req.body;

    // Create new booking entry with status & paymentStatus
    const newBooking = new Booking({
      place,
      time,
      building,
      floor,
      unit,
      user,
      date,
      paymentMethod,
      comment,
      status: "Confirmed", // Default to Confirmed
      paymentStatus: "Pending", // Default to Pending
    });

    await newBooking.save(); // Save to DB
    res
      .status(201)
      .json({ message: "Booking successful!", booking: newBooking });
  } catch (error) {
    res.status(500).json({ error: "Error saving booking", details: error });
  }
});


app.get("/booking/:id", async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ error: "Booking not found" });
    res.json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update payment status
app.post("/updatePayment/:id", async (req, res) => {
  try {
    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      { paymentStatus: "Confirmed" },
      { new: true }
    );
    if (!updatedBooking) return res.status(404).json({ error: "Booking not found" });
    res.json(updatedBooking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = app;
