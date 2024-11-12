
import React,{useState} from "react";


const EmailStep = ({onSubmit}) =>{
    const[email,setEmail]  = useState('');
    const[error,setError] = useState('');

    const handleSubmit=() => {
        if(!email) {
            setError("Please Enter the email");
            return;
        }
        onSubmit(email);
        setError('');
    }
    return (<div className="step-container">
        <h2>Enter Your Email</h2>
        
        <input 
        type="email"
        placeholder="example123@gmail.com"
        value={email}
        onChange = {(e)=> setEmail(e.target.value)}
        className="input-field"
        />

        <button onClick={handleSubmit} className="next-button">Next</button>
        {error && <p>{error}</p>}
        </div>);
}
export default EmailStep;
