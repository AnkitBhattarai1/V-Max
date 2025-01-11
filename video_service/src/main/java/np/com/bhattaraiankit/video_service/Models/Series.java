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


    public String getId() {
        return id;
    }


    public String getTitle() {
        return title;
    }


    public String getDescription() {
        return description;
    }


    public int getTotalSeasons() {
        return totalSeasons;
    }


    public boolean isOngoing() {
        return ongoing;
    }


    public String getThumbnailUrl() {
        return thumbnailUrl;
    }


    public String getMetadata() {
        return metadata;
    }


    public List<Genre> getGenre() {
        return genre;
    }


    public List<Season> getSeasons() {
        return seasons;
    }




    public void setTitle(String title) {
        this.title = title;
    }


    public void setDescription(String description) {
        this.description = description;
    }


    public void setTotalSeasons(int totalSeasons) {
        this.totalSeasons = totalSeasons;
    }


    public void setOngoing(boolean ongoing) {
        this.ongoing = ongoing;
    }


    public void setThumbnailUrl(String thumbnailUrl) {
        this.thumbnailUrl = thumbnailUrl;
    }


    public void setMetadata(String metadata) {
        this.metadata = metadata;
    }


    public void setGenre(List<Genre> genre) {
        this.genre = genre;
    }


    public void setSeasons(List<Season> seasons) {
        this.seasons = seasons;
    }





}
