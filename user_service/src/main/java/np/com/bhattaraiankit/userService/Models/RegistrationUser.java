package np.com.bhattaraiankit.userService.Models;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import org.hibernate.annotations.UuidGenerator;

/**
 * RegistrationUser
 */
@Entity
@Table(name="registration_user")
public class RegistrationUser {
    
    @Id
    @UuidGenerator
    @Column(name="id", length=36, nullable = false, unique=true)
    private String id;
    @Column(name="email",unique = true, nullable=false)
    private String email;
    @Column(name="is_verified")
    private boolean isVerified;
    @Column(name="verification_code", nullable=false)
    private  String verificationCode;
    @Column(name="verification_code_expiry", nullable=false)
    private LocalDateTime verification_code_expiry;

    //Constructor.
    public RegistrationUser(String email, String verification_code){
    
        this.email=email;
        this.verificationCode=verification_code;
        this.isVerified=false;
        this.verification_code_expiry = LocalDateTime.now().plusMinutes(15);

    }

    public RegistrationUser(){};

    public void setVerified(){ this.isVerified=true;}
    
    public String getId() {return this.id;}

    public boolean isVerified() {return this.isVerified;}
    
    public String getEmail() {return this.email;}

    public void setVerificationCode(String verification_code)
    {this.verificationCode = verification_code;}

    public String getVerificationCode(){return this.verificationCode;}

    public void setCodeExpiry(){
        this.verification_code_expiry = LocalDateTime.now().plusMinutes(15);
    }

    public LocalDateTime getExpiry(){return this.verification_code_expiry;}
}
