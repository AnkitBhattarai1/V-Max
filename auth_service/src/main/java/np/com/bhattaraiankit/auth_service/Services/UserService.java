package np.com.bhattaraiankit.auth_service.Services;

import org.springframework.stereotype.Service;

import np.com.bhattaraiankit.auth_service.DTO.JWTResponse;
import np.com.bhattaraiankit.auth_service.DTO.LoginRequest;
import np.com.bhattaraiankit.auth_service.DTO.SignUpRequest;
/**
 * UserService
 */
@Service
public interface UserService {

    public JWTResponse generateToken(LoginRequest user);
    public void validateToken(String token);
    public String  signUpUser(SignUpRequest request); 
}
