package np.com.bhattaraiankit.auth_service.Controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
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
    public ResponseEntity<String> registerUser(@RequestBody SignUpRequest request){

        String res = userService.signUpUser(request);
        return new ResponseEntity<String>(res,HttpStatus.CREATED);
    }

    @PostMapping("/getToken")
    public  ResponseEntity<JWTResponse> getToken(@RequestBody LoginRequest request){
        System.out.println("its here");
        return new ResponseEntity<JWTResponse>(userService.generateToken(request),HttpStatus.OK); 
    }


    public String validate(String token){
        userService.validateToken(token);
        return "validated";
    }
}
