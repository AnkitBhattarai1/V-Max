package np.com.bhattaraiankit.auth_service.Utils;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import jakarta.annotation.PostConstruct;

import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
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

    public void validateToken(final String token) {
        Jwts.parserBuilder().setSigningKey(getSignKey()).build().parseClaimsJws(token);

    }

    public String generateToken(String userName) {
        Map<String, Object> claims = new HashMap<>();
        return createToken(claims, userName);
    }

    private String createToken(Map<String, Object> claims, String userName) {
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(userName)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10))
                .signWith(getSignKey(), SignatureAlgorithm.HS256).compact();

    }

}
