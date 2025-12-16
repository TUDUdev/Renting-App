const express = require("express");
const cors = require("cors");
const connectDB  = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const rentRoutes = require("./routes/rentApplicationRoutes")

const app= express();
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET","POST"],
  credentials: true
}));

app.use(express.json());

connectDB();

app.use("/api/authen",authRoutes);
app.use("/api/rent", rentRoutes)

app.listen(5000,()=>{
  console.log("Server running on port 5000");
});