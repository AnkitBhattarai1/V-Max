package np.com.bhattaraiankit.video_service.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import np.com.bhattaraiankit.video_service.Models.Movie;

@Repository
public interface MovieRepo extends JpaRepository<Movie,String> {

    
 }
