
import React,{useState} from "react";
import { startRegistration,test,registerUser} from "../Services/registrationService";


const EmailStep = ({email,setEmail,goNextStep,goBackStep}) =>{
    const[error,setError] = useState('');


    const handleSubmit= async() => {
        if(!email) {
            setError("Please Enter the email");
            return;
        }

        const result = await startRegistration(email);

        if(result.success){ // need to remove true(it is for test)
            setError("");//Clear any previous errors;
            //setCurrent(2);    
        goNextStep();
        }
        else {
            setError(result.message);
        }
        setError('');
    };

   
    const handleKeyDown = (e) => {
        if(e.key === "Enter"){
            handleSubmit();
        }
    }
const handletest = () => {
   registerUser(); 
}
    return (<div className="step-container">
        <h2>Enter Your Email</h2>        
        <input 
        type="email"
        placeholder="example123@gmail.com"
        value={email}
        onChange = {(e)=> setEmail(e.target.value)}
        onKeyDown ={(e) => {handleKeyDown(e)}}
        className="input-field"
        />
        <button onClick={handleSubmit} className="next-button">Next</button>
        {error && <p>{error}</p>}
        </div>);
}
export default EmailStep;
