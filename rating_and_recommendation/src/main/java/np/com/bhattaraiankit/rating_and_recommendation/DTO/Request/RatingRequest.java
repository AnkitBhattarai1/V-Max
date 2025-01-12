package np.com.bhattaraiankit.rating_and_recommendation.DTO.Request;

public record RatingRequest(String videoId,
        String userId,
        double rating,
        String review) {
}
