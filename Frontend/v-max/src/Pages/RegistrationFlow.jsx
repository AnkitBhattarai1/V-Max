
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook
import EmailStep from "../Components/EmailStep";
import PasswordStep from "../Components/PasswordStep";
import VerificationCodeStep from "../Components/VerificationCodeStep";
import { startRegistration, verifyCode } from "../Services/registrationService";
import "../Styles/RegistrationFlow.css";

const RegistrationFlow = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(new Array(6).fill("")); // OTP state
  const [currentStep, setCurrentStep] = useState(1); // Track the current step
  const [error, setError] = useState(""); // For validation messages
  const navigate = useNavigate(); // For redirecting to the homepage

/*
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
*/
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

    const nextStep= () => {
        setCurrentStep(currentStep+1);
    }

  return (
    <div className="registration-flow">

      {/* Email Step */}
        {currentStep === 1 && <EmailStep    
            email={email}
            setEmail={setEmail}
            goNextStep={()=>{setCurrentStep(currentStep+1)}}
                />}
 
      {/* OTP Step */}
      {currentStep === 2 && 
    <VerificationCodeStep
        email={email}
        nextStep={()=>{setCurrentStep(3)}}
        prevStep={()=>{setCurrentStep(1)}}
              />
      }

      {/* Password Step with readonly email */}
      {currentStep === 3 && 
              (<PasswordStep></PasswordStep>)
      }
      {/* Display Errors */}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default RegistrationFlow;
