package example.alenaelena.aircraft_catalog.service;

import example.alenaelena.aircraft_catalog.model.Aircraft;

import java.util.List;

public interface AircraftService {
    public void addAircr(Aircraft aircraft);

    public void updateAircr(Aircraft aircraft);

    public void removeAircr(int id);

    public Aircraft getAircr(int id);

    public List<Aircraft> listAircr();
}
