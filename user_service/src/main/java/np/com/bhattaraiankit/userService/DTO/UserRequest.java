package np.com.bhattaraiankit.userService.DTO;

import java.time.LocalDateTime;

public record UserRequest(
        String email,
        String first_name,
        String last_name,
        String middle_name,
        String profile_pic_url,
        LocalDateTime dob        
        ){
}
