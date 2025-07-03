package np.com.bhattaraiankit.rating_and_recommendation.Recommendation;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import np.com.bhattaraiankit.rating_and_recommendation.DTO.Summary.MovieRatingSummary;
import np.com.bhattaraiankit.rating_and_recommendation.Services.MovieRatingService;

@Component
public class RecommendationService {

  private final MovieRatingService movieRatingService;

  RecommendationService(MovieRatingService movieRatingService) {
    this.movieRatingService = movieRatingService;
  }

  private double calculateCosineSimilarity(Map<String, Double> user1, Map<String, Double> user2) {
    double dotProduct = 0.0;
    double magnitude1 = 0.0;
    double magnitude2 = 0.0;

    for (String movieId : user1.keySet()) {
      Double rating1 = user1.get(movieId); // gets the rating by user1 for the movieId
      Double rating2 = user2.getOrDefault(movieId, 0.0);// gets the rating by user2 if rated or make rating 0.0

      dotProduct += rating1 * rating2; // sum of r1*r2
      magnitude1 += Math.pow(rating1, 2); // sum of root under r1..square times r2..square
    }

    for (Double rating : user2.values()) {
      magnitude2 += Math.pow(rating, 2);
    }

    if (magnitude1 == 0 || magnitude2 == 0)
      return 0;

    return dotProduct / (Math.sqrt(magnitude1) * Math.sqrt(magnitude2));
  }

  private Map<String/* user */, Map<String/* movie_Id */, Double>> organizeRatingsByUser(
      List<MovieRatingSummary> ratings) {
    return ratings.stream()
        .collect(Collectors.groupingBy( // collects and group the rating of users..
            MovieRatingSummary::getUserId, // getting the userid
            Collectors.toMap(MovieRatingSummary::getVideoId, /* <movie_id,rating> */
                MovieRatingSummary::getRating)));
  }

  private Map<String/* Movie */, Double> calculateUserSimilarities(String targetUserId,
      Map<String, Map<String, Double>> userRatings) {

    Map<String, Double> userSimilarities = new HashMap<>();
    Map<String, Double> targetUserRatings = userRatings.getOrDefault(targetUserId, new HashMap<>());// ratings by the
                                                                                                    // user to which the
                                                                                                    // recommendation is
                                                                                                    // to be done......
                                                                                                    // if exists it
                                                                                                    // insert into the
                                                                                                    // existing HashMap
                                                                                                    // or create new
                                                                                                    // Hashmap for each
                                                                                                    // new user
                                                                                                    // encontering
    for (String otherUserId : userRatings.keySet()) {// the id's of otherr users.
      if (!otherUserId.equals(targetUserId)) {
        double similarity = calculateCosineSimilarity(targetUserRatings, userRatings.get(otherUserId));
        userSimilarities.put(otherUserId, similarity);
      }
    }

    return userSimilarities;
  }

  private Map<String/* movie */, Double/* cumulative score */> aggregrateRecommendation(
      Map<String, Double> targetUserRatings,
      List<String> similarUsers,
      Map<String/* user */, Map<String/* movieId */, Double>> userRatings) {

    Map<String, Double> recommendedItems = new HashMap<>();

    for (String similarUser : similarUsers) {
      Map<String, Double> similarUserRatings = userRatings.get(similarUser);
      for (Map.Entry<String, Double> entry : similarUserRatings.entrySet()) {
        String movieId = entry.getKey();
        Double rating = entry.getValue();

        if (!targetUserRatings.containsKey(movieId))
          recommendedItems.put(movieId, recommendedItems.getOrDefault(movieId, 0.0) + rating);
      }
    }
    return recommendedItems;
  }

  private Map<String, Double> aggregateRecommendation(
      Map<String, Double> targetUserRatings,
      List<String> similarUsers,
      Map<String, Map<String, Double>> userRatings) {

    Map<String, Double> recommendedItems = new HashMap<>();

    for (String similarUser : similarUsers) {
      Map<String, Double> similarUserRatings = userRatings.get(similarUser);
      for (Map.Entry<String, Double> entry : similarUserRatings.entrySet()) {
        String movieId = entry.getKey();
        Double rating = entry.getValue();

        // Only recommend movies that the target user has not rated yet
        if (!targetUserRatings.containsKey(movieId)) {
          recommendedItems.put(movieId, recommendedItems.getOrDefault(movieId, 0.0) + rating);
        }
      }
    }

    return recommendedItems;
  }

  public List<String> getMovieRecommendation(String userId, int N) {
    List<MovieRatingSummary> allRatings = movieRatingService.findAllRatingSummaries();

    Map<String/* user */, Map<String/* movieId */, Double>> userRatings = organizeRatingsByUser(allRatings);

    Map<String, Double> userSimilarities = calculateUserSimilarities(userId, userRatings);// userId and their respective
                                                                                          // similartiy scor

    List<Map.Entry<String, Double>> sortedUserSimilarities = userSimilarities.entrySet().stream() // Sort the users by
                                                                                                  // similarity score in
                                                                                                  // descending order
        .sorted((entry1, entry2) -> Double.compare(entry2.getValue(), entry1.getValue()))
        .collect(Collectors.toList());

    // Take the similar users
    List<String> topSimilarUsers = sortedUserSimilarities.stream()
        .map(Map.Entry::getKey)
        .collect(Collectors.toList());

    // Get the movie recommendations by aggregating the ratings of the similar users
    Map<String, Double> targetUserRatings = userRatings.getOrDefault(userId, new HashMap<>());
    Map<String, Double> recommendedItems = aggregateRecommendation(targetUserRatings, topSimilarUsers, userRatings);

    // Sort the recommended items by score in descending order and return the top N
    // movies
    return recommendedItems.entrySet().stream()
        .sorted((entry1, entry2) -> Double.compare(entry2.getValue(), entry1.getValue()))
        .limit(N)
        .map(Map.Entry::getKey)
        .collect(Collectors.toList());

  }

  /* map<user, map<movie,rating>> */
}
