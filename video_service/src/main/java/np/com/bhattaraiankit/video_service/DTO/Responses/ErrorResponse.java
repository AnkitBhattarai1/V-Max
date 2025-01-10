package np.com.bhattaraiankit.video_service.DTO.Responses;

import java.time.LocalDateTime;

public class ErrorResponse{

    private LocalDateTime timeStamp;
    private String error;
    private String details;

    public ErrorResponse(String error , String details){
        this.timeStamp=LocalDateTime.now();
        this.error=error;
        this.details=details;
    }

    public LocalDateTime getTimeStamp() {
        return timeStamp;
    }
    public void setTimeStamp(LocalDateTime timeStamp) {
        this.timeStamp = timeStamp;
    }
    public String getError() {
        return error;
    }
    public void setError(String error) {
        this.error= error;
    }
    public String getDetails() {
        return details;
    }
    public void setDetails(String details) {
        this.details = details;
    }
    
}
