package np.com.bhattaraiankit.userService.Configs;

import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class WebClientConfig {

    @LoadBalanced
    @Bean(name = "authServiceWebClient")
    WebClient.Builder authServiceWebClient(){
        return WebClient.builder().baseUrl("http://AUTH-SERVICE/auth");
    }
}
