package example.alenaelena.aircraft_catalog.repository;

import example.alenaelena.aircraft_catalog.model.Aircraft;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AircraftRepository extends PagingAndSortingRepository<Aircraft, Long> {
    Aircraft findFirstById(long id);

    void deleteAircraftsByManufacturer_Id(long id);

    @Override
    List<Aircraft> findAll();
}
