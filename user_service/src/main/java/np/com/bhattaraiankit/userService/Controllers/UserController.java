package np.com.bhattaraiankit.userService.Controllers;

import jakarta.mail.MessagingException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import np.com.bhattaraiankit.userService.DTO.RegistrationUserResponse;
import np.com.bhattaraiankit.userService.DTO.UserRequest;
import np.com.bhattaraiankit.userService.DTO.UserResponse;
import np.com.bhattaraiankit.userService.Services.UserService;

@RestController
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService=userService;
    }

    //api endpoint for starting the registration process....
    @PostMapping("/startReg")
    public ResponseEntity<?> startRegistration(@RequestBody String email)

    throws MessagingException{

    return ResponseEntity.ok().body(userService.registerUserEmail(email));
   
    } 

    // api endpoint to verify if the entered email is right or not...
    @PostMapping("/verify")
    public ResponseEntity<String> verifyUserEmail(@RequestParam("email") String email, 
            @RequestParam("verificationCode") String verification_code)
   
            throws MessagingException{
                    String response = userService.verifyUserEmail(email, verification_code);
                    return  new ResponseEntity<String>(response, HttpStatus.OK);
            }

    @PostMapping("/addUser")
    public ResponseEntity<UserResponse> addUser(@RequestBody UserRequest user){
        return new ResponseEntity<UserResponse>(userService.addUser(user),HttpStatus.CREATED);
    }

    //Returns the user who has started the registration process...
    @GetMapping("/getUser")
    public ResponseEntity<RegistrationUserResponse> getUser(@RequestParam("email") String email){ 
        return new ResponseEntity<RegistrationUserResponse>(userService.getRegisteredUser(email),HttpStatus.OK);
    }
}
