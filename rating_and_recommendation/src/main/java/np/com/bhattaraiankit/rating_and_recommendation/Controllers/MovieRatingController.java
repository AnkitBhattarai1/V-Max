package np.com.bhattaraiankit.rating_and_recommendation.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import np.com.bhattaraiankit.rating_and_recommendation.Models.MovieRating;
import np.com.bhattaraiankit.rating_and_recommendation.Services.MovieRatingService;

@RestController
@RequestMapping("/rating")
public class MovieRatingController {

    @Autowired
    private MovieRatingService ratingService;

    // Find rating by ID
    @GetMapping("/{id}")
    public ResponseEntity<MovieRating> getRatingById(@PathVariable String id) {
        try {
            MovieRating rating = ratingService.findRatingById(id);
            return ResponseEntity.ok(rating);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Find ratings by Movie ID
    @GetMapping("/movie/{movieId}")
    public ResponseEntity<List<MovieRating>> getRatingsByMovieId(@PathVariable String movieId) {
        List<MovieRating> ratings = ratingService.findByMovieId(movieId);
        if (ratings.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(ratings);
    }

    // Find ratings by User ID
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<MovieRating>> getRatingsByUserId(@PathVariable String userId) {
        List<MovieRating> ratings = ratingService.findByUserId(userId);
        if (ratings.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(ratings);
    }
}
