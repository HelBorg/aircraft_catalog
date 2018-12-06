package example.alenaelena.aircraft_catalog.controller;

import example.alenaelena.aircraft_catalog.model.Manufacturer;
import example.alenaelena.aircraft_catalog.repository.AircraftRepository;
import example.alenaelena.aircraft_catalog.repository.ManufacturerRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.Collection;

@RestController
@RequestMapping("/api/manufacturer")
public class    ManufacturerController {
    private static final Logger logger = LoggerFactory.getLogger(ManufacturerController.class);

    private ManufacturerRepository manufacturerRepository;
    private AircraftRepository aircraftRepository;

    public ManufacturerController(ManufacturerRepository manufacturerRepository, AircraftRepository aircraftRepository) {
        this.manufacturerRepository = manufacturerRepository;
        this.aircraftRepository = aircraftRepository;
    }

    @GetMapping
    public Collection<Manufacturer> manufacturers() {
        return manufacturerRepository.findAll();
    }

    @GetMapping("/{id}")
    public Manufacturer getManufacturer(@PathVariable Long id) {
        return manufacturerRepository.findFirstById(id);
    }

    @PostMapping("/edit/new")
    public ResponseEntity<Manufacturer> createManufacturer(@Valid @RequestBody Manufacturer manufacturer) throws URISyntaxException {
        logger.info("request to create manufacturer: {}", manufacturer);
        Manufacturer result = manufacturerRepository.save(manufacturer);
        return ResponseEntity.created(new URI("/api/manufacturer" + result.getId()))
                .body(result);
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<Manufacturer> updateManufacturer(@Valid @RequestBody Manufacturer manufacturer) {
        logger.info("request to update manufacturer: {}", manufacturer);
        Manufacturer result = manufacturerRepository.save(manufacturer);
        return ResponseEntity.ok().body(result);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteManufacturer(@PathVariable Long id) {
        logger.info("request to delete manufacturer: {}", id);
        aircraftRepository.deleteAircraftsByManufacturer_Id(id);
        manufacturerRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
