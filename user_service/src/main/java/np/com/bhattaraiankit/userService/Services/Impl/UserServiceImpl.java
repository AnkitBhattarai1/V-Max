package np.com.bhattaraiankit.userService.Services.Impl;

import static  java.util.Locale.ENGLISH;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Random;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import np.com.bhattaraiankit.userService.Models.RegistrationUser;
import np.com.bhattaraiankit.userService.Repository.RegistrationUserRepo;
import np.com.bhattaraiankit.userService.Repository.UserRepo;
import np.com.bhattaraiankit.userService.Services.UserService;
import np.com.bhattaraiankit.userService.exceptions.InvalidVerificationCode;
import np.com.bhattaraiankit.userService.exceptions.UserNotFoundException;
import np.com.bhattaraiankit.userService.exceptions.VerificationCodeExpires;
/**
 * UserServiceImpl
 */
@Service
public class UserServiceImpl implements UserService {

    private final UserRepo userRepo;
    private final RegistrationUserRepo registrationUserRepo;

    @Autowired
    JavaMailSender javaMailSender;
    public UserServiceImpl(UserRepo userRepo,
                            RegistrationUserRepo userRegistrationRepo){
        
        this.userRepo=userRepo;
        this.registrationUserRepo = userRegistrationRepo;
    }

    private String sendVerificationCode(String email) throws MessagingException {
   
        String verification_code = String.format(ENGLISH,"%06d", new Random().nextInt(999999));
       
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();

        MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage);
        mimeMessageHelper.setTo(email.trim().replaceAll("[\\n\\r]", ""));
        mimeMessageHelper.setSubject("Verify your registration");
        mimeMessage.setText(verification_code);

        javaMailSender.send(mimeMessage);
        return verification_code;
    }

    private String refreshVerificationCode(RegistrationUser u ) throws MessagingException{
        
        u.setVerificationCode(sendVerificationCode(u.getEmail()));
        u.setCodeExpiry();
        RegistrationUser savedUser = registrationUserRepo.save(u);
        return savedUser.getEmail();
    }

    @Override
    public String  registerUserEmail(String email) throws MessagingException{
        
        RegistrationUser registrationUser;

        if(userRepo.findByEmail(email).isPresent()) 
            throw new IllegalArgumentException("The user is already registered");

        var u = registrationUserRepo.findByEmail(email);

        if(u.isPresent()){
            registrationUser = u.get();
            
        if(registrationUser.isVerified())
            return registrationUser.getEmail();
            
            if(registrationUser.getExpiry().isAfter(LocalDateTime.now())){
                return registrationUser.getEmail();
            }

            return refreshVerificationCode(registrationUser);
        }

        registrationUser = new RegistrationUser(email,sendVerificationCode(email));
        registrationUserRepo.save(registrationUser);
        return email;       
    }

 
    @Override
    public String verifyUserEmail(String email,
            String verification_code) throws MessagingException{

        Optional<RegistrationUser> user = registrationUserRepo.findByEmail(email);

        if(!user.isPresent())
            throw new UserNotFoundException("The user cannot be found");

        RegistrationUser registrationUser = user.get();
        

        if(registrationUser.getExpiry().isBefore(LocalDateTime.now())) 
        {
            refreshVerificationCode(registrationUser);
            throw new VerificationCodeExpires("The code is expired check the email for the new code");
        }

        if(registrationUser.getVerificationCode().equals(verification_code)) {
            registrationUser.setVerified();    
            return registrationUserRepo.save(registrationUser).getEmail();
        }

        throw new InvalidVerificationCode("The verification code doesn't match");

    }



    
}
