package np.com.bhattaraiankit.video_service.Exceptions;


public class VideoNotFoundException extends RuntimeException {

    public VideoNotFoundException(String message){
        super(message);
    }

    public VideoNotFoundException(){
        super("The requested video can't be found");
    }
}
