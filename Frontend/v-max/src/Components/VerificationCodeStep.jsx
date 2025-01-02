
import React,{useState} from "react";
import { verifyCode } from "../Services/registrationService";

const VerificationCodeStep = ({email,nextStep,prevStep})=>{

    const[otp,setOtp] = useState(new Array(6).fill(""));
    const [error,setError] = useState('');
    const [resendTimer, setResendTimer] = useState(60);
    const[isSubmitting, setIsSubmitting] = useState(false);

    const handleChange=(element,index) => {
         if (isNaN(element.value)) return; // Only allow numbers
        const newOtp = [...otp];
        newOtp[index] = element.value;
        setOtp(newOtp);

        // Move to next input field if not the last one
        if (element.nextSibling && element.value) {
            element.nextSibling.focus();
        }
    };
    
    const onSubmit = async () => {        
        const otpCode = otp.join("");//Combine the 6 OTP inputs....
        
            if(otpCode.length<6) {
                setError("Please Enter the complete 6-digit code");
                return;
            }
        const result = await verifyCode(email,otpCode);
        
        if(result.success){
            setError("");
            nextStep();     
        }
        setError(result.message);
    };

    return (<div className="step-container">
        <h2> Verify Your Email</h2>
        <p>Enter the 6-digit code sent  to <strong>{email}</strong>.</p>
        <div className="otp-container">
            {otp.map((value,index)=>(
                <input
                key={index}
                type="text"
                maxLength="1"
                value={value}
                onChange ={(e)=>handleChange(e.target,index)}
                onFocus={(e)=>e.target.select()}
                className="otp-input" 
                />
            ))}        
        <button
        type="submit"
        className="submit-button"
        disabled={isSubmitting}
        onClick={onSubmit}>

        {isSubmitting?"Verifying....":"Verify"}        
        </button>

        <button onClick={prevStep}>goBack</button>
        </div>
        </div>); 

}

export default VerificationCodeStep;
