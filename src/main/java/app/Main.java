package app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan("app")
public class Main {
    //todo weather suggestion after order
    public static void main(String[] args) {
        SpringApplication.run(Main.class, args);
    }
}
