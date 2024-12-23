import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook
import { startRegistration, verifyCode } from "../Services/registrationService";
import "../Styles/RegistrationFlow.css";

const RegistrationFlow = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(new Array(6).fill("")); // OTP state
  const [currentStep, setCurrentStep] = useState(1); // Track the current step
  const [error, setError] = useState(""); // For validation messages
  const navigate = useNavigate(); // For redirecting to the homepage

  const handleEmailSubmit = async () => {
    if (!email) {
      setError("Please enter your email.");
      return;
    }

    const result = await startRegistration(email);

    if (result.success) {
      setError(""); // Clear any previous errors
      setCurrentStep(2); // Move to OTP step
    } else {
      setError(result.message);
    }
  };

  // Handle OTP submission
  const handleOtpSubmit = async () => {
    const otpCode = otp.join(""); // Combine the 6 OTP inputs
    if (otpCode.length < 6) {
      setError("Please enter the complete 6-digit code.");
      return;
    }
      const result =  await verifyCode(email,otpCode);
      
      if(result.success){
          setError("");
          setCurrentStep(3);
      }
      else
          setError(result.message);
  };

  // Handle OTP input change
  const handleOtpChange = (element, index) => {
    if (isNaN(element.value)) return; // Allow only numeric input
    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // Move focus to next input
    if (element.nextSibling && element.value) {
      element.nextSibling.focus();
    }
  };

  // Handle password submission and complete registration
  const handleCompleteRegistration = () => {
    // Here, you can add logic for saving the password if needed
    // After registration, redirect to the homepage
    navigate("/home"); // Redirect to homepage
  };

  return (
    <div className="registration-flow">
      {/* Email Step */}
      {currentStep === 1 && (
        <div className="step-container">
          <h2>Sign Up</h2>
          <input
            type="email"
            placeholder="example123@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
          />
          <button onClick={handleEmailSubmit} className="next-button">
            Next
          </button>
        </div>
      )}

      {/* OTP Step */}
      {currentStep === 2 && (
        <div className="step-container">
          <h2>Verify Your Email</h2>
          <p>Enter the 6-digit code sent to <strong>{email}</strong>.</p>
          <div className="otp-container">
            {otp.map((value, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={value}
                onChange={(e) => handleOtpChange(e.target, index)}
                className="otp-input"
              />
            ))}
          </div>
          <button onClick={handleOtpSubmit} className="submit-button">
            Verify
          </button>
        </div>
      )}

      {/* Password Step with readonly email */}
      {currentStep === 3 && (
        <div className="step-container">
          <h2>Create Your Password</h2>
          <p>Set a strong password for <strong>{email}</strong>.</p>

          {/* Email input as readonly */}
          <input
            type="email"
            value={email}
            readOnly
            className="input-field readonly-input"
          />

          <input
            type="password"
            placeholder="Enter your password"
            className="input-field"
          />
          <button onClick={handleCompleteRegistration} className="next-button">
            Complete Registration
          </button>
        </div>
      )}

      {/* Display Errors */}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default RegistrationFlow;
