package np.com.bhattaraiankit.video_service.Controllers;

import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice

 public class GlobalExceptionHandler {
   
/*    @ExceptionHandler(InvalidVerificationCode.class) 
     public ResponseEntity<ErrorResponse> handleInvalidVerificationCode(InvalidVerificationCode e){    
         ErrorResponse response = new ErrorResponse("InvalidVerificationCode", "The verification code is not valid");
         return new ResponseEntity<ErrorResponse>(response,HttpStatus.BAD_REQUEST);
     }
*/

 }
