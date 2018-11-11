package example.alenaelena.aircraft_catalog.service;

import example.alenaelena.aircraft_catalog.dao.ManufacturerDao;
import example.alenaelena.aircraft_catalog.model.Manufacturer;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public class ManufacturerServiceImpl implements ManufacturerService {

    private ManufacturerDao manufDao;

    public void setManufDao(ManufacturerDao manufDao) {
        this.manufDao = manufDao;
    }

    @Override
    @Transactional
    public void addManuf(Manufacturer manufacturer) {
        this.manufDao.addManuf(manufacturer);
    }

    @Override
    @Transactional
    public void updateManuf(Manufacturer manufacturer) {
        this.manufDao.updateManuf(manufacturer);
    }

    @Override
    @Transactional
    public void removeManuf(int id) {
        this.manufDao.removeManuf(id);
    }

    @Override
    @Transactional
    public Manufacturer getManuf(int id) {
        return this.manufDao.getManuf(id);
    }

    @Override
    @Transactional
    public List<Manufacturer> listManuf() {
        return this.manufDao.listManuf();
    }
}
