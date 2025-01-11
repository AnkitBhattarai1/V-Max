
package np.com.bhattaraiankit.video_service.Services;

import java.util.List;

import org.springframework.stereotype.Service;

import np.com.bhattaraiankit.video_service.DTO.Requests.CreateEpisodeRequest;
import np.com.bhattaraiankit.video_service.DTO.Responses.EpisodeResponse;

@Service
public interface EpisodeService {
    EpisodeResponse getEpisodeById(String id);
    List<EpisodeResponse> getEpisodesBySeasonId(String seasonId);
    EpisodeResponse createEpisode(CreateEpisodeRequest request);
}
