package example.alenaelena.aircraft_catalog.dao;

import example.alenaelena.aircraft_catalog.model.Aircraft;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class AircraftDaoImpl implements AircraftDao {

    private static final Logger logger = LoggerFactory.getLogger(AircraftDaoImpl.class);

    private SessionFactory sessionFactory;

    public void setSessionFactory(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }

    @Override
    public void addAircr(Aircraft aircraft) {
        Session session = this.sessionFactory.getCurrentSession();
        session.persist(aircraft);
        logger.info(" Aircraft is successfully created.\n Aircraft details: " + aircraft);
    }

    @Override
    public void updateAircr(Aircraft aircraft) {
        Session session = this.sessionFactory.getCurrentSession();
        session.update(aircraft);
        logger.info(" Aircraft is successfully updated.\n Aircraft details: " + aircraft);
    }

    @Override
    public void removeAircr(int id) {
        Session session = this.sessionFactory.getCurrentSession();
        Aircraft aircraft = (Aircraft) session.load(Aircraft.class, new Integer(id));

        if (aircraft != null) {
            session.delete(aircraft);
        }
        logger.info(" Aircraft is successfully removed.\n Aircraft details: " + aircraft);
    }

    @Override
    public Aircraft getAircr(int id) {
        Session session = this.sessionFactory.getCurrentSession();
        Aircraft aircraft = (Aircraft) session.load(Aircraft.class, new Integer(id));
        logger.info(" Aircraft is successfully loaded.\n Aircraft details: " + aircraft);
        return aircraft;
    }

    @Override
    @SuppressWarnings("unchecked")
    public List<Aircraft> listAircr() {
        Session session = this.sessionFactory.getCurrentSession();
        List<Aircraft> aircrList = session.createQuery("FROM Aircraft").list();
        for(Aircraft aircraft : aircrList) {
            logger.info(" Aircraft list: " + aircraft);
        }
        return aircrList;
    }
}
