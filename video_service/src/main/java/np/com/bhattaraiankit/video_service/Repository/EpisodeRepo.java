

package np.com.bhattaraiankit.video_service.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import np.com.bhattaraiankit.video_service.Models.Episode;
@Repository
public interface EpisodeRepo extends JpaRepository<Episode, String> {
    List<Episode> findBySeasonId(String seasonId); // Find episodes by season ID
}
