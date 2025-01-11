package np.com.bhattaraiankit.video_service.Models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;

import org.hibernate.annotations.UuidGenerator;

@Entity
public class Genre {

  @Id
  @UuidGenerator
  private String id;

    @Column(unique = true, nullable = false)
    private String name;

    public Genre(String name){this.name=name;}
    public Genre(){}
    public  String getId(){return this.id;}
    public String getName(){return this.name;}


    public void setName(String name){this.name=name;}
}
