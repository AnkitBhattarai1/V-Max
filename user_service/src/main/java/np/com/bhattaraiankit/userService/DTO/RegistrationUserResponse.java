package np.com.bhattaraiankit.userService.DTO;


public record RegistrationUserResponse(String id, 
                                       String email, 
                                       boolean isVerified) {
}
