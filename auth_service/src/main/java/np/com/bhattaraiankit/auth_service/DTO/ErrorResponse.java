package np.com.bhattaraiankit.auth_service.DTO;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(JsonInclude.Include.NON_NULL)
public record ErrorResponse(
        String error,
        String details,
        LocalDateTime timeStamp
        ) 
{
        }
    
