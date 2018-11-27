package example.alenaelena.aircraft_catalog.repository;

import example.alenaelena.aircraft_catalog.model.Manufacturer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ManufacturerRepository extends JpaRepository<Manufacturer, Long> {
    public Manufacturer findByName(String name);
}
