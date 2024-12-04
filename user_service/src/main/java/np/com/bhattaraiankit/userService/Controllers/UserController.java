package np.com.bhattaraiankit.userService.Controllers;

import jakarta.mail.MessagingException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import np.com.bhattaraiankit.userService.Services.UserService;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/v1")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService=userService;
    }

    @PostMapping("/user/startReg")
    public ResponseEntity<?> startRegistration(@RequestBody String email)
    throws MessagingException{
            return ResponseEntity.ok().body(userService.registerUserEmail(email));
    } 

    @PostMapping("/user/verify")
    public ResponseEntity<String> verifyUserEmail(@RequestParam("email") String email, 
            @RequestParam("verificationCode") String verification_code)
            throws MessagingException{
                    String response = userService.verifyUserEmail(email, verification_code);
                    return  new ResponseEntity<String>(response, HttpStatus.CREATED);
            }
}
