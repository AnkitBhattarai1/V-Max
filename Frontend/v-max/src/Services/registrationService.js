
import axios from 'axios';


/**
 * Sends a POST request to the registration API to start the registration process.
 * 
 * @param {string} email - The email address to register.
 * @returns {Promise<{ success: boolean, message?: string }>} 
 *          - An object indicating success or failure, with an optional message.
 * 
 * The function handles:
 * - Sending the email to the `/startReg` API endpoint.
 * - Returning success or failure based on the server response.
 * - Gracefully handling errors (e.g., network issues or server errors).
 */


const BASE_URL='http://192.168.1.65:9090'


export const startRegistration = async (email) => {
  
    console.log(email);
    try {
    // Send POST request to the backend with the email as plain text
    const response = await axios.post(
      BASE_URL+'/user/startReg',
      email,
      {
        headers: {
          'Content-Type': 'text/plain', // Set the request Content-Type to text/plain
        },
      }
    );

    // Check the response status and return accordingly
    if (response.status === 200) {
      return { success: true }; // Registration started successfully
    } else {
      return { success: false, message: response.data }; // Handle unexpected response
    }
  } catch (error) {
    // Log the error and return a failure message
    console.error("Registration error:", error);
    return { success: false, message: 'Failed to send verification email. Please try again.' };
  }
};


{/* sends a POST request to the verification api to verity the email entered
  * @param{string} email - The email address toregister.
  @returns 
    The function handles: 

        */}

export const verifyCode = async (email,verificationCode) =>{
    //Send post request to backend with the email and code 
   console.log(verificationCode);
    try{ 
    const response = await axios.post(
        BASE_URL+'/user/verify',
        null,
        {
            params:{
                email,
                verificationCode,
            },
        }
    );
    //Check the response status and return accordingly  
    if(response.status === 200)
        return {success:true};
    else {
        return {success:false, message:response.data};
    }
   }
    catch(error){
        console.log(error);
        return {success:false , message:"error"}
    }
} 


export const registerUser = async(user) =>{

    try{


    // Step 1: Register in Auth Service

    const res1 = await axios.post(
            `${BASE_URL}/auth/register`,
            {
                email: user.email,
                password: user.password,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );


    localStorage.setItem("jwtToken",res1.token);
   
        const res2 = await axios.post(
            `${BASE_URL}/user/addUser`,
            {
                email: user.email,
                first_name: user.first_name,
                last_name: user.last_name,
                middle_name: user.middle_name,
                dob: `${user.dob}T00:00:00`,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );


        // Step 2: Add User in User Servic
          if(res1.status===201 && res2.status===201)
        return { success: true };
    }


catch(e){
    console.log(e);
    return {success: false};
    }
};
