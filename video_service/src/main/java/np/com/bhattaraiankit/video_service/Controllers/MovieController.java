
package np.com.bhattaraiankit.video_service.Controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import np.com.bhattaraiankit.video_service.DTO.Requests.CreateMovieRequest;
import np.com.bhattaraiankit.video_service.DTO.Responses.MovieResponse;
import np.com.bhattaraiankit.video_service.Services.MovieService;


@RestController
@RequestMapping("/movie")

public class MovieController {

    private final MovieService movieService;

    public MovieController(MovieService movieService) {
        this.movieService = movieService;
    }

    @PostMapping
    public ResponseEntity<MovieResponse> createMovie(@RequestBody CreateMovieRequest request) {
        System.out.println(request.Video_id());
        MovieResponse createdMovie = movieService.createMovie(request);
        return ResponseEntity.ok(createdMovie);
    }

    @GetMapping("/{id}")
    public ResponseEntity<MovieResponse> getMovieById(@PathVariable String id) {
        MovieResponse movie = movieService.getMovieById(id);
        return ResponseEntity.ok(movie);
    }

    @GetMapping
    public ResponseEntity<List<MovieResponse>> getMoviesByIds(@RequestParam List<String> ids) {
        List<MovieResponse> movies = movieService.getMoviesByIds(ids);
        return ResponseEntity.ok(movies);
    }

  @GetMapping("/all")
    public ResponseEntity<List<MovieResponse>> getAllMovies() {
        List<MovieResponse> movies = movieService.getAllMovies();
        return ResponseEntity.ok(movies);
    }
    
}
