package np.com.bhattaraiankit.userService.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import np.com.bhattaraiankit.userService.Models.User;
/**
 * UserRepo
 */ 
@Repository
public interface UserRepo extends JpaRepository<User,String>{

    Optional<User> findByEmail(String email);
    
}
