package np.com.bhattaraiankit.video_service.Controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import np.com.bhattaraiankit.video_service.DTO.Responses.ErrorResponse;

@RestControllerAdvice
 public class GlobalExceptionHandler {
   
/*    @ExceptionHandler(InvalidVerificationCode.class) 
     public ResponseEntity<ErrorResponse> handleInvalidVerificationCode(InvalidVerificationCode e){    
         ErrorResponse response = new ErrorResponse("InvalidVerificationCode", "The verification code is not valid");
         return new ResponseEntity<ErrorResponse>(response,HttpStatus.BAD_REQUEST);
     }
*/

     @ExceptionHandler(RuntimeException.class)
     public ResponseEntity<ErrorResponse> handleInvalidVerificationCode(RuntimeException e){

         ErrorResponse response = new ErrorResponse("RunTime exception",e.getMessage());

        return new ResponseEntity<ErrorResponse>(response,HttpStatus.INTERNAL_SERVER_ERROR);
     }
 }
