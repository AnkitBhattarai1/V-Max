package np.com.bhattaraiankit.video_service.Constants;

import jakarta.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

@Component
public class Constants {

    @Autowired
    Environment env; //environment of the currently running instance.. 
            
    private String location; //location where the  data should be stored..

    private static String rootFolder = System.getProperty("user.home");



    //constans//
    private static String RAW_VIDEO_LOCATION;
    private static String THUMBNAIL_LOCATION;

    @PostConstruct
    private void init(){
        location  = env.getProperty("application.storage");
        RAW_VIDEO_LOCATION=rootFolder+location+"RAW_VIDEOS/";        
        THUMBNAIL_LOCATION=rootFolder+location+"THUMBNAIL/";
    }

    public static String getVideoLocation(){
        return RAW_VIDEO_LOCATION;
    }

    public static String getThumbnailLocation(){
        return THUMBNAIL_LOCATION;
    }
}
