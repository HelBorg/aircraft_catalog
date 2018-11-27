package example.alenaelena.aircraft_catalog.controller;

import example.alenaelena.aircraft_catalog.model.Aircraft;
import example.alenaelena.aircraft_catalog.repository.AircraftRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.Collection;
import java.util.Optional;

@RestController
@RequestMapping("/api") //aircrafts
public class AircraftController {

    protected static final Logger logger = LoggerFactory.getLogger(AircraftController.class);

    private AircraftRepository aircraftRepository;

    public AircraftController(AircraftRepository aircraftRepository) {
        this.aircraftRepository = aircraftRepository;
    }

    @GetMapping("/aircrafts")
    Collection<Aircraft> aircrafts( ) {
        return aircraftRepository.findAll();
    }

    @GetMapping("/aircraft/{id}")
    ResponseEntity<?> getAircraft(@PathVariable Long id) {
        Optional<Aircraft> aircraft = aircraftRepository.findById(id);
        return aircraft.map(response -> ResponseEntity.ok().body(response))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/aircraft")
    ResponseEntity<Aircraft> createAircraft(@Valid @RequestBody Aircraft aircraft) throws URISyntaxException {
        logger.info("Request to create aircraft: {}", aircraft);
        Aircraft result = aircraftRepository.save(aircraft);
        return ResponseEntity.created(new URI("/main/record/aircraft" + result.getId()))
                .body(result);
    }

    @PutMapping("/aircraft/{id}")
    ResponseEntity<Aircraft> updateAircraft(@PathVariable Long id, @Valid @RequestBody Aircraft aircraft) {
        aircraft.setId(id);
        logger.info("request to update aircraft: {}", aircraft);
        Aircraft result = aircraftRepository.save(aircraft);
        return ResponseEntity.ok().body(result); //Aircraft
    }

    @DeleteMapping("/aircraft/{id}")
    public ResponseEntity<?> deleteAircraft(@PathVariable Long id) {
        logger.info("request to delete aircraft: {}", id);
        aircraftRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
