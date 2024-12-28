package np.com.bhattaraiankit.userService.Services;

import jakarta.mail.MessagingException;

import org.springframework.stereotype.Service;

import np.com.bhattaraiankit.userService.DTO.RegistrationUserResponse;
import np.com.bhattaraiankit.userService.DTO.UserRequest;
import np.com.bhattaraiankit.userService.DTO.UserResponse;

/**
 * UserService
 */
@Service
public interface UserService  {


    public String registerUserEmail(String email) throws MessagingException;
    
    public String verifyUserEmail(String email, String verification_code) throws MessagingException;
    
    public RegistrationUserResponse getRegisteredUser(String email);
    public UserResponse addUser(UserRequest user);
}
