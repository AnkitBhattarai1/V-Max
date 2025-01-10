package np.com.bhattaraiankit.video_service.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import np.com.bhattaraiankit.video_service.Models.Video;

@Repository
public interface MovieRepo extends JpaRepository<Video,String> {

    
 }
