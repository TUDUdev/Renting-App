const mongoose = require("mongoose");

const rentApplicationSchema = new mongoose.Schema(
  {
    propertyId: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    moveInDate: {
      type: Date,
      required: true,
    },
    message: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("RentApplication", rentApplicationSchema);
