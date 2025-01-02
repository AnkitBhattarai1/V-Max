package np.com.bhattaraiankit.userService.Services.Impl;

import static  java.util.Locale.ENGLISH;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Random;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import jakarta.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import np.com.bhattaraiankit.userService.DTO.RegistrationUserResponse;
import np.com.bhattaraiankit.userService.DTO.UserRequest;
import np.com.bhattaraiankit.userService.DTO.UserResponse;
import np.com.bhattaraiankit.userService.Models.RegistrationUser;
import np.com.bhattaraiankit.userService.Models.User;
import np.com.bhattaraiankit.userService.Repository.RegistrationUserRepo;
import np.com.bhattaraiankit.userService.Repository.UserRepo;
import np.com.bhattaraiankit.userService.Services.UserService;
import np.com.bhattaraiankit.userService.Utils.BloomFilter.BloomFilter;
import np.com.bhattaraiankit.userService.Utils.BloomFilter.BloomFilterService;
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
    private final BloomFilter<String> bloomFilter;
    private final BloomFilterService bloomFilterService; 
    
   private final AuthServiceClient authServiceClient;

    @Autowired
    JavaMailSender javaMailSender;
    
    public UserServiceImpl(UserRepo userRepo,
                           RegistrationUserRepo userRegistrationRepo,
                           BloomFilterService bloomFilterService,
                           AuthServiceClient authServiceClient)
    {    
        this.userRepo=userRepo;
        this.registrationUserRepo = userRegistrationRepo;
        this.bloomFilterService=bloomFilterService;
        this.authServiceClient = authServiceClient;
        this.bloomFilter = new BloomFilter<>(100000, 3, 
                String::hashCode,
                s-> s.hashCode()*17,
                s-> s.hashCode()*31
                    );
        this.bloomFilter.setBitSet(bloomFilterService.loadBitSet());
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

        if(bloomFilter.mightContains(email))
            if(userRepo.findByEmail(email).isPresent())
                throw new IllegalArgumentException("The user is already registered from the bloom filter");
        
        var u = registrationUserRepo.findByEmail(email);//if the user has already entered the email.
                                                        
        if(u.isPresent()){
            registrationUser = u.get();
            
        if(registrationUser.isVerified())
                return registrationUser.getEmail();//if the user is already verified. 

                if(registrationUser.getExpiry().isAfter(LocalDateTime.now()))//or if the verification code is not expired.
            return registrationUser.getEmail();
                       

            return refreshVerificationCode(registrationUser);
        }

        registrationUser = new RegistrationUser(email,sendVerificationCode(email));
        registrationUserRepo.save(registrationUser);
        bloomFilter.add(email);
        bloomFilterService.setBitSet(bloomFilter.getBitSet());
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

    @Override
    public RegistrationUserResponse getRegisteredUser(String email) {

        if(bloomFilter.mightContains(email)) { 
        RegistrationUser u = registrationUserRepo.findByEmail(email)
            .orElseThrow(()-> new UserNotFoundException("The user is not registered"));
       
        return new RegistrationUserResponse(u.getId(), u.getEmail(), u.isVerified());
        }
    throw new UserNotFoundException("The user is not registered");
    }

    @Override
    @Transactional
    public UserResponse addUser(UserRequest requestUser) {
       
        if(!(authServiceClient.isUserExist(requestUser.email())
                    .isPresent()))
            throw new UserNotFoundException("The user is not registered yet");

        User u = new User();
        u.setEmail(requestUser.email());
        u.setUsername(requestUser.email());
        u.setDob(requestUser.dob());
        u.setFirst_name(requestUser.first_name());
        u.setLast_name(requestUser.last_name());
        u.setMiddle_name(requestUser.middle_name());
        u.setCreated_at(LocalDateTime.now());   
        u.setUpdated_at(LocalDateTime.now());
        u.setProfile_pic_url(null);
       
        User registeredUser = userRepo.save(u);
    
        UserResponse res = new UserResponse(u.getId(),
               u.getEmail(),
               u.getUsername(),
               "This name in response is to be changed", 
               u.getCreated_at(),
               u.getUpdated_at(),
               u.getDob(),
               u.getProfile_pic_url()); 
       registrationUserRepo.deleteFromEmail(u.getEmail());  
        return res;
    }
    
}
