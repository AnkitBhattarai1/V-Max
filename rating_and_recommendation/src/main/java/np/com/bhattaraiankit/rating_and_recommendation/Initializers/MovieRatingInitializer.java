
package np.com.bhattaraiankit.rating_and_recommendation.Initializers;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.UUID;

import jakarta.annotation.PostConstruct;

import np.com.bhattaraiankit.rating_and_recommendation.Models.MovieRating;
import np.com.bhattaraiankit.rating_and_recommendation.Repository.MovieRatingRepo;

public class MovieRatingInitializer {

  private final MovieRatingRepo ratingRepo;
  private final Random random = new Random();

  public MovieRatingInitializer(MovieRatingRepo ratingRepo) {
    this.ratingRepo = ratingRepo;
  }

  @PostConstruct
  public void initializeData() {
    List<MovieRating> ratings = new ArrayList<>();

    List<String> movieIds = new ArrayList<>();
    for (int i = 1; i <= 30; i++) {
      movieIds.add(UUID.randomUUID().toString());
    }

    for (int i = 1; i <= 100; i++) {
      String userId = UUID.randomUUID().toString();

      int moviesToRate = random.nextInt(10); // Generates a number between 0 and 10

      // Randomly select the movies the user will rate
      List<String> ratedMovies = new ArrayList<>();
      while (ratedMovies.size() < moviesToRate) {
        String movieId = movieIds.get(random.nextInt(movieIds.size()));
        if (!ratedMovies.contains(movieId)) {
          ratedMovies.add(movieId);
        }
      }

      // Generate a rating for each selected movie
      for (String movieId : ratedMovies) {
        MovieRating rating = new MovieRating();

        // Randomized rating between 1.0 and 5.0
        double ratingValue = Math.round((1 + Math.random() * 4) * 10) / 10.0; // Rounded to 1 decimal

        // Random reviews
        String[] reviews = {
            "An amazing movie!",
            "Not bad, but could have been better.",
            "Absolutely loved it! Highly recommended.",
            "Disappointing. Expected much more.",
            "Visually stunning, but weak plot.",
            "A solid 4-star movie.",
            "Masterpiece! Will watch again.",
            "Good movie for a lazy afternoon.",
            "Fantastic performances by the cast!",
            "Uninspiring and boring."
        };
        String review = reviews[random.nextInt(reviews.length)];

        // Set properties
        rating.setVideoId(movieId);
        rating.setUserId(userId);
        rating.setRating(ratingValue);
        rating.setReview(review);

        ratings.add(rating);
      }
    }

    // Save all ratings to the repository
    ratingRepo.saveAll(ratings);

    System.out.println("Ratings have been added to the database, where users rated between 0 and 30 movies.");
  }
}
