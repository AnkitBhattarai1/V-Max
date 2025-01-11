package np.com.bhattaraiankit.video_service.Repository;




import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import np.com.bhattaraiankit.video_service.Models.Season;

@Repository
public interface SeasonRepo extends JpaRepository<Season, String> {
    Optional<Season> findBySeasonNumberAndSeriesId(int seasonNumber, String seriesId);
}
