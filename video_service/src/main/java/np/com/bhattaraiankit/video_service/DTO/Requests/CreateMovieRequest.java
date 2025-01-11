package np.com.bhattaraiankit.video_service.DTO.Requests;

import java.util.List;

public record CreateMovieRequest(        
        
        String Video_id,
        String cast,
        String director,
        List<String> genres,
        String metaData
        
        ) {
}
