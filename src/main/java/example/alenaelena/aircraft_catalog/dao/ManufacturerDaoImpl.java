package example.alenaelena.aircraft_catalog.dao;

import example.alenaelena.aircraft_catalog.model.Manufacturer;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

public class ManufacturerDaoImpl implements ManufacturerDao {

    private static final Logger logger = LoggerFactory.getLogger();

    private SessionFactory sessionFactory;

    public void setSessionFactory(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }

    @Override
    public void addManuf(Manufacturer manufacturer) {
        Session session = this.sessionFactory.getCurrentSession();
        session.persist(manufacturer);
        logger.info(" Manufacturer is successfully created.\n Manufacturer details: " + manufacturer);
    }

    @Override
    public void updateManuf(Manufacturer manufacturer) {
        Session session = this.sessionFactory.getCurrentSession();
        session.update(manufacturer);
        logger.info(" Manufacturer is successfully updated.\n Manufacturer details: " + manufacturer);
    }

    @Override
    public void removeManuf(int id) {
        Session session = this.sessionFactory.getCurrentSession();
        Manufacturer manufacturer = (Manufacturer) session.load(Manufacturer.class, new Integer(id));

        if (manufacturer != null) {
            session.delete(manufacturer);
        }
        logger.info(" Manufacturer is successfully removed.\n Manufacturer details: " + manufacturer);
    }

    @Override
    public Manufacturer getManuf(int id) {
        Session session = this.sessionFactory.getCurrentSession();
        Manufacturer manufacturer = (Manufacturer) session.load(Manufacturer.class, new Integer(id));
        logger.info(" Manufacturer is successfully loaded.\n Manufacturer details: " + manufacturer);
        return manufacturer;
    }

    @Override
    public List<Manufacturer> listManuf() {
        Session session = this.sessionFactory.getCurrentSession();
        List<Manufacturer> manufList = session.createQuery("FROM Manufacturer").list();
        for(Manufacturer manufacturer : manufList) {
            logger.info(" Manufacturer list: " + manufacturer);
        }
        return manufList;
    }
}
