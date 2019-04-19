package ul.stage.officeassignment;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;


@SpringBootApplication
@EnableJpaAuditing
public class OfficeAssignmentApplication {

	public static void main(String[] args) {
		SpringApplication.run(OfficeAssignmentApplication.class, args);
	}

}
