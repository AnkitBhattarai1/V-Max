package np.com.bhattaraiankit.video_service.Controllers;



import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import np.com.bhattaraiankit.video_service.DTO.Requests.CreateSeasonRequest;
import np.com.bhattaraiankit.video_service.DTO.Responses.SeasonResponse;
import np.com.bhattaraiankit.video_service.Services.SeasonService;

@RestController
@RequestMapping("/season")
public class SeasonController {

    private final SeasonService seasonService;

    public SeasonController(SeasonService seasonService) {
        this.seasonService = seasonService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<SeasonResponse> getSeasonById(@PathVariable String id) {
        return ResponseEntity.ok(seasonService.getSeasonById(id));
    }

    @GetMapping
    public ResponseEntity<List<SeasonResponse>> getAllSeasonsBySeriesId(@RequestParam String seriesId) {
        return ResponseEntity.ok(seasonService.getAllSeasonsBySeriesId(seriesId));
    }

    @PostMapping
    public ResponseEntity<SeasonResponse> createSeason(@RequestBody CreateSeasonRequest request) {
        return ResponseEntity.ok(seasonService.createSeason(request));
    }
}
