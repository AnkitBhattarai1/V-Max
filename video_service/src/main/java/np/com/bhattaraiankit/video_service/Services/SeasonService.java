package np.com.bhattaraiankit.video_service.Services;



import java.util.List;

import org.springframework.stereotype.Service;

import np.com.bhattaraiankit.video_service.DTO.Requests.CreateSeasonRequest;
import np.com.bhattaraiankit.video_service.DTO.Responses.SeasonResponse;

@Service
public interface SeasonService {
    SeasonResponse getSeasonById(String id);
    List<SeasonResponse> getAllSeasonsBySeriesId(String seriesId);
    SeasonResponse createSeason(CreateSeasonRequest request);
}
