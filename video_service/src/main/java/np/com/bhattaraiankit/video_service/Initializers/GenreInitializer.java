package np.com.bhattaraiankit.video_service.Initializers;

import java.util.List;

import jakarta.annotation.PostConstruct;

import org.springframework.stereotype.Component;

import np.com.bhattaraiankit.video_service.Services.GenreService;

@Component
//Initializer to populate the table of genre while deploying the application first time..........
public class GenreInitializer {

    private final  GenreService genreService;
   
    GenreInitializer(GenreService genreService){
        this.genreService=genreService;
    }
    

    @PostConstruct
    public void initializeGenres(){
        
        List<String> genres = List.of(
            "Action",
            "Comedy",
            "Drama",
            "Horror",
            "Sci-Fi",
            "Romance",
            "Documentary",
            "Fantasy",
            "Thriller",
            "Adventure"
        );

       // genres.stream().filter(genre->((genreService.existsByName(genre)))).forEach(System.out::println);
        genres.stream()
            .filter(genre->(!(genreService.existsByName(genre))))

            .forEach(genreService::save);
    }


}
