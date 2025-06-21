package np.com.bhattaraiankit.video_service.Services;

import java.util.List;

import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import np.com.bhattaraiankit.video_service.DTO.Requests.CreateVideoRequest;
import np.com.bhattaraiankit.video_service.DTO.Responses.VideoResponse;
@Service
public interface VideoService {

  VideoResponse createVideo(CreateVideoRequest request, MultipartFile video,
          MultipartFile thumbnail);

    VideoResponse getVideoById(String id);
    List<VideoResponse> getAllVideos();
    void deleteVideo(String id);

    Resource stream(String videoId);
    Resource getThumbnail(String videoId);
}
