
package np.com.bhattaraiankit.video_service.Services;

import java.util.List;

import org.springframework.stereotype.Service;

import np.com.bhattaraiankit.video_service.DTO.Requests.CreateSeriesRequest;
import np.com.bhattaraiankit.video_service.DTO.Responses.SeriesResponse;

@Service
public interface SeriesService {
    SeriesResponse getSeriesById(String id);
    List<SeriesResponse> getAllSeries();
    SeriesResponse createSeries(CreateSeriesRequest request);
}
