const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    price: { type: Number, required: true },
    location: { type: String, required: true },
    type: { type: String, required: true },
    bedrooms: { type: Number, default: 0 },
    bathrooms: { type: Number, default: 0 },
    sqft: { type: Number, default: 0 },
    available: { type: Boolean, default: true },
    description: { type: String, default: "" },
    detailedDescription: { type: String, default: "" },
    amenities: { type: [String], default: [] },
    features: { type: [String], default: [] },
    address: { type: String, default: "" },
    yearBuilt: Number,
    deposit: { type: Number, default: 0 },
    leaseTerm: { type: String, default: "" },
    images: { type: [String], default: [] },
    landlord: {
      name: { type: String, default: "" },
      phone: { type: String, default: "" },
      email: { type: String, default: "" },
      company: { type: String, default: "" },
    },
    availabilityDate: { type: String, default: "" },
    utilitiesIncluded: { type: [String], default: [] },
    utilitiesNotIncluded: { type: [String], default: [] },
    rating: { type: Number, default: 0 },
    reviews: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Property", propertySchema);
