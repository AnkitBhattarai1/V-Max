package np.com.bhattaraiankit.auth_service.Services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;

import np.com.bhattaraiankit.auth_service.DTO.RegistrationUserDTO;

@Component
public class UserServiceClient {

    @Autowired
  private WebClient.Builder userServiceWebClient;

 
   public Optional<RegistrationUserDTO> getUserByEmail(String email){
       String uri = "/user/getUser";

       return Optional.ofNullable(userServiceWebClient.build().get().uri(uri+"?email="+email)
           .retrieve()
           .bodyToMono(RegistrationUserDTO.class)           
           .block());
           
   }
}
