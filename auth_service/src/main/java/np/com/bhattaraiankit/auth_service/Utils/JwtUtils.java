package np.com.bhattaraiankit.auth_service.Utils;

import java.security.Key;

import jakarta.annotation.PostConstruct;

import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

/**
 * JwtUtils
 */
@Component
public class JwtUtils {

   private Environment env;

    JwtUtils(Environment env){
        this.env=env;
    }

    String secret;

    @PostConstruct
    public void init(){
        this.secret = env.getProperty("secret");

    }

    public Key getSignKey(){
        byte[] keybytes = Decoders.BASE64.decode(secret);
        return Keys.hmacShaKeyFor(keybytes);
    }

}
