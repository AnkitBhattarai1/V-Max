

package np.com.bhattaraiankit.video_service.Controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import np.com.bhattaraiankit.video_service.DTO.Requests.CreateEpisodeRequest;
import np.com.bhattaraiankit.video_service.DTO.Responses.EpisodeResponse;
import np.com.bhattaraiankit.video_service.Services.EpisodeService;

@RestController
@RequestMapping("/episodes")
public class EpisodeController {

    private final EpisodeService episodeService;

    public EpisodeController(EpisodeService episodeService) {
        this.episodeService = episodeService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<EpisodeResponse> getEpisodeById(@PathVariable String id) {
        return ResponseEntity.ok(episodeService.getEpisodeById(id));
    }

    @GetMapping("/season/{seasonId}")
    public ResponseEntity<List<EpisodeResponse>> getEpisodesBySeasonId(@PathVariable String seasonId) {
        return ResponseEntity.ok(episodeService.getEpisodesBySeasonId(seasonId));
    }

    @PostMapping
    public ResponseEntity<EpisodeResponse> createEpisode(@RequestBody CreateEpisodeRequest request) {
        return ResponseEntity.ok(episodeService.createEpisode(request));
    }
}
