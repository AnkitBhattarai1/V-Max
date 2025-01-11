
package np.com.bhattaraiankit.video_service.Controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import np.com.bhattaraiankit.video_service.DTO.Requests.CreateSeriesRequest;
import np.com.bhattaraiankit.video_service.DTO.Responses.SeriesResponse;
import np.com.bhattaraiankit.video_service.Services.SeriesService;

@RestController
@RequestMapping("/series")
public class SeriesController {

    private final SeriesService seriesService;

    public SeriesController(SeriesService seriesService) {
        this.seriesService = seriesService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<SeriesResponse> getSeriesById(@PathVariable String id) {
        return ResponseEntity.ok(seriesService.getSeriesById(id));
    }

    @GetMapping
    public ResponseEntity<List<SeriesResponse>> getAllSeries() {
        return ResponseEntity.ok(seriesService.getAllSeries());
    }

    @PostMapping
    public ResponseEntity<SeriesResponse> createSeries(@RequestBody CreateSeriesRequest request) {
        return ResponseEntity.ok(seriesService.createSeries(request));
    }
}
