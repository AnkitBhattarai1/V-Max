package np.com.bhattaraiankit.auth_service.Services.Impl;
import java.util.HashSet;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import np.com.bhattaraiankit.auth_service.BloomFilter.BloomFilter;
import np.com.bhattaraiankit.auth_service.BloomFilter.BloomFilterService;
import np.com.bhattaraiankit.auth_service.DTO.JWTResponse;
import np.com.bhattaraiankit.auth_service.DTO.LoginRequest;
import np.com.bhattaraiankit.auth_service.DTO.RegistrationUserDTO;
import np.com.bhattaraiankit.auth_service.DTO.SignUpRequest;
import np.com.bhattaraiankit.auth_service.Models.User;
import np.com.bhattaraiankit.auth_service.Repo.UserRepo;
import np.com.bhattaraiankit.auth_service.Services.UserService;
import np.com.bhattaraiankit.auth_service.Services.UserServiceClient;
import np.com.bhattaraiankit.auth_service.Utils.JwtUtils;
@Service
public class UserServiceImpl implements UserService {

    @Lazy
    @Autowired 
    private  AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtil;
    private final UserServiceClient userServiceClient;
    private final UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;
    private final BloomFilterService bloomFilterService;
    
    private final BloomFilter<String> bloomFilter;


    //----UserService implementations----------------------------///////////////
    public UserServiceImpl(
            UserRepo userRepo,
            JwtUtils jwtUtils,
            UserServiceClient userServiceClient,
            PasswordEncoder passwordEncoder,
            BloomFilterService bloomFilterService
            ){
        this.jwtUtil=jwtUtils;// jwt utilities to generate and validate token
        this.userServiceClient=userServiceClient; //  webclient to communicate with userService.
        this.userRepo=userRepo;//repository for the model User
        this.passwordEncoder=passwordEncoder;// encoder to encode the password
        this.bloomFilterService=bloomFilterService;//

        this.bloomFilter=new BloomFilter<>(100000, 3,
                    String::hashCode,
                    s->s.hashCode()*17,
                    s->s.hashCode()*31
                );
        bloomFilter.setBitSet(bloomFilterService.loadBitSet());
            }

    @Override
    public JWTResponse generateToken(LoginRequest user) {

        //System.out.println(user);
        Authentication a = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.email_or_username(),user.password()));
                System.out.println(user.email_or_username());
            
                if(a.isAuthenticated()) {
                    
                    SecurityContextHolder.getContext().setAuthentication(a); 
                    JWTResponse res = new JWTResponse(jwtUtil.generateToken(user.email_or_username()),
                            user.email_or_username(),
                            List.of("Ankit"));     
                
                    return res;
            }
            throw new RuntimeException("Invalid credentials");
    }

    //registers a new user to the system.. 
    @Override
    public JWTResponse signUpUser(SignUpRequest request) {
       //TODO: whether the email is verified or not;;;; 
        RegistrationUserDTO registeredUser = (userServiceClient.
                getUserByEmail(request.email())).orElseThrow(()-> new UsernameNotFoundException("The user is not registered"));
            if(!registeredUser.isVerified()) throw new RuntimeException("The user is not verified please verify the");
        //System.out.println(registeredUser.email() + registeredUser.isVerified());

        User u = new User();
        u.setEmail(registeredUser.email());
        u.setPassword(passwordEncoder.encode(request.password()));
        u.setUserName(request.email()); 
        u.setAuthorities(new HashSet<>());
        bloomFilter.add(registeredUser.email());
        bloomFilterService.setBitSet(bloomFilter.getBitSet());
        userRepo.save(u);

        return generateToken(new LoginRequest(registeredUser.email(), request.password()));
    }

    @Override
    public void validateToken(String token) {
       jwtUtil.validateToken(token); 
    }

    public String  isUserExist(String email){

        //if(bloomFilter.mightContains(email))
            if(userRepo.findByEmail(email).isPresent())
                return email;
        
        throw new UsernameNotFoundException("The user is not registered");
    }
}
