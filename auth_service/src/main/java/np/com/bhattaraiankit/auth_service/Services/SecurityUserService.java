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
public class SecurityUserService implements UserDetailsService
{


    private final UserRepo userRepo;

    private final PasswordEncoder passEncoder;

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

}
