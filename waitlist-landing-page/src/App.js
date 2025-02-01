import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    cChainAddress: "",
    interest: "",
  });

  const [status, setStatus] = useState({ success: null, message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateCChainAddress = (address) => {
    const cChainRegex = /^0x[a-fA-F0-9]{40}$/;
    return cChainRegex.test(address);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ success: null, message: "" });

    try {
      // Validate form data
      if (!formData.name || !formData.email || !formData.cChainAddress) {
        throw new Error("All fields are required");
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        throw new Error("Invalid email format");
      }

      if (!validateCChainAddress(formData.cChainAddress)) {
        throw new Error("Invalid C-Chain address format (0x followed by 40 hex characters)");
      }

      // Send to Firebase backend
      const response = await fetch(`${process.env.REACT_APP_API_URL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || "Registration failed");
      }

      // Success handling
      setStatus({ 
        success: true, 
        message: result.message 
      });
      setFormData({ 
        name: "", 
        email: "", 
        cChainAddress: "", 
        interest: "" 
      });

    } catch (error) {
      setStatus({ 
        success: false, 
        message: error.message 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="App">
      <div className="container">
        <header>
          <h1>Join DalasToken Waitlist</h1>
          <p className="subtitle">
            Secure early access to innovative blockchain solutions
          </p>
        </header>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              disabled={isSubmitting}
            />
          </div>

          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              disabled={isSubmitting}
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              name="cChainAddress"
              placeholder="C-Chain Address (0x...)"
              value={formData.cChainAddress}
              onChange={handleChange}
              disabled={isSubmitting}
            />
          </div>

          <div className="form-group">
            <textarea
              name="interest"
              placeholder="What interests you about Dalas Token?"
              value={formData.interest}
              onChange={handleChange}
              rows="4"
              disabled={isSubmitting}
            />
          </div>

          <button 
            type="submit" 
            className="cta-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Processing..." : "Join Waitlist →"}
          </button>

          {status.message && (
            <div className={`status ${status.success ? "success" : "error"}`}>
              {status.message}
              {status.success && (
                <div className="telegram-link">
                  Join our Telegram:{" "}
                  <a href="https://t.me/DalasTokenEduBot" target="_blank" rel="noopener noreferrer">
                    t.me/DalasTokenEduBot
                  </a>
                </div>
              )}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default App;