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


    public String getId() {
        return id;
    }


    public String getEmail() {
        return email;
    }


    public void setEmail(String email) {
        this.email = email;
    }


    public String getUsername() {
        return username;
    }


    public void setUsername(String username) {
        this.username = username;
    }


    public String getFirst_name() {
        return first_name;
    }


    public void setFirst_name(String first_name) {
        this.first_name = first_name;
    }


    public String getLast_name() {
        return last_name;
    }


    public void setLast_name(String last_name) {
        this.last_name = last_name;
    }


    public String getMiddle_name() {
        return middle_name;
    }


    public void setMiddle_name(String middle_name) {
        this.middle_name = middle_name;
    }


    public LocalDateTime getCreated_at() {
        return created_at;
    }


    public void setCreated_at(LocalDateTime created_at) {
        this.created_at = created_at;
    }


    public LocalDateTime getUpdated_at() {
        return updated_at;
    }


    public void setUpdated_at(LocalDateTime updated_at) {
        this.updated_at = updated_at;
    }


    public String getProfile_pic_url() {
        return profile_pic_url;
    }


    public void setProfile_pic_url(String profile_pic_url) {
        this.profile_pic_url = profile_pic_url;
    }


    public LocalDateTime getDob() {
        return dob;
    }


    public void setDob(LocalDateTime dob) {
        this.dob = dob;
    }


    @Override
    public String toString() {
        return "User{id=" + id + ", email=" + email + ", username=" + username + ", first_name=" + first_name
                + ", last_name=" + last_name + ", middle_name=" + middle_name + ", created_at=" + created_at
                + ", updated_at=" + updated_at + ", profile_pic_url=" + profile_pic_url + ", dob=" + dob + "}";
    }


}

