package example.alenaelena.aircraft_catalog.service;

import example.alenaelena.aircraft_catalog.dao.AircraftDao;
import example.alenaelena.aircraft_catalog.model.Aircraft;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class AircraftServiceImpl implements AircraftService{

    private AircraftDao aircrDao;

    public void setAircrDao(AircraftDao aircrDao) {
        this.aircrDao = aircrDao;
    }

    @Override
    @Transactional
    public void addAircr(Aircraft aircraft) {
        this.aircrDao.addAircr(aircraft);
    }

    @Override
    @Transactional
    public void updateAircr(Aircraft aircraft) {
        this.aircrDao.updateAircr(aircraft);
    }

    @Override
    @Transactional
    public void removeAircr(int id) {
        this.aircrDao.removeAircr(id);
    }

    @Override
    @Transactional
    public Aircraft getAircr(int id) {
        return this.aircrDao.getAircr(id);
    }

    @Override
    @Transactional
    public List<Aircraft> listAircr() {
        return this.aircrDao.listAircr();
    }
}
