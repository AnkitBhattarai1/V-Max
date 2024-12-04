package np.com.bhattaraiankit.userService.Controllers;

import jakarta.mail.MessagingException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import np.com.bhattaraiankit.userService.DTO.ErrorResponse;
import np.com.bhattaraiankit.userService.exceptions.InvalidVerificationCode;
import np.com.bhattaraiankit.userService.exceptions.UserNotFoundException;
import np.com.bhattaraiankit.userService.exceptions.VerificationCodeExpires;

@RestControllerAdvice
 public class GlobalExceptionHandler {
   
    @ExceptionHandler(InvalidVerificationCode.class) 
     public ResponseEntity<ErrorResponse> handleInvalidVerificationCode(InvalidVerificationCode e){    
         ErrorResponse response = new ErrorResponse("InvalidVerificationCode", "The verification code is not valid");
         return new ResponseEntity<ErrorResponse>(response,HttpStatus.BAD_REQUEST);
     }

    @ExceptionHandler(MessagingException.class)
    public ResponseEntity<ErrorResponse> handleMessagingException(MessagingException e){
        ErrorResponse response = null; 
        return new ResponseEntity<ErrorResponse>(response,HttpStatus.INTERNAL_SERVER_ERROR);
    }
    
    @ExceptionHandler(VerificationCodeExpires.class)
    public ResponseEntity<ErrorResponse> handleVerificationCodeExpires(VerificationCodeExpires e){
        ErrorResponse response= null;
        return new ResponseEntity<ErrorResponse>(response,HttpStatus.GONE);
    }

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleUserNotFoundException(UserNotFoundException e){
    ErrorResponse response = null;
    return new ResponseEntity<ErrorResponse>(response,HttpStatus.NOT_FOUND);
    }

 }
