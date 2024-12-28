package np.com.bhattaraiankit.auth_service.DTO;

/**
 * LoginRequest
 */

public record LoginRequest(String email_or_username, String password) {
    
}
