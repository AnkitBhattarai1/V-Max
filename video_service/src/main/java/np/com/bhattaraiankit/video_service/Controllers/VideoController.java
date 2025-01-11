
package np.com.bhattaraiankit.video_service.Controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import np.com.bhattaraiankit.video_service.DTO.Requests.CreateVideoRequest;
import np.com.bhattaraiankit.video_service.DTO.Responses.VideoResponse;
import np.com.bhattaraiankit.video_service.Services.VideoService;

@RestController 
@RequestMapping("/video")
public class VideoController {

    private final VideoService videoService;

    public VideoController(VideoService videoService) {
        this.videoService = videoService;
    }

    @PostMapping("/create")
    public ResponseEntity<VideoResponse> createVideo(
            @RequestPart("request") CreateVideoRequest request, // JSON payload for video details
            @RequestPart("video") MultipartFile videoFile,      // Multipart file for the video
            @RequestPart("thumbnail") MultipartFile thumbnailFile) { // Multipart file for the thumbnail

            VideoResponse response = videoService.createVideo(request, videoFile, thumbnailFile);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping("/all")
    public ResponseEntity<List<VideoResponse>> getAllVideos() {
        List<VideoResponse> videos = videoService.getAllVideos();
        return ResponseEntity.ok(videos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<VideoResponse> getVideoById(@PathVariable String id) {
        VideoResponse video = videoService.getVideoById(id);
        return ResponseEntity.ok(video);
    }

    @PutMapping("/{id}")
    public ResponseEntity<VideoResponse> updateVideo(
            @PathVariable String id,
            @RequestBody CreateVideoRequest request) {
        VideoResponse updatedVideo = videoService.updateVideo(id, request);
        return ResponseEntity.ok(updatedVideo);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteVideo(@PathVariable String id) {
        videoService.deleteVideo(id);
        return ResponseEntity.ok("Video deleted successfully.");
    }
}
