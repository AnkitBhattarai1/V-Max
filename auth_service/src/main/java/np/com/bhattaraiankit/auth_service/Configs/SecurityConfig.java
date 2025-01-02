package np.com.bhattaraiankit.auth_service.Configs;


import jakarta.ws.rs.HttpMethod;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import np.com.bhattaraiankit.auth_service.Repo.UserRepo;
import np.com.bhattaraiankit.auth_service.Services.SecurityUserService;

/**
 * SecurityConfig
 */
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final UserRepo userRepo;

    SecurityConfig(UserRepo userRepo){
        this.userRepo=userRepo;
    }

    @Bean 
    PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }
/*

@Bean
public CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration configuration = new CorsConfiguration();
   
    
    configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000", "http://localhost:9090")); // Frontend origin
    configuration.setAllowedMethods(Arrays.asList("GET", "POST", "OPTIONS", "PUT", "DELETE"));
    configuration.setAllowedHeaders(Arrays.asList("*"));  // Allow all headers for testing

    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", configuration);  // Apply to all routes
    
    return source;
}

*/
@Bean
public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {

    httpSecurity/*.cors(Customizer.withDefaults())*/
        .csrf(c->c.disable())
        .authorizeHttpRequests(auth->{
            auth.requestMatchers(HttpMethod.OPTIONS).permitAll()
                .requestMatchers(HttpMethod.POST, "/auth/register", "/auth/getToken","/auth/test2").permitAll()
                .requestMatchers(HttpMethod.GET, "/auth/getUser", "/auth/isUserExist","/auth/test").permitAll()
                .anyRequest().authenticated();
        });

    return httpSecurity.build();
}
    @Bean 
    UserDetailsService userDetailsService(){
        return new SecurityUserService(userRepo, passwordEncoder());
    }

    @Bean 
    AuthenticationProvider authenticationProvider(){
        DaoAuthenticationProvider dao = new DaoAuthenticationProvider();
        dao.setUserDetailsService(userDetailsService());
        dao.setPasswordEncoder(passwordEncoder());
        return dao; 
    }

    @Bean 
     AuthenticationManager authenticationManger(AuthenticationConfiguration configuration) throws Exception
    {
        return configuration.getAuthenticationManager();
    }
}
