package np.com.bhattaraiankit.auth_service.Security;

import org.springframework.security.core.GrantedAuthority;

import np.com.bhattaraiankit.auth_service.Models.Authority;

/**
 * SecurityAuthority
 */
public class SecurityAuthority implements GrantedAuthority{

    private Authority authority;

    public SecurityAuthority(Authority auth){
        this.authority = auth;
    }
    @Override
    public String getAuthority() {
        return authority.getName();

    }
}
