package example.alenaelena.aircraft_catalog.model;

import lombok.*;

import javax.persistence.*;

@ToString
@EqualsAndHashCode
@Entity
public class Manufacturer {
    @Id
//    @Column(name = "ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

//    @Column(name = "NAME")
//    @NotNull
    private String name;

//    @Column(name = "COUNTRY")
//    @NotNull
    private String country;

    public Manufacturer() {
        super();
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
