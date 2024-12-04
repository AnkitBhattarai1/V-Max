package np.com.bhattaraiankit.userService.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import np.com.bhattaraiankit.userService.Models.RegistrationUser;

/**
 * RegistrationUserRepo
 */
@Repository
public interface RegistrationUserRepo extends JpaRepository<RegistrationUser,String> {

    @Query("Select u from RegistrationUser u where u.email = :email ")
    Optional<RegistrationUser> findByEmail(@Param("email") String email);
    
}
