package np.com.bhattaraiankit.auth_service.Services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import np.com.bhattaraiankit.auth_service.DTO.JWTResponse;
import np.com.bhattaraiankit.auth_service.DTO.LoginRequest;
import np.com.bhattaraiankit.auth_service.DTO.RegistrationUserDTO;
import np.com.bhattaraiankit.auth_service.DTO.SignUpRequest;
import np.com.bhattaraiankit.auth_service.Models.User;
import np.com.bhattaraiankit.auth_service.Repo.UserRepo;
import np.com.bhattaraiankit.auth_service.Security.SecurityUser;
import np.com.bhattaraiankit.auth_service.Utils.JwtUtils;
/**
 * SecurityUserService
 */
@Service
public class SecurityUserService implements UserDetailsService,UserService
{


    private final UserRepo userRepo;

    private final PasswordEncoder passEncoder;


    @Autowired
    private UserServiceClient userServiceClient;

    @Autowired
    private  JwtUtils jwtUtil;

    @Lazy
    @Autowired
   private AuthenticationManager authenticationManager;

    public SecurityUserService(
            UserRepo userRepo,
            PasswordEncoder passEncoder)
    {
        this.userRepo=userRepo;
        this.passEncoder=passEncoder;
    }

    

//-----------------UserDetailsService implementations-----------------/////

    @Override
    public UserDetails loadUserByUsername(String username_or_email) throws UsernameNotFoundException {

        Optional<User> optional = userRepo.findByEmailorUsername(username_or_email); 
        
        return optional
            .map(SecurityUser::new)
            .orElseThrow(()-> new UsernameNotFoundException("The user is not registered"));
    }
//----UserService implementations----------------------------///////////////


    @Override
    public JWTResponse generateToken(LoginRequest user) {
            Authentication a = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.email_or_username(),user.password()));
                System.out.println(user.email_or_username());
            if(a.isAuthenticated()) {
                JWTResponse res = new JWTResponse(jwtUtil.generateToken(user.email_or_username()), user.email_or_username(), List.of("Ankit"));     
                return res;
            }
            throw new RuntimeException("Invalid credentials");
    }

    //registers a new user to the system.. 
    @Override
    public String signUpUser(SignUpRequest request) {
       //TODO: whether the email is verified or not;;;;            
        RegistrationUserDTO registeredUser = (userServiceClient.getUserByEmail(request.email())).orElseThrow(()-> new UsernameNotFoundException("The user is not registered"));
            if(!registeredUser.isVerified()) throw new RuntimeException("The user is not verified please verify the");
        System.out.println(registeredUser.email() + registeredUser.isVerified());

        User u = new User();
        u.setEmail(request.email());
        u.setPassword(passEncoder.encode(request.password()));
        u.setUserName(request.email()); 
        u.setAuthorities(null);
        userRepo.save(u);
        System.out.println(u.getEmail());
        return null;
    }

    @Override
    public void validateToken(String token) {
       jwtUtil.validateToken(token); 
    }
}
