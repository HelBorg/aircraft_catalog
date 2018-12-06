package example.alenaelena.aircraft_catalog.repository;

import example.alenaelena.aircraft_catalog.model.Aircraft;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AircraftRepository extends PagingAndSortingRepository<Aircraft, Long> {
    Aircraft findFirstById(long id);

    boolean deleteAircraftsByManufacturer_Id(long Manufacturer_Id);

    @Override
    List<Aircraft> findAll();
}
