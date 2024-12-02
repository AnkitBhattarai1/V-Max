package np.com.bhattaraiankit.v_max.service_reg;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;

@EnableEurekaServer
@SpringBootApplication
public class ServiceRegApplication {

	public static void main(String[] args) {
		SpringApplication.run(ServiceRegApplication.class, args);
	}

}
