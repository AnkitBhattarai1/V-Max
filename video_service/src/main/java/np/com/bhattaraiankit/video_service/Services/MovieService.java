package np.com.bhattaraiankit.video_service.Services;
import java.util.List;

import org.springframework.stereotype.Service;

import np.com.bhattaraiankit.video_service.DTO.Requests.CreateMovieRequest;
import np.com.bhattaraiankit.video_service.DTO.Responses.MovieResponse;

@Service
public interface MovieService {

    public MovieResponse getMovieById(String id);
    public List<MovieResponse> getMoviesByIds(List<String> ids); 
    public MovieResponse createMovie(CreateMovieRequest movieRequest);

    public List<MovieResponse> getAllMovies();
    
}
