const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const bookingRoute = require("./routes/bookingRoutes");

mongoose.connect("mongodb://localhost:27017/workspace-booking", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use("/", bookingRoute);

app.listen(8080, () => console.log("Server running on port 5000"));
