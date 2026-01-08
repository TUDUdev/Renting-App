import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RentProperty.css";

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
    address: "",
    yearBuilt: "",
    deposit: "",
    leaseTerm: "",
    images: [],
    availabilityDate: "",
    landlord: { name: "", phone: "", email: "", company: "" },

    // ARRAYS NOW
    features: [],
    amenities: [],
    utilitiesIncluded: [],
    utilitiesNotIncluded: [],
  });

  const [inputValues, setInputValues] = useState({
    feature: "",
    amenity: "",
    utilInc: "",
    utilNotInc: "",
    image: "", 
  });
 
  const isValidUrl = (url) =>
  /^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/i.test(url);

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

  const addItem = (field, valueKey) => {
  const value = inputValues[valueKey].trim();
  if (!value) return;

  // avoid duplicates
  if (formData[field].includes(value)) return;

  // Only validate URL for images
  if (field === "images" && !isValidUrl(value)) {
    alert("Please enter a valid image URL");
    return;
  }

  setFormData({
    ...formData,
    [field]: [...formData[field], value],
  });

  setInputValues({ ...inputValues, [valueKey]: "" });
};


  const removeItem = (field, index) => {
    setFormData({
      ...formData,
      [field]: formData[field].filter((_, i) => i !== index),
    });
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
      images: formData.images,
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
        {/* Basic Fields */}
        <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
        <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} required />
        <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleChange} required />
        <input type="text" name="type" placeholder="Type" value={formData.type} onChange={handleChange} />
        <input type="number" name="bedrooms" placeholder="Bedrooms" value={formData.bedrooms} onChange={handleChange} />
        <input type="number" name="bathrooms" placeholder="Bathrooms" value={formData.bathrooms} onChange={handleChange} />
        <input type="number" name="sqft" placeholder="Square Feet" value={formData.sqft} onChange={handleChange} />
        <textarea name="description" placeholder="Short Description" value={formData.description} onChange={handleChange} />
        <textarea name="detailedDescription" placeholder="Detailed Description" value={formData.detailedDescription} onChange={handleChange} rows={8} className="big-textarea" />

        {/* -------- FEATURES -------- */}
        <div className="tag-section">
          <label>Features</label>
          <div className="tag-input">
            <input value={inputValues.feature} onChange={(e) => setInputValues({ ...inputValues, feature: e.target.value })} placeholder="Add feature..." />
            <button type="button" onClick={() => addItem("features", "feature")}>Add</button>
          </div>

          <div className="tag-list">
            {formData.features.map((f, i) => (
              <span key={i} className="tag">
                {f}
                <button type="button" onClick={() => removeItem("features", i)}>×</button>
              </span>
            ))}
          </div>
        </div>

        {/* -------- AMENITIES -------- */}
        <div className="tag-section">
          <label>Amenities</label>
          <div className="tag-input">
            <input value={inputValues.amenity} onChange={(e) => setInputValues({ ...inputValues, amenity: e.target.value })} placeholder="Add amenity..." />
            <button type="button" onClick={() => addItem("amenities", "amenity")}>Add</button>
          </div>

          <div className="tag-list">
            {formData.amenities.map((a, i) => (
              <span key={i} className="tag">
                {a}
                <button type="button" onClick={() => removeItem("amenities", i)}>×</button>
              </span>
            ))}
          </div>
        </div>

        {/* -------- UTILITIES INCLUDED -------- */}
        <div className="tag-section">
          <label>Utilities Included</label>
          <div className="tag-input">
            <input value={inputValues.utilInc} onChange={(e) => setInputValues({ ...inputValues, utilInc: e.target.value })} placeholder="Add utility..." />
            <button type="button" onClick={() => addItem("utilitiesIncluded", "utilInc")}>Add</button>
          </div>

          <div className="tag-list">
            {formData.utilitiesIncluded.map((u, i) => (
              <span key={i} className="tag">
                {u}
                <button type="button" onClick={() => removeItem("utilitiesIncluded", i)}>×</button>
              </span>
            ))}
          </div>
        </div>

        {/* -------- UTILITIES NOT INCLUDED -------- */}
        <div className="tag-section">
          <label>Utilities Not Included</label>
          <div className="tag-input">
            <input value={inputValues.utilNotInc} onChange={(e) => setInputValues({ ...inputValues, utilNotInc: e.target.value })} placeholder="Add utility..." />
            <button type="button" onClick={() => addItem("utilitiesNotIncluded", "utilNotInc")}>Add</button>
          </div>

          <div className="tag-list">
            {formData.utilitiesNotIncluded.map((u, i) => (
              <span key={i} className="tag">
                {u}
                <button type="button" onClick={() => removeItem("utilitiesNotIncluded", i)}>×</button>
              </span>
            ))}
          </div>
        </div>

        {/* Other Fields */}
        <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} />
        <input type="number" name="yearBuilt" placeholder="Year Built" value={formData.yearBuilt} onChange={handleChange} />
        <input type="number" name="deposit" placeholder="Deposit" value={formData.deposit} onChange={handleChange} />
        <input type="text" name="leaseTerm" placeholder="Lease Term" value={formData.leaseTerm} onChange={handleChange} />
        {/* -------- IMAGES -------- */}
<div className="tag-section">
  <label>Images</label>

  <div className="tag-input">
    <input
      value={inputValues.image}
      onChange={(e) =>
        setInputValues({ ...inputValues, image: e.target.value })
      }
      placeholder="Enter image URL..."
    />

    <button
      type="button"
      onClick={() => addItem("images", "image")}
    >
      Add
    </button>
  </div>
   <div className="tag-list">
  {formData.images.map((url, i) => (
    <span key={i} className="tag">
      <img
        src={url}
        alt="preview"
        style={{ width: 35, height: 35, borderRadius: 6, objectFit: "cover" }}
      />
      {url}
      <button type="button" onClick={() => removeItem("images", i)}>×</button>
    </span>
  ))}
</div>
</div>
        <input type="date" name="availabilityDate" value={formData.availabilityDate} onChange={handleChange} />
        {/* Landlord */}
        <input type="text" name="landlord.name" placeholder="Landlord Name" value={formData.landlord.name} onChange={handleChange} />
        <input type="text" name="landlord.phone" placeholder="Landlord Phone" value={formData.landlord.phone} onChange={handleChange} />
        <input type="text" name="landlord.email" placeholder="Landlord Email" value={formData.landlord.email} onChange={handleChange} />
        <input type="text" name="landlord.company" placeholder="Landlord Company" value={formData.landlord.company} onChange={handleChange} />

        <button type="submit">List Property</button>
      </form>
    </div>
  );
};

export default RentProperty;
