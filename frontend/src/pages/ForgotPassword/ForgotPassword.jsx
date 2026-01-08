import { useState } from "react";
import { Link } from "react-router-dom";
import { resetPassword } from "../../../services/authApi";
import './ForgotPassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setLoading(true);

    try {
      const res = await resetPassword(email);
      setMsg(res.message);
    } catch (error) {
      setMsg(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container card">
        <h2>Reset Password</h2>
        <p>Enter your registered email to receive a reset link</p>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              required
            />
          </div>

          <button
            type="submit"
            className="login-btn"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        {msg && <p className="info-message" aria-live="polite">{msg}</p>}

        <p style={{ marginTop: 10 }}>
          <Link to="/login">Back to Login</Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
