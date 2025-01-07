package np.com.bhattaraiankit.video_service.Controllers;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import np.com.bhattaraiankit.video_service.Models.Series;

@RestController
@RequestMapping("/series")
public class SeriesController {


    @GetMapping("/all")
    public List<Series> getAllSeries(){

        return null;
    }

    @GetMapping("/genre/{Genre}")
    public List<Series> getAllSeriesByGenre(@PathVariable("Genre") String genre){
        return null;
    }
   
    @PostMapping
    public Series createSeries(@RequestBody  Series series){


        return null;
    }

    @GetMapping
    public Series getSeriesById(@RequestParam("id") String id){
        return null;
    }

}
