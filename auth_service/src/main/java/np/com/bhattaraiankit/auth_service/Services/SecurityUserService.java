package np.com.bhattaraiankit.auth_service.Services;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import np.com.bhattaraiankit.auth_service.DTO.JWTResponse;
import np.com.bhattaraiankit.auth_service.DTO.LoginRequest;
import np.com.bhattaraiankit.auth_service.DTO.SignUpRequest;
import np.com.bhattaraiankit.auth_service.Models.Authority;
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
    private  JwtUtils jwtUtil;

    @Autowired
    private AuthenticationManager  authenticationManager;
    
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
    public String generateToken(LoginRequest user) {
        // TODO Auto-generated method stub
        return null;
    }



    @Override
    public JWTResponse signUpUser(SignUpRequest request) {
       //TODO: whether the email is verified or not;;;;
       //
        User u = new User();
        u.setEmail(request.email());
        u.setPassword(passEncoder.encode(request.password()));
        u.setUserName(request.email()); 
        Set<Authority> authority  =  new HashSet<>();
        u.setAuthorities(authority);
        userRepo.save(u);
        return null;
    }

    @Override
    public void validateToken(String token) {
       jwtUtil.validateToken(token); 
    }
}
