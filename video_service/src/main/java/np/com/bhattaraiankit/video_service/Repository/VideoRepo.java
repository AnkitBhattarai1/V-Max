package np.com.bhattaraiankit.video_service.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import np.com.bhattaraiankit.video_service.Models.Video;

public interface VideoRepo extends JpaRepository<Video,String>{

    
}
