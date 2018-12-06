package example.alenaelena.aircraft_catalog.repository;

import example.alenaelena.aircraft_catalog.model.Manufacturer;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

public interface ManufacturerRepository extends PagingAndSortingRepository<Manufacturer, Long> {
    Manufacturer findFirstById(long id);

    @Override
    List<Manufacturer> findAll();
}
