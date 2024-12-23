package np.com.bhattaraiankit.auth_service.Configs;

import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class WebClientConfig {

    @Bean
    @LoadBalanced
    WebClient.Builder webClient(){
         /*HttpClient httpClient = HttpClient.create()
                .resolver(NoopAddressResolverGroup.INSTANCE); // Disable DNS resolution

        return WebClient.builder()
            .baseUrl("lb://USER-SERVICE")
                .clientConnector(new reactor.netty.http.client.HttpClientConnector(httpClient))
                .build();
    
    */
    return WebClient.builder().baseUrl("http://USER-SERVICE");
    }

}
