package np.com.bhattaraiankit.video_service.Services;

import java.util.List;

import np.com.bhattaraiankit.video_service.DTO.Requests.CreateVideoRequest;
import np.com.bhattaraiankit.video_service.DTO.Responses.VideoResponse;

public interface VideoService {

  VideoResponse createVideo(CreateVideoRequest request);
    VideoResponse getVideoById(String id);
    List<VideoResponse> getAllVideos();
    VideoResponse updateVideo(String id, CreateVideoRequest requestDTO);
    void deleteVideo(String id);
    
}
