package np.com.bhattaraiankit.video_service.DTO.Requests;
import java.util.List;

public record CreateSeriesRequest(

            String title,
            String description,
            List<String> genres,
            String metaData
        ) {
}
