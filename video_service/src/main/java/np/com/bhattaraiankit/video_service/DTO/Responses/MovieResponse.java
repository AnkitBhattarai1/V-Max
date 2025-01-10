package np.com.bhattaraiankit.video_service.DTO.Responses;



import java.util.Set;
import java.util.stream.Collectors;

import np.com.bhattaraiankit.video_service.Models.Genre;
import np.com.bhattaraiankit.video_service.Models.Movie;
public record MovieResponse(
    String id,
    String videoId,  // Representing the reference to the Video entity by its ID.
    String director,
    String cast,     // JSON array of cast members stored as a String.
    String metadata, // Flexible metadata stored as a String.
    Set<String> genres // List of genre names or IDs (depending on your implementation).
) {
    public static MovieResponse fromEntity(Movie movie) {
        return new MovieResponse(
            movie.getId(),
            movie.getVideo().getId(),  // Assuming Video entity has a getId() method.
            movie.getDirector(),
            movie.getCase(),
            movie.getMetaData(),
            movie.getGenre().stream()
                .map(Genre::getName)  // Assuming Genre entity has a getName() method.
                .collect(Collectors.toSet()) // Collect genre names to a Set.
        );
    }
}
