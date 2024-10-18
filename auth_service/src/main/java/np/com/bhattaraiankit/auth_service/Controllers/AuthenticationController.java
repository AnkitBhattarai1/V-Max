package np.com.bhattaraiankit.auth_service.Controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import np.com.bhattaraiankit.auth_service.Models.User;
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
    public ResponseEntity<?> registerUser(@RequestBody User user){
        String res;
        if(user!=null) res= userService.saveUser(user);
        else throw new IllegalArgumentException("The user cannot be null");
    
        return new ResponseEntity<>(HttpStatus.CREATED);
    }


}
