
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
    const baseurl = 'http://localhost:9090/';
export const startRegistration = async (email) => {
  try {
    // Send POST request to the backend with the email as plain text
    const response = await axios.post(
      baseurl+'user/startReg',
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



export const verifyCode = async (email,verificationCode) =>{
    //Send post request to backedn with the email and code 
   try{ 
    const response = await axios.post(
        baseurl+'user/verify',
        null,
        {
            params:{
                email,
                verificationCode,
            },
        }
    );

    //Check the response status and return accordingly 
    
    if(response.status===201)
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
