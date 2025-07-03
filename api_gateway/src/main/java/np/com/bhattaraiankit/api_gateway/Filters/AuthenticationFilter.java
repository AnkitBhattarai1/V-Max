package np.com.bhattaraiankit.api_gateway.Filters;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Component;

import np.com.bhattaraiankit.api_gateway.Utils.JwtUtils;

@Component
public class AuthenticationFilter extends AbstractGatewayFilterFactory<AuthenticationFilter.Config> {

  public AuthenticationFilter() {
    super(Config.class);
  }

  @Autowired
  private JwtUtils jwtUtils;

  @Autowired
  RouteValidator routeValidator;

  public static class Config {

  }

  @Override
  public GatewayFilter apply(Config config) {
    // ServerWebExchane and GatewayFilterChain ....
    return ((exchange, chain) -> {

      if (routeValidator.isSecured.test(exchange.getRequest())) {

        if (!(exchange.getRequest().getHeaders().containsKey(HttpHeaders.AUTHORIZATION))) {
          ServerHttpResponse res = exchange.getResponse();
          res.setStatusCode(HttpStatus.UNAUTHORIZED);
          return res.setComplete();
        }
        String auth;
        List<String> headers = exchange.getRequest().getHeaders().get(HttpHeaders.AUTHORIZATION);

        if (headers == null) {
          ServerHttpResponse res = exchange.getResponse();
          res.setStatusCode(HttpStatus.UNAUTHORIZED);
          return res.setComplete();
        }
        auth = headers.get(0);

        if (auth != null && auth.startsWith("Bearer "))
          auth = auth.substring(7);

        jwtUtils.validateToken(auth);

      }

      return chain.filter(exchange);
    });
  }
}
