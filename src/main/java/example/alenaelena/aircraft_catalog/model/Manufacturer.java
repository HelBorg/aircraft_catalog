package example.alenaelena.aircraft_catalog.model;

import javax.persistence.*;

@Entity
public class Manufacturer {
    @Id
    @Column(name = "ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "NAME")
    private String name;

    @Column(name = "COUNTRY")
    private String country;

    public Manufacturer() {
        super();
    }

    public Manufacturer(String name, String country) {
        super();
        this.name = name;
        this.country = country;
    }

    public int getId() {
        return id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getCountry() {
        return country;
    }
}
