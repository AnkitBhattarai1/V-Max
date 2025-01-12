package np.com.bhattaraiankit.video_service.Services.Impl;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.util.UriComponentsBuilder;

import np.com.bhattaraiankit.video_service.Constants.Constants;
import np.com.bhattaraiankit.video_service.DTO.Requests.CreateVideoRequest;
import np.com.bhattaraiankit.video_service.DTO.Responses.VideoResponse;
import np.com.bhattaraiankit.video_service.Exceptions.VideoNotFoundException;
import np.com.bhattaraiankit.video_service.Models.Video;
import np.com.bhattaraiankit.video_service.Models.Video.VideoStatus;
import np.com.bhattaraiankit.video_service.Repository.VideoRepo;
import np.com.bhattaraiankit.video_service.Services.VideoService;

@Service
public class VideoServiceImpl implements VideoService {

    

    private static final String API_GATEWAY_HOST = "localhost";
    private static final int API_GATEWAY_PORT = 9090;

    private final Constants constants;
    private final VideoRepo videoRepo;

    VideoServiceImpl(VideoRepo videoRepo,
            Constants constants)
    {
        this.videoRepo=videoRepo;
        this.constants=constants;// contains methods to have all the dynamic constants...
    }

    @Override
    public VideoResponse createVideo(CreateVideoRequest request,
            MultipartFile video,
            MultipartFile thumbnail){
        
        Video v= requestToEntity(request);
        Video saveInstance = videoRepo.save(v);
        
        String videoUrl = uploadVideo(video,saveInstance.getId());// upload video to the storage... 
        String thumbnailUrl = uploadThumbnail(thumbnail,saveInstance.getId());//upload thumbnail to the storage

        v.setorginalVideoUrl(videoUrl);
        v.setThumbnailUrl(thumbnailUrl); 
        

        Video savedVideo = videoRepo.save(v);
// To transcode the video and do something/// 

        // Convert the saved video entity to a response DTO
        return entityToResponse(savedVideo);
    }
  

    @Override
    public void deleteVideo(String id) {
        // Check if the video exists
        Optional<Video> video = videoRepo.findById(id);
        if (video.isEmpty()) {
            throw new VideoNotFoundException("Video with ID " + id + " not found");
        }

        // Delete the video
        videoRepo.delete(video.get());
    }






    @Override
    public List<VideoResponse> getAllVideos() {
        // Fetch all video entities from the database
        List<Video> videos = videoRepo.findAll();

        // Convert the list of video entities to a list of response DTOs
        return videos.stream()
                .map(this::entityToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public VideoResponse getVideoById(String id) {
        // Fetch the video entity by ID
        Video video = videoRepo.findById(id)
                .orElseThrow(() -> new VideoNotFoundException("Video with ID " + id + " not found"));

        // Convert the video entity to a response DTO
        return entityToResponse(video);
    }

    // To get the extension of the video file. 
    private String getFileExtension(String filename){
        return Optional.of(filename).filter(name->name.contains("."))
            .map(name->"."+name.substring(filename.lastIndexOf(".")+1))
            .orElse(".mp4");
    }

    //Upload video///***
    private String uploadVideo(MultipartFile video,String id){
            // logic to  upload the video to the storage...
        Path file_location = Paths.get(constants.getVideoLocation()+id+"/").toAbsolutePath().normalize();

        try{       
            if(!Files.exists(file_location))
            Files.createDirectories(file_location);// create file location if it is not already exists....

            //copies file to the specific location...
        Files.copy(video.getInputStream(),
                file_location.resolve(id+getFileExtension(video.getOriginalFilename())));



    return  UriComponentsBuilder.newInstance()
            .scheme("http")
            .host(API_GATEWAY_HOST)
            .port(API_GATEWAY_PORT)
            .path("/video/stream/"+id)
            .toUriString();
        }

        catch(Exception e){
        
            throw new RuntimeException(e.getMessage());
    }
}

    private String uploadThumbnail(MultipartFile thumbnail, String id){

        //logic to add the thumbnail...
        
        Path file_location = Paths.get(constants.getThumbnailLocation()+id+"/").toAbsolutePath().normalize();

        try{       
            if(!Files.exists(file_location))
            Files.createDirectories(file_location);// create file location if it is not already exists....

            //copies file to the specific location...
        Files.copy(thumbnail.getInputStream(),
                file_location.resolve(id+getFileExtension(thumbnail.getOriginalFilename())));



    return  UriComponentsBuilder.newInstance()
            .scheme("http")
            .host(API_GATEWAY_HOST)
            .port(API_GATEWAY_PORT)
            .path("/video/thumbnail/"+id)
            .toUriString();
        }
   
        catch(Exception e){
        
            throw new RuntimeException(e.getMessage());
    }
        
    }



    @Override
    public Resource stream(String videoId) {

        String filePath = (constants.getVideoLocation())+videoId+"/"+videoId+".mp4";
        Resource resource = new FileSystemResource(filePath);
        //String contentType = "application/octect-stream";
        // TODO Auto-generated method stub
        return resource;
    }



    
    @Override
    public Resource getThumbnail(String videoId) {

        String filePath = (constants.getThumbnailLocation())+videoId+"/"+videoId+".jpg";
        return new FileSystemResource(filePath);
    }

    // Private helper method to convert CreateVideoRequest to Video entity
    private Video requestToEntity(CreateVideoRequest request) {
        Video video = new Video();
        video.setTitle(request.title());
        video.setDescription(request.description());
        video.setTrailerUrl(request.trailerUrl());
        video.setReleaseDate(request.releaseDate());
        video.setDuration(request.duration());
        video.setVideoType(request.videoType());// whether a video is  of sereis, or movie
        video.setAgeRating(request.ageRating());
        video.setLanguage(request.language());
        video.setVideoStatus(VideoStatus.TRANSCODING);
        video.setMetaData(request.metadata());
        return video;
    }

    // Private helper method to convert Video entity to VideoResponse DTO
    private VideoResponse entityToResponse(Video video) {
        return new VideoResponse(           
                video.getId(),
                video.getTitle(),
                video.getDescription(),
                video.getOriginalVideoUrl(),
                video.getThumbnailUrl(),
                video.getTrailerUrl(),
                video.getReleaseDate(),
                video.getDuration(),
                video.getType(),
                video.getAgeRating(),
                video.getLanguage(),
                video.getStatus(),
                video.getMetadata()
        );

    }
}

