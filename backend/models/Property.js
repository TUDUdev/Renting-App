//Property are importing from backend
const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema(
  {
    title: String,
    price: Number,
    location: String,
    type: String,
    bedrooms: Number,
    bathrooms: Number,
    sqft: Number,
    available: Boolean,
    description: String,
    detailedDescription: String,
    amenities: [String],
    features: [String],
    address: String,
    yearBuilt: Number,
    deposit: Number,
    leaseTerm: String,
    images: [String],
    landlord: {
      name: String,
      phone: String,
      email: String,
      company: String,
    },
    availabilityDate: String,
    utilitiesIncluded: [String],
    utilitiesNotIncluded: [String],
    rating: Number,
    reviews: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Property", propertySchema);
