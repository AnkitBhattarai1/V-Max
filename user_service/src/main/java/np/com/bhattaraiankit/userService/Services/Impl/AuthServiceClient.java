package np.com.bhattaraiankit.userService.Services.Impl;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;

@Component
public class AuthServiceClient {

    private final WebClient.Builder builder; 

    AuthServiceClient(@Qualifier("authServiceWebClient") WebClient.Builder builder){
        this.builder=builder;
    }

    public boolean checkIfExist(String email){
        return false;
    }
    
}
