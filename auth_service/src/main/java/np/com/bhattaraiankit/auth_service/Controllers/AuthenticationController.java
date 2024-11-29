package np.com.bhattaraiankit.auth_service.Controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import np.com.bhattaraiankit.auth_service.DTO.LoginRequest;
import np.com.bhattaraiankit.auth_service.DTO.SignUpRequest;
import np.com.bhattaraiankit.auth_service.Services.UserService;
/**
 * AuthenticationController
 */
@RestController
@RequestMapping(path="/auth")
public class AuthenticationController {

    private final UserService userService;
    public AuthenticationController(UserService userService){
        this.userService=userService;
    }
    

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody SignUpRequest request){
        String res;
        return null;
    }

    @PostMapping("/getToken")
    public  String getToken(@RequestBody LoginRequest request){
        return null;
    }

    public String validate(String token){
        userService.validateToken(token);
        return "validated";
    }
}
