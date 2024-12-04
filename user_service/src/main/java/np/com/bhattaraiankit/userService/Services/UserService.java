package np.com.bhattaraiankit.userService.Services;

import jakarta.mail.MessagingException;

import org.springframework.stereotype.Service;

/**
 * UserService
 */
@Service
public interface UserService  {


    public String registerUserEmail(String email) throws MessagingException;
    
    public String verifyUserEmail(String email, String verification_code) throws MessagingException;
}
