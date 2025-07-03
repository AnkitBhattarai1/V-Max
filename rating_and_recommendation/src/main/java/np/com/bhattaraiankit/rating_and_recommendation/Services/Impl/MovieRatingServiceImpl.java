package np.com.bhattaraiankit.rating_and_recommendation.Services.Impl;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import np.com.bhattaraiankit.rating_and_recommendation.DTO.Request.RatingRequest;
import np.com.bhattaraiankit.rating_and_recommendation.DTO.Summary.MovieRatingSummary;
import np.com.bhattaraiankit.rating_and_recommendation.Models.MovieRating;
import np.com.bhattaraiankit.rating_and_recommendation.Repository.MovieRatingRepo;
import np.com.bhattaraiankit.rating_and_recommendation.Services.MovieRatingService;

@Service
public class MovieRatingServiceImpl implements MovieRatingService {

  private MovieRatingRepo ratingRepo;

  public MovieRatingServiceImpl(MovieRatingRepo movieRatingRepo) {
    this.ratingRepo = movieRatingRepo;
  }

  @Override
  public MovieRating createRating(RatingRequest request) {
    Optional<MovieRating> existingRating = ratingRepo.findByUserIdAndVideoId(
        request.userId(), request.videoId());

    MovieRating movieRating;

    if (existingRating.isPresent()) {
      // Update the existing rating
      movieRating = existingRating.get();
      movieRating.setRating(request.rating());
      movieRating.setReview(request.review());
    } else {
      // Create a new rating
      movieRating = new MovieRating();
      movieRating.setUserId(request.userId());
      movieRating.setVideoId(request.videoId());
      movieRating.setRating(request.rating());
      movieRating.setReview(request.review());
    }

    return ratingRepo.save(movieRating);
  }

  @Override
  public MovieRating findRatingById(String id) {
    Optional<MovieRating> movieRating = ratingRepo.findById(id);
    return movieRating.orElseThrow(() -> new RuntimeException("cannot find the rating"));

  }

  @Override
  public List<MovieRatingSummary> findAllRatingSummaries() {
    Optional<List<MovieRatingSummary>> summaries = ratingRepo.findAllRatingSummaries();
    return summaries.orElseGet(List::of);
  }

  @Override
  public List<MovieRating> findByMovieId(String movieId) {
    Optional<List<MovieRating>> ratings = ratingRepo.findByMovieId(movieId);
    return ratings.orElseGet(List::of);
  }

  @Override
  public List<MovieRating> findByUserId(String userId) {
    Optional<List<MovieRating>> ratings = ratingRepo.findByUserId(userId);
    return ratings.orElseGet(List::of);
  }

  @Override
  public List<MovieRatingSummary> findRatingBySummariesByUserId(String userId) {
    Optional<List<MovieRatingSummary>> summaries = ratingRepo.findRatingSummariesByUserId(userId);
    return summaries.orElseGet(List::of);
  }

  @Override
  public List<MovieRatingSummary> findRatingSummariesByVideoId(String movieId) {
    Optional<List<MovieRatingSummary>> summaries = ratingRepo.findRatingSummariesByVideoId(movieId);
    return summaries.orElseGet(List::of);
  }

}
