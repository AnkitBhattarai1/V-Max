package np.com.bhattaraiankit.video_service.Services.Impl;

import java.util.List;

import org.springframework.stereotype.Repository;

import np.com.bhattaraiankit.video_service.DTO.Requests.CreateMovieRequest;
import np.com.bhattaraiankit.video_service.DTO.Responses.MovieResponse;
import np.com.bhattaraiankit.video_service.Services.MovieService;

@Repository
public class MovieServiceImpl implements MovieService {

    @Override
    public MovieResponse getMovieById(String id) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public List<MovieResponse> getMoviesByIds(List<String> ids) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public MovieResponse createMovie(CreateMovieRequest movieRequest) {
        // TODO Auto-generated method stub
        return null;
    }

    
}
