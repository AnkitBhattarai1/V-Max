
import React,{useState} from "react";

const PasswordStep = ({onSubmit})=>{

    const[password,setPassword] = useState('');
    const[error, setError] = useState('');
        
    const handleSubmit = ()=>{
        if(!password) 
        {
            setError("Please Enter the password");
            return;
        }
        onSubmit(password);
        setError('');
    }
        return (<div>
        </div>)
}

export default PasswordStep;
