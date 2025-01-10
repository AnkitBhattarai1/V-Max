package np.com.bhattaraiankit.video_service.Models;


import java.time.LocalDate;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

import org.hibernate.annotations.UuidGenerator;

@Entity
public class Season {

    @Id
    @UuidGenerator
    private String id;

    @ManyToOne
    @JoinColumn(name = "series_id", nullable = false)
    private Series series;

    private int seasonNumber;
    private LocalDate releaseDate;

    private String metadata;

    @ManyToMany
    @JoinTable(
    name = "series_genre_mapping",
    joinColumns = @JoinColumn(name="season_id"),
    inverseJoinColumns = @JoinColumn(name="genre_id")
    )
    private List<Genre> genres;

    @OneToMany(mappedBy = "season", cascade = CascadeType.ALL)
    private List<Episode> episodes;

    // Getters and Setters
}
