
package np.com.bhattaraiankit.video_service.Services.Impl;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.stereotype.Service;

import np.com.bhattaraiankit.video_service.Constants.Constants;
import np.com.bhattaraiankit.video_service.Services.TranscodingService;

@Service
public class TranscodingServiceImpl implements TranscodingService {


@Override
public void transcodeToHLSAndDASH(String videoId) {

    String rootStorageLocation = Constants.getVideoLocation() + videoId + "/";
    Path hlsStorage = Paths.get(rootStorageLocation, "hls").toAbsolutePath().normalize();
    Path dashStorage = Paths.get(rootStorageLocation, "dsh").toAbsolutePath().normalize();
    Path inputVideo = Paths.get(rootStorageLocation, videoId + ".mp4").toAbsolutePath();

    try {
        // Create directories if not exist
        if (Files.exists(hlsStorage) && !Files.isDirectory(hlsStorage)) {
            Files.delete(hlsStorage); // handle edge case
        }
        if (Files.exists(dashStorage) && !Files.isDirectory(dashStorage)) {
            Files.delete(dashStorage);
        }

        Files.createDirectories(hlsStorage);
        Files.createDirectories(dashStorage);

        // HLS command
        String[] hlsCmd = {
            "ffmpeg", "-i", inputVideo.toString(),
            "-profile:v", "baseline", "-level", "3.0", "-start_number", "0",
            "-hls_time", "4", "-hls_list_size", "0",
            "-f", "hls",
            hlsStorage.resolve("playlist.m3u8").toString()
        };

        // DASH command
        String[] dashCmd = {
            "ffmpeg", "-i", inputVideo.toString(),
            "-map", "0", "-f", "dash",
            dashStorage.resolve("manifest.mpd").toString()
        };

        runFFmpeg(hlsCmd);
        runFFmpeg(dashCmd);

    } catch (Exception e) {
        throw new RuntimeException("Transcoding failed: " + e.getMessage(), e);
    }
}

    private void runFFmpeg(String[] command) {
        try {
            Process process = new ProcessBuilder(command)
                .redirectErrorStream(true)
                .inheritIO()
                .start();
            process.waitFor();
        } catch (IOException | InterruptedException e) {
            throw new RuntimeException("FFmpeg failed", e);
        }
    }
}
