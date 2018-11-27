package example.alenaelena.aircraft_catalog.repository;

import example.alenaelena.aircraft_catalog.model.Aircraft;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AircraftRepository extends JpaRepository<Aircraft, Long> {
    Aircraft findById(String number);
}
