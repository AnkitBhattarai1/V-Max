package np.com.bhattaraiankit.video_service.Controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import np.com.bhattaraiankit.video_service.DTO.Requests.CreateVideoRequest;
@Controller 
@RequestMapping("/video")
public class VideoController { 

    @PostMapping("/createVideo")
    public void createVideo(@RequestBody CreateVideoRequest request){
    }
    
}
