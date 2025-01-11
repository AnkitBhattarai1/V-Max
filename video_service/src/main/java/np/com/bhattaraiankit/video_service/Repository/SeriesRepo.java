
package np.com.bhattaraiankit.video_service.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import np.com.bhattaraiankit.video_service.Models.Series;

@Repository
public interface SeriesRepo extends JpaRepository<Series, String> {
    Optional<Series> findByTitle(String title);
}
