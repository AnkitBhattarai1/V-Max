package np.com.bhattaraiankit.video_service.Services.Impl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import np.com.bhattaraiankit.video_service.DTO.Requests.CreateMovieRequest;
import np.com.bhattaraiankit.video_service.DTO.Responses.MovieResponse;
import np.com.bhattaraiankit.video_service.Models.Genre;
import np.com.bhattaraiankit.video_service.Models.Movie;
import np.com.bhattaraiankit.video_service.Repository.GenreRepo;
import np.com.bhattaraiankit.video_service.Repository.MovieRepo;
import np.com.bhattaraiankit.video_service.Repository.VideoRepo;
import np.com.bhattaraiankit.video_service.Services.MovieService;
@Service
public class MovieServiceImpl implements MovieService {


    private final MovieRepo movieRepo;
    private final VideoRepo videoRepo;
    private final GenreRepo genreRepo;

    MovieServiceImpl(MovieRepo movieRepo,
            VideoRepo videoRepo,
            GenreRepo genreRepo){
        this.movieRepo=movieRepo;
        this.videoRepo=videoRepo;
        this.genreRepo=genreRepo;
    }

    @Override
    public MovieResponse getMovieById(String id) {

     // Find the movie by ID or throw an exception if not found
        Movie movie = movieRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Movie not found with ID: " + id));
        
        // Convert the movie entity to response DTO
        return MovieResponse.fromEntity(movie);
    }

    @Override
    public List<MovieResponse> getMoviesByIds(List<String> ids) {
        
     // Fetch movies for the given IDs
        List<Movie> movies = movieRepo.findAllById(ids);
        
        // Convert each movie entity to a response DTO
        return movies.stream()
                .map(MovieResponse::fromEntity)
                .collect(Collectors.toList());
    }



    @Override
    public MovieResponse createMovie(CreateMovieRequest movieRequest) {
        return MovieResponse.fromEntity(movieRepo.save(requestToMovieEntity(movieRequest))); 
    }

    private Movie requestToMovieEntity(CreateMovieRequest request){

        Movie m = new Movie();

        m.setCast(request.cast());
        m.setDirector(request.director());
        m.setMetadata(request.metaData());

       
        if(videoRepo.existsById(request.Video_id())){
            m.setVideo(videoRepo.findById(request.Video_id()).get());
        }
        else{
            throw new RuntimeException("Video not Found");
        }
        // m.setVideo(videoRepo.findById(movieRequest.getVideoId())
         //       .orElseThrow(() -> new RuntimeException("Video not found")));
        
       m.setGenres(request.genres()
               .stream()
               .map(genre -> {
                Optional<Genre> g = genreRepo.findByName(genre);
                return g.orElseGet(()  -> genreRepo.save(new Genre(genre)));
               })
                .collect(Collectors.toSet())); 

    return m;
    }

    @Override
    public List<MovieResponse> getAllMovies() {
        // Assuming MovieRepository has a method to fetch all movies
        List<Movie> allMovies = movieRepo.findAll();

        // Convert Movie entities to MovieResponse DTOs
        return allMovies.stream()
            .map(MovieResponse::fromEntity)
                        .collect(Collectors.toList());
    }

    
}
