
import React,{useState} from "react";

const VerificationCodeStep = ({email,onResendOtp,onSubmit})=>{

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

    return (<div className="step-container">
        <h2> Verify Your Email</h2>
        <p>Enter the 6-digit code sent  to <strong>{email}</strong>.</p>
        <form>
        <div>
            {otp.map((value,index)=>(

                <input
                key={index}
                type="text"
                maxLength="100"
                value={value}
                onChange ={(e)=>handleChange(e.target,index)}
                onFocus={(e)=>e.target.select()}
                
                />

            ))}

        {error && <p className="error-message">{error}</p>}
        
        <button
        type="submit"
        className="submit-button"
        disabled={isSubmitting}>

        {isSubmitting?"Verifying....":"Verify"}
        
        </button>

        </div>
        </form>
        </div>); 

}

export default VerificationCodeStep;
