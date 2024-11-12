
import React from "react";
import EmailStep from "../Components/EmailStep";
import '../Styles/RegistrationFlow.css';
import axios from 'axios';
import VerificationCodeStep from "../Components/VerificationCodeStep"
const RegistrationFlow = () => {
    
    const onSubmit  = async (email)=>{
         const response = await axios.post("http://localhost:8080/api/v1/user/startReg", email, {
                headers: {
                    "Content-Type": "text/plain", // Specify content type for plain text
                },
            });
            console.log(response.data);
    }
    return (<div className="registration-container">
        </div>)
}

export default RegistrationFlow;
