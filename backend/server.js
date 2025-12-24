const express = require("express");
const cors = require("cors");
const connectDB  = require("./config/db");
const rentApplicationRoutes = require("./routes/rentApplicationRoutes")
const propertyRoutes = require("./routes/propertyRoutes");
const app= express();
//Middleware
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET","POST","PUT","DELETE","OPTIONS"],
  credentials: true
}));
app.use(express.json());
//Database
connectDB();
//Routes
app.use("/api/rent", rentApplicationRoutes);
app.use("/api/properties", propertyRoutes);

app.listen(5000,()=>{
  console.log("Server running on port 5000");
});