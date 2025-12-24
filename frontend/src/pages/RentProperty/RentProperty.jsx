import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RentProperty.css"

const RentProperty = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    location: "",
    type: "",
    bedrooms: "",
    bathrooms: "",
    sqft: "",
    description: "",
    detailedDescription: "",
    amenities: "",
    features: "",
    address: "",
    yearBuilt: "",
    deposit: "",
    leaseTerm: "",
    images: "",
    landlord: { name: "", phone: "", email: "", company: "" },
    availabilityDate: "",
    utilitiesIncluded: "",
    utilitiesNotIncluded: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("landlord.")) {
      const key = name.split(".")[1];
      setFormData({
        ...formData,
        landlord: { ...formData.landlord, [key]: value },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      price: Number(formData.price),
      bedrooms: Number(formData.bedrooms),
      bathrooms: Number(formData.bathrooms),
      sqft: Number(formData.sqft),
      deposit: Number(formData.deposit),
      amenities: formData.amenities.split(",").map((a) => a.trim()),
      features: formData.features.split(",").map((f) => f.trim()),
      images: formData.images.split(",").map((i) => i.trim()),
      utilitiesIncluded: formData.utilitiesIncluded.split(",").map((u) => u.trim()),
      utilitiesNotIncluded: formData.utilitiesNotIncluded.split(",").map((u) => u.trim()),
      available: true,
    };

    try {
      const res = await fetch("http://localhost:5000/api/properties/rent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        alert("Property listed successfully!");
        navigate("/properties");
      } else {
        const data = await res.json();
        alert(data.message || "Failed to list property");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  return (
    <div className="rent-property-container">
      <h2>Rent Your House</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" placeholder="Title" onChange={handleChange} required />
        <input type="number" name="price" placeholder="Price" onChange={handleChange} required />
        <input type="text" name="location" placeholder="Location" onChange={handleChange} required />
        <input type="text" name="type" placeholder="Type (e.g., Apartment)" onChange={handleChange} />
        <input type="number" name="bedrooms" placeholder="Bedrooms" onChange={handleChange} />
        <input type="number" name="bathrooms" placeholder="Bathrooms" onChange={handleChange} />
        <input type="number" name="sqft" placeholder="Square Feet" onChange={handleChange} />
        <input type="text" name="description" placeholder="Short Description" onChange={handleChange} />
        <textarea name="detailedDescription" placeholder="Detailed Description" onChange={handleChange} rows={4} />
        <input type="text" name="features" placeholder="Features (comma separated)" onChange={handleChange} />
        <input type="text" name="amenities" placeholder="Amenities (comma separated)" onChange={handleChange} />
        <input type="text" name="address" placeholder="Address" onChange={handleChange} />
        <input type="number" name="yearBuilt" placeholder="Year Built" onChange={handleChange} />
        <input type="number" name="deposit" placeholder="Deposit" onChange={handleChange} />
        <input type="text" name="leaseTerm" placeholder="Lease Term" onChange={handleChange} />
        <input type="text" name="images" placeholder="Image URLs (comma separated)" onChange={handleChange} />
        <input type="date" name="availabilityDate" placeholder="Availability Date" onChange={handleChange} />
        <input type="text" name="utilitiesIncluded" placeholder="Utilities Included (comma separated)" onChange={handleChange} />
        <input type="text" name="utilitiesNotIncluded" placeholder="Utilities Not Included (comma separated)" onChange={handleChange} />

        {/* Landlord Info */}
        <input type="text" name="landlord.name" placeholder="Landlord Name" onChange={handleChange} />
        <input type="text" name="landlord.phone" placeholder="Landlord Phone" onChange={handleChange} />
        <input type="text" name="landlord.email" placeholder="Landlord Email" onChange={handleChange} />
        <input type="text" name="landlord.company" placeholder="Landlord Company" onChange={handleChange} />

        <button type="submit">List Property</button>
      </form>
    </div>
  );
};

export default RentProperty;
