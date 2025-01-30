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

    if (!formData.name || !formData.email || !formData.cChainAddress) {
      setStatus({ success: false, message: "All fields are required" });
      setIsSubmitting(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus({ success: false, message: "Invalid email format" });
      setIsSubmitting(false);
      return;
    }

    if (!validateCChainAddress(formData.cChainAddress)) {
      setStatus({ 
        success: false, 
        message: "Invalid C-Chain address format (0x followed by 40 hex characters)" 
      });
      setIsSubmitting(false);
      return;
    }

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStatus({ 
        success: true, 
        message: "Registration successful! Join our telegram channel:  t.me/DalasTokenEduBot " 
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
        message: "Submission error. Please try again." 
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
              type="text"t 
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
          </div>i

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
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default App;