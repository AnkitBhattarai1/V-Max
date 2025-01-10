package np.com.bhattaraiankit.video_service.Services;

import org.springframework.stereotype.Service;

import np.com.bhattaraiankit.video_service.Models.Genre;

@Service
 public interface GenreService {

     public boolean existsByName(String name);
     public Genre save(String s);
 }
