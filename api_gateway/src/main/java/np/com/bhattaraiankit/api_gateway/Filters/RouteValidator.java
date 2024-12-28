package np.com.bhattaraiankit.api_gateway.Filters;

import java.util.List;
import java.util.function.Predicate;

import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;

@Component
public class RouteValidator {

   
    public static final List<String> openEndpoints = List.of (
    
            "/auth/register",
            "/auth/getToken",
            "/eureka"
            );

    public Predicate<ServerHttpRequest> isSecured = (request)->(openEndpoints
            .stream()
            .noneMatch(uri -> request.getURI().getPath().contains(uri)));
}
