package np.com.bhattaraiankit.userService.DTO;

import java.time.LocalDateTime;

public record UserResponse(
        String id, 
        String email, 
        String user_name,
        String name,
        LocalDateTime created_at,
        LocalDateTime updated_at,
        LocalDateTime dob, 
        String profile_pic_url
        ) {
}
