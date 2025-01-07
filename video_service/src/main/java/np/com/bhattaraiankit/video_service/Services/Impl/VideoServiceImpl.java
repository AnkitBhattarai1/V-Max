package np.com.bhattaraiankit.video_service.Services.Impl;

import java.util.List;

import np.com.bhattaraiankit.video_service.DTO.Requests.CreateVideoRequest;
import np.com.bhattaraiankit.video_service.DTO.Responses.VideoResponse;
import np.com.bhattaraiankit.video_service.Models.Video;
import np.com.bhattaraiankit.video_service.Services.VideoService;

public class VideoServiceImpl implements VideoService {

    @Override
    public VideoResponse createVideo(CreateVideoRequest request) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public void deleteVideo(String id) {
        // TODO Auto-generated method stub
        
    }

    @Override
    public List<VideoResponse> getAllVideos() {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public VideoResponse getVideoById(String id) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public VideoResponse updateVideo(String id, CreateVideoRequest requestDTO) {
        // TODO Auto-generated method stub
        return null;
    }


    private Video requestToEntity(CreateVideoRequest request){
        Video v = new Video(); 
        v.setTitle(request.title());
        v.setDescription(request.description());
        v.setorginalVideoUrl(request.originalVideoUrl());
        
        return v;
    }
    
}

