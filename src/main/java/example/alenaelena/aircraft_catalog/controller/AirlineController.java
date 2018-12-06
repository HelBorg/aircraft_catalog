package example.alenaelena.aircraft_catalog.controller;

import example.alenaelena.aircraft_catalog.model.Airline;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/airline")
public class AirlineController {
    @GetMapping
    public Airline[] getAirline() {
        return Airline.values();
    }
}
