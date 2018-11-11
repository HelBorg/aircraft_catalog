package example.alenaelena.aircraft_catalog.dao;

import example.alenaelena.aircraft_catalog.model.Aircraft;

import java.util.List;

public interface AircraftDao {
    public void addAircr(Aircraft aircraft);

    public void updateAircr(Aircraft aircraft);

    public void removeAircr(int id);

    public Aircraft getAircr(int id);

    public List<Aircraft> listAircr();
}
