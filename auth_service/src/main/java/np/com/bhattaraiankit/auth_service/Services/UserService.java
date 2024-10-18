package np.com.bhattaraiankit.auth_service.Services;

import org.springframework.stereotype.Service;

import np.com.bhattaraiankit.auth_service.Models.User;
/**
 * UserService
 */
@Service
public interface UserService {

    public String saveUser(User u);
    public String generatToken(User u);
    public void validateToken(String token);
}
