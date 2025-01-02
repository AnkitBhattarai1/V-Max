package np.com.bhattaraiankit.auth_service.Controllers;

import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.CrossOrigin;

@ControllerAdvice
@CrossOrigin("http://localhost:3000")
public class GlobalExceptionalHandler {

/*    @ExceptionHandler
    public ResponseEntity<ErrorResponse> userNotFoundExceptionHandler(){
       return null; 
    }
  */  
}
