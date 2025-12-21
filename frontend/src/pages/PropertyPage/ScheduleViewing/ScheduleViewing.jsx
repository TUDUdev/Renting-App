import React, { useState } from "react";
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import "./ScheduleViewing.css";
import { useLocation } from "react-router-dom";

const ScheduleViewing = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {state : property} = useLocation();

  const [form, setForm] = useState({
    date: "",
    time: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // later: send API request
    alert("Viewing scheduled successfully!");
    navigate("/properties");
  };

  return (
    <div className="schedule-page">
      {/* Hero */}
      <section className="schedule-hero">
        <motion.div
          className="container"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1>Schedule a Viewing</h1>
          <p>Choose a convenient date and time to visit the property</p>
        </motion.div>
      </section>

      {/* Form Card */}
      <div className="container schedule-container">
        <motion.div
          className="schedule-card card"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="schedule-title">{property?.title || "Schedule Viewing"}</h2>

          <form onSubmit={handleSubmit} className="schedule-form">
            <div className="form-group">
              <label>Select Date</label>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                required
                min={new Date().toISOString().split("T")[0]}
              />
            </div>

            <div className="form-group">
              <label>Select Time</label>
              <input
                type="time"
                name="time"
                value={form.time}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Message (Optional)</label>
              <textarea
                name="message"
                placeholder="Any specific requirements or notes"
                value={form.message}
                onChange={handleChange}
              />
            </div>

            <div className="schedule-actions">
              <motion.button
                type="submit"
                className="btn btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Confirm Viewing
              </motion.button>

              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate(-1)}
              >
                Cancel
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default ScheduleViewing;