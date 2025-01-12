package np.com.bhattaraiankit.rating_and_recommendation.Services;

import java.util.List;

import org.springframework.stereotype.Service;

import np.com.bhattaraiankit.rating_and_recommendation.DTO.Request.RatingRequest;
import np.com.bhattaraiankit.rating_and_recommendation.DTO.Summary.MovieRatingSummary;
import np.com.bhattaraiankit.rating_and_recommendation.Models.MovieRating;
@Service
public interface MovieRatingService {
 
   public MovieRating createRating(RatingRequest request);
   public MovieRating findRatingById(String id);
   public List<MovieRating> findByUserId(String userId);
   public List<MovieRating> findByMovieId(String movieId);
   public List<MovieRatingSummary> findAllRatingSummaries();
   public List<MovieRatingSummary> findRatingSummariesByVideoId(String movieId);
   public List<MovieRatingSummary> findRatingBySummariesByUserId(String userId);

}
