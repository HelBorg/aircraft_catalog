package example.alenaelena.aircraft_catalog.controller;

import example.alenaelena.aircraft_catalog.model.Aircraft;
import example.alenaelena.aircraft_catalog.repository.AircraftRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.*;

@RestController
@RequestMapping("/api/aircraft")
public class AircraftController {

    protected static final Logger logger = LoggerFactory.getLogger(AircraftController.class);

    private AircraftRepository aircraftRepository;

    public AircraftController(AircraftRepository aircraftRepository) {
        this.aircraftRepository = aircraftRepository;
    }

    @GetMapping
    public Collection<Aircraft> aircrafts() {
        return aircraftRepository.findAll();
    }

    @GetMapping
    public Collection<Aircraft> sortedList(@RequestParam("info") String info,
                                           @RequestParam("sort") String sort) {
        if (sort == "0") {
            return null;
        }
        logger.info("Request to sort list of aircrafts");
        List<Aircraft> aircrafts = aircraftRepository.findAll();
        Collections.sort(aircrafts, new Comparator<Aircraft>() {
            @Override
            public int compare(Aircraft o1, Aircraft o2) {
                return o1.getNumber().compareTo(o2.getNumber());
            }
        });
        aircraftRepository.saveAll(aircrafts);
        return aircraftRepository.findAll();
    }

    @GetMapping("/{id}")
    public Aircraft getAircraft(@PathVariable Long id) {
        Aircraft aircraft = aircraftRepository.findFirstById(id);
        return aircraft;
    }

    @PostMapping("/edit/new")
    public ResponseEntity<Aircraft> createAircraft(@Valid @RequestBody Aircraft aircraft) throws URISyntaxException {
        logger.info("Request to create aircraft: {}", aircraft);
        Aircraft result = aircraftRepository.save(aircraft);
        return ResponseEntity.created(new URI("/api/aircraft" + result.getId()))
                .body(result);
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<Aircraft> updateAircraft( @Valid @RequestBody Aircraft aircraft) {
        logger.info("request to update aircraft: {}", aircraft);
        Aircraft result = aircraftRepository.save(aircraft);
        return ResponseEntity.ok().body(result);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteAircraft(@PathVariable Long id) {
        logger.info("request to delete aircraft: {}", id);
        aircraftRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
