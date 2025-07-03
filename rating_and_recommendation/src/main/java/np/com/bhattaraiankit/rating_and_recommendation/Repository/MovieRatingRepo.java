
package np.com.bhattaraiankit.rating_and_recommendation.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import np.com.bhattaraiankit.rating_and_recommendation.DTO.Summary.MovieRatingSummary;
import np.com.bhattaraiankit.rating_and_recommendation.Models.MovieRating;

@Repository
public interface MovieRatingRepo extends JpaRepository<MovieRating, String> {

  @Query("SELECT r FROM MovieRating r WHERE r.userId = :userId")
  Optional<List<MovieRating>> findByUserId(String userId);

  @Query("SELECT r FROM MovieRating r WHERE r.videoId = :movieId")
  Optional<List<MovieRating>> findByMovieId(String movieId);

  @Query("SELECT r.videoId AS videoId, r.userId AS userId, r.rating AS rating FROM MovieRating r")
  Optional<List<MovieRatingSummary>> findAllRatingSummaries();

  @Query("SELECT r.videoId AS videoId, r.userId AS userId, r.rating AS rating FROM MovieRating r WHERE r.videoId = :movieId")
  Optional<List<MovieRatingSummary>> findRatingSummariesByVideoId(String movieId);

  @Query("SELECT r.videoId AS videoId, r.userId AS userId, r.rating AS rating FROM MovieRating r WHERE r.userId = :userId")
  Optional<List<MovieRatingSummary>> findRatingSummariesByUserId(String userId);

  Optional<MovieRating> findByUserIdAndVideoId(String userId, String videoId);
}
