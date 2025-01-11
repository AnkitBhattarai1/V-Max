package np.com.bhattaraiankit.video_service.Services.Impl;

import org.springframework.stereotype.Service;

import np.com.bhattaraiankit.video_service.Models.Genre;
import np.com.bhattaraiankit.video_service.Repository.GenreRepo;
import np.com.bhattaraiankit.video_service.Services.GenreService;

@Service
public class GenreServiceImpl implements GenreService{

    private final GenreRepo genreRepo;

    GenreServiceImpl(GenreRepo genreRepo){
        this.genreRepo=genreRepo;
    }
    @Override
    public boolean existsByName(String name) {
        return genreRepo.existsByName(name);
    }
    @Override
    public Genre save(String genre) {
        return genreRepo.save(new Genre(genre));
    }


    
}
