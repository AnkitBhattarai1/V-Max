package np.com.bhattaraiankit.video_service.Models;


import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;

import org.hibernate.annotations.UuidGenerator;
@Entity
public class Series {

    @Id
    @UuidGenerator
    private String id;

    private String title;
    private String description;

    private int totalSeasons;

    private boolean ongoing;

    private String thumbnailUrl;

    private String metadata;

    @ManyToMany
    @JoinTable(name="series_genre_mapping",
    joinColumns = @JoinColumn(name="series_id"),
    inverseJoinColumns = @JoinColumn(name="genre_id"))
    private List<Genre> genre;


    @OneToMany(mappedBy = "series", cascade = CascadeType.ALL)
    private List<Season> seasons;


    // Getters and Setters
}
