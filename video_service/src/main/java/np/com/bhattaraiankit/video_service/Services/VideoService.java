package np.com.bhattaraiankit.video_service.Services;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import np.com.bhattaraiankit.video_service.DTO.Requests.CreateVideoRequest;
import np.com.bhattaraiankit.video_service.DTO.Responses.VideoResponse;

@Service
public interface VideoService {

  VideoResponse createVideo(CreateVideoRequest request,
          MultipartFile video,
          MultipartFile thumbnail);

    VideoResponse getVideoById(String id);
    List<VideoResponse> getAllVideos();
    VideoResponse updateVideo(String id, CreateVideoRequest requestDTO);
    void deleteVideo(String id);
}
