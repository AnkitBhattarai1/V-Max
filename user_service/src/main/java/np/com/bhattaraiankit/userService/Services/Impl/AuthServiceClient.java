package np.com.bhattaraiankit.userService.Services.Impl;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;

@Component
public class AuthServiceClient {

    private final WebClient.Builder builder; 

    AuthServiceClient(@Qualifier("authServiceWebClient") WebClient.Builder builder){
        this.builder=builder;
    }

    public Optional<String> isUserExist(String email){ 
        return Optional.ofNullable(builder.build().get().uri("/isUserExist?email="+email)
            .retrieve()
            .bodyToMono(String.class)
            .block());

    }
    
}
