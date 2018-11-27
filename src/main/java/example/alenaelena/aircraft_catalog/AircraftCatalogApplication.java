package example.alenaelena.aircraft_catalog;

import example.alenaelena.aircraft_catalog.model.Aircraft;
import example.alenaelena.aircraft_catalog.repository.AircraftRepository;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.stream.Stream;

@SpringBootApplication
public class AircraftCatalogApplication {

    public static void main(String[] args) {
        SpringApplication.run(AircraftCatalogApplication.class, args);
    }

    @Bean
    ApplicationRunner init(AircraftRepository repository) {
        return args -> {
            Stream.of("Pobeda", "KLM", "AirFrance", "Aeroflot").forEach(number -> {
                Aircraft aircraft = new Aircraft();
                aircraft.setNumber(number);
                repository.save(aircraft);
            });
            repository.findAll().forEach(System.out::println);
        };
    }
}
