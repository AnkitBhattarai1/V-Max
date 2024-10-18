package np.com.bhattaraiankit.auth_service.Services;

import java.util.Optional;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import np.com.bhattaraiankit.auth_service.Models.User;
import np.com.bhattaraiankit.auth_service.Repo.UserRepo;
import np.com.bhattaraiankit.auth_service.Security.SecurityUser;
/**
 * SecurityUserService
 */
@Service
public class SecurityUserService implements UserDetailsService,UserService
{

    private final UserRepo userRepo;

    private final PasswordEncoder passEncoder;

    public SecurityUserService(UserRepo userRepo, PasswordEncoder passEncoder){
        this.userRepo=userRepo;
        this.passEncoder=passEncoder;
    }

    

    @Override
    public String saveUser(User u) {
        u.setPassword(passEncoder.encode(u.getPassword()));
        u.setId("hell"); 
        userRepo.save(u);
        return "User saved to the system";
    }


    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException { 
        Optional<User> optionalUser = userRepo.findByEmail(email);

         return optionalUser
             .map(SecurityUser::new)
             .orElseThrow(()-> new UsernameNotFoundException("Email not Found:" + email));
    }



    @Override
    public String generatToken(User u) {
        // TODO Auto-generated method stub
        return null;
    }



    @Override
    public void validateToken(String token) {
        // TODO Auto-generated method stub
        
    }
    
}
