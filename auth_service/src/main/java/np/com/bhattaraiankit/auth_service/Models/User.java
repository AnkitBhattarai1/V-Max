package np.com.bhattaraiankit.auth_service.Models;

import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;

import org.hibernate.annotations.UuidGenerator;
/**
 * User
 */
@Entity
@Table(name="users")
public class User {

    @Id
    @UuidGenerator
    @Column(name="user_id",length = 36)
    private String id;

    @Column(name="user_name", unique = true)
    private String userName;

    @Column(name="email", unique =  true)
    private String email;

    @Column(name="hashed_password")
    private String password;
    @ManyToMany()
    @JoinTable(name = "user_authority",
                joinColumns = @JoinColumn(name="user_id"),
                inverseJoinColumns = @JoinColumn(name="authority_id")
            ) 
    private Set<Authority> authorities;    

    public User(){
    }

    public void setId(String id){
        this.id=id;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }

    public void setUserName(String username){
        this.userName= username;
    }
    public String getUserName(){
        return this.userName;
    }
    public void setAuthorities(Set<Authority> authorities){this.authorities=authorities;}
    public Set<Authority> getAuthorities(){
        return authorities;
    }
    
}
