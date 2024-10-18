package np.com.bhattaraiankit.auth_service.Models;

import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;

@Entity
@Table(name="authority")
public class Authority {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="authority_id")
    private int Id;

    @Column(name="authority_name")
    private String name;

    @ManyToMany(mappedBy = "authorities")
    private Set<User> users;

    public Authority(){}

    public int getId(){
        return Id;
    }

    public String getName(){
        return name;
    }

    public Set<User> getUsers(){
        return users;
    }
}
