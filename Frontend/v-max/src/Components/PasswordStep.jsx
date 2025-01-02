
import React,{useState} from "react";
import { registerUser } from "../Services/registrationService";
const PasswordStep = ({email,onSubmit})=>{

    const[error, setError] = useState('');
    
    const [user,setUser] = useState({
        email:email,
        password:'',
        first_name:'',
        last_name:'',
        middle_name:'',
        dob:Date.now()
    });

    const handleSubmit =  async ()=>{

        console.log("ankit bhattari");
        const res = await registerUser(user);

        console.log(res);
    };


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
            onClick={handleSubmit}>submit</button>
            </div>
        );
}

export default PasswordStep;
