package np.com.bhattaraiankit.rating_and_recommendation.Controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import np.com.bhattaraiankit.rating_and_recommendation.Recommendation.RecommendationService;

@RestController
@RequestMapping("/recommendation")
public class RecommendationController {

  private final RecommendationService recommendationService;

  RecommendationController(RecommendationService recommendationService) {
    this.recommendationService = recommendationService;
  }

  @GetMapping("/{userId}")
  public ResponseEntity<List<String>> getMovieRecommendations(
      @PathVariable String userId,
      @RequestParam(defaultValue = "5") int N) {
    try {
      List<String> recommendations = recommendationService.getMovieRecommendation(userId, N);
      if (recommendations.isEmpty()) {
        return ResponseEntity.noContent().build(); // Return 204 if no recommendations are found
      }
      return ResponseEntity.ok(recommendations);
    } catch (Exception e) {
      return ResponseEntity.status(500).body(List.of("Error generating recommendations: " + e.getMessage()));
    }
  }

}
