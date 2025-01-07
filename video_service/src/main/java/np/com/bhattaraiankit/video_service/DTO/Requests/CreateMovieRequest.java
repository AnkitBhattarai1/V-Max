package np.com.bhattaraiankit.video_service.DTO.Requests;
import java.util.List;
public record CreateMovieRequest(
        
        String Video_id,
        String cast,
        List<String> genre,
        String metaData
        ) {
}
