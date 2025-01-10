package np.com.bhattaraiankit.video_service.Models;

import java.util.Set;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToOne;

import org.hibernate.annotations.UuidGenerator;
@Entity
public class Movie {

    @Id
    @UuidGenerator
    private String id;

    @OneToOne
    @JoinColumn(name = "video_id", nullable = false)
    private Video video;  // Reference to the Video entity.

    private String director;

    @Lob
    private String cast; // JSON array of cast members stored as String.

    @Lob
    private String metadata; // Flexible metadata stored as String.

    @ManyToMany
    @JoinTable(
        name = "movie_genre_mapping",
        joinColumns = @JoinColumn(name = "movie_id"),
        inverseJoinColumns = @JoinColumn(name = "genre_id")
    )
    private Set<Genre> genres;  // Many-to-Many relationship with Genre.

    public Movie(){}

    public String getId(){return this.id;}
    public Video getVideo(){return this.video;}
    public String getDirector() {return this.director;}
    public String getCase(){return this.cast;}
    public String getMetaData(){return this.metadata;}
    public Set<Genre> getGenre(){return this.genres;}


    public void setVideo(Video video) {
        this.video = video;
    }

    public void setDirector(String director) {
        this.director = director;
    }

    public void setCast(String cast) {
        this.cast = cast;
    }

    public void setMetadata(String metadata) {
        this.metadata = metadata;
    }

    public void setGenres(Set<Genre> genres) {
        this.genres = genres;
    }



}
