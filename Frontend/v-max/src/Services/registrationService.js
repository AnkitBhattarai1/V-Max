
import axios from 'axios';
import { BASE_URL } from '../Utils/constants';

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

export const startRegistration = async (email) => {
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

export const registerUser = async (user) => {
/*    
    test();
    const data ={
        email:"ankit",
        password:"hello1234"
    }
    const res1 = await axios.post('http://localhost:8085/auth/register',data);
    //console.log(res1);



    */
        try {
        // First API call to register the user
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
        console.log(res1);

        // Second API call to add user details
        const res2 = await axios.post(
            `${BASE_URL}/user/addUser`,
            {
                email: user.email,
                first_name: user.first_name,
                last_name: user.last_name,
                middle_name: user.middle_name,
                dob: ((user.dob).toISOString())
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        console.log(res2);
    } catch (e) {
        console.error("Error occurred:", e.response || e);
    }
};


export const test = async () => {
   const res1 = await axios.get(
            `${BASE_URL}/auth/test`)

    console.log(res1);
   const res2 = await axios.get(
            `${BASE_URL}/user/test`)
console.log(res2);

   const res3 = await axios.post(
            `${BASE_URL}/auth/test2`)
    console.log(res3);

   const res4= await axios.post(
            `${BASE_URL}/user/test2`)
    console.log(res4);
}
