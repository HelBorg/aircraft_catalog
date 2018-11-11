package example.alenaelena.aircraft_catalog.service;

import example.alenaelena.aircraft_catalog.model.Manufacturer;

import java.util.List;

public interface ManufacturerService {
    public void addManuf(Manufacturer manufacturer);

    public void updateManuf(Manufacturer manufacturer);

    public void removeManuf(int id);

    public Manufacturer getManuf(int id);

    public List<Manufacturer> listManuf();
}
