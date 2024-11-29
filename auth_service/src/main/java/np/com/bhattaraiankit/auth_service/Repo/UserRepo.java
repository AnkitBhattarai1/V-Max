package np.com.bhattaraiankit.auth_service.Repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import np.com.bhattaraiankit.auth_service.Models.User;

@Repository
public interface UserRepo extends JpaRepository<User,String>{

    @Query("Select u from User u where u.email = :email")
    public Optional<User> findByEmail(@Param("email")String email);

    @Query("Select u from User u where u.userName= :input OR u.email= :input")
    public Optional<User> findByEmailorUsername(@Param("input") String input);
}
