package np.com.bhattaraiankit.rating_and_recommendation.Models;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;

import org.hibernate.annotations.UuidGenerator;

@Entity
public class MovieRating {
  @Id
  @UuidGenerator
  private String id;

  @Column(nullable = false)
  private String videoId;

  @Column(nullable = false)
  private String userId;

  @Column(nullable = false)
  private double rating; // Numeric rating (e.g., 1.0 to 5.0)

  @Column(length = 1000)
  private String review;

  @Column(nullable = false)
  private LocalDateTime createdAt; // Timestamp for wh

  public MovieRating() {
    this.createdAt = LocalDateTime.now();
  }

  public String getId() {
    return this.id;
  }

  public String getVideoId() {
    return this.videoId;
  }

  public String getUserId() {
    return this.userId;
  }

  public String getReview() {
    return this.review;
  }

  public double getRating() {
    return this.rating;
  }

  public void setVideoId(String videoId) {
    this.videoId = videoId;
  }

  public void setUserId(String userId) {
    this.userId = userId;
  }

  public void setRating(double rating) {
    if (rating > 5)
      rating = 5.0;
    if (rating < 0)
      rating = 0;
    this.rating = rating;
  }

  public void setReview(String review) {
    this.review = review;
  }

}
