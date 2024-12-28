package np.com.bhattaraiankit.auth_service.Controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import np.com.bhattaraiankit.auth_service.DTO.JWTResponse;
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
    public ResponseEntity<JWTResponse> registerUser(@RequestBody SignUpRequest request){

        JWTResponse res = userService.signUpUser(request);
        return new ResponseEntity<JWTResponse>(res,HttpStatus.CREATED);
    }

    @PostMapping("/getToken")
    public  ResponseEntity<JWTResponse> getToken(@RequestBody LoginRequest request){
        return new ResponseEntity<JWTResponse>(userService.generateToken(request),HttpStatus.OK); 
    }

    @GetMapping("/isUserExist")
    public ResponseEntity<String> isUserExist(@RequestParam("email") String email){
            System.out.println(userService.isUserExist(email));
        return new ResponseEntity<String>(userService.isUserExist(email), HttpStatus.OK);
    }

    @GetMapping("/getUser")
    public String test(){
        // ResponseEntity<String>(userService.isUserExist(email), HttpStatus.OK);
    return "done";
    }
}
