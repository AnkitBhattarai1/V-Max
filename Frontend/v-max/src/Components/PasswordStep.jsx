
import React,{useState} from "react";

const PasswordStep = ({email,onSubmit})=>{

    const[password,setPassword] = useState('');
    const[error, setError] = useState('');

    const [user,setUser] = useState({
        email:email,
        first_name:'',
        last_name:'',
        middle_name:'',
        dob:Date.now()
    })

    const handleSubmit = ()=>{
        if(!password) 
        {
            setError("Please Enter the password");
            return;
        }
        onSubmit(password);
        setError('');
    }


  const handleChange = (key, value) => {
    setUser((prev) => ({ ...prev, [key]: value }));
  };

        return (<div className="step-container"> 

        <input
        className="input-field"
        type="text"
        placeholder="first-name"
        value={user.first_name}
        onChange={(e) => handleChange('first_name', e.target.value)}
      />
    
    <input
        className="input-field"
        type="text"
        placeholder="middle-name"
        value={user.middle_name}
        onChange={(e) => handleChange('middle_name', e.target.value)}
      />

    <input
        className="input-field"
        type="text"
        placeholder="last-name"
        value={user.last_name}
        onChange={(e) => handleChange('last_name', e.target.value)}
      />
      <input
        className="input-field"
        type="email"
        placeholder="Email"
        value={user.email}
        onChange={(e) => handleChange('email', e.target.value)}
      />
      <input
        className="input-field"
        type="password"
        placeholder="Password"
        value={user.password}
        onChange={(e) => handleChange('password', e.target.value)}
      />
         
        <input
        className="input-field"
        type="date"
        placeholder="Date of Birth"
        value={user.dob}
        onChange={(e) => handleChange('dob', e.target.value)}
      />
            <button className="submit-button"
            onSubmit={()=>{}}>submit</button>
            </div>
        );
}

export default PasswordStep;
