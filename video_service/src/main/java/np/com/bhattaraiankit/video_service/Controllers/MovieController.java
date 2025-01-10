package np.com.bhattaraiankit.video_service.Controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import np.com.bhattaraiankit.video_service.DTO.Requests.CreateMovieRequest;
@RestController
@RequestMapping("/movie")
public class MovieController {

        @GetMapping("/get") 
        public ResponseEntity<?>  getMovie(@RequestParam(name = "id") String id){
            return null;
        }
        
        @GetMapping("/get-multiple")
        public ResponseEntity<?> getMovies(@RequestBody List<String> ids){
            return null;
        }


        @PostMapping("/create")
        public ResponseEntity<?> createMovie(
                @RequestBody CreateMovieRequest movieRequest){
            
            return null;
        }
    
}
