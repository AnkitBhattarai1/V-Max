package np.com.bhattaraiankit.auth_service.DTO;

import java.util.List;
/**
  * JWTResponse
  */

public record JWTResponse(String token, String username, List<String> roles) {

    private static final String TYPE = "Bearer";

    public String type() {
        return TYPE;
    }
}

