package np.com.bhattaraiankit.auth_service.Repo;

import org.springframework.data.jpa.repository.JpaRepository;

import np.com.bhattaraiankit.auth_service.Models.Authority;
public interface AuthorityRepo extends JpaRepository<Authority,String> {
    
}
