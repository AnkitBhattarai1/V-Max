package np.com.bhattaraiankit.auth_service.DTO;


public record RegistrationUserDTO(String id, 
                              String email,
                              boolean isVerified
                              ) {
}
