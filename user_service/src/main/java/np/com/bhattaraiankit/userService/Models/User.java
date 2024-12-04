package np.com.bhattaraiankit.userService.Models;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import org.hibernate.annotations.UuidGenerator;

/**
 * User
 */

@Entity
@Table(name="users")
public class User {

    public enum User_STATUS{
        ACTIVE,INACTIVE,BANNED,PENDING
    }

    @Id
    @UuidGenerator
    @Column(name="user_id",unique=true,nullable=false)
    private String id;

    @Column(name="email",unique=true,nullable=false)
    private String email;

    @Column(name="user_name", unique=true, nullable=false)
    private String username;

    @Column(name="first_name")
    private String first_name;

    @Column(name="last_name")
    private String last_name;
    
    @Column(name="middle_name")
    private String middle_name;
    
    @Column(name="created_at")
    private LocalDateTime created_at;
    
    @Column(name="updated_at")
    private LocalDateTime updated_at;
    
    @Column(name="profile_pic_url", length = 255)
    private String profile_pic_url;
    
    
   // @Column(name="user_status")
    //private User_STATUS status;
    
    @Column(name="dob")
    private LocalDateTime dob;


    public String getEmail(){return this.email;}
    
    public String getUserName(){return this.username;}
    
    public LocalDateTime getCreatedDate(){return this.created_at;}
    

    public void setEmail(String email){this.email=email;}

    }

