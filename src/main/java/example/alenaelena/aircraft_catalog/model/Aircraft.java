package example.alenaelena.aircraft_catalog.model;

import lombok.*;

import javax.persistence.*;

@ToString @EqualsAndHashCode
@Entity
@Table(name = "AircraftManager")
public class Aircraft {
    @Id
//    @Column(name = "ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

//    @Column(name = "NUMBER")
    @NonNull
    private String number;

//    @Column(name = "MODEL")
//    @NonNull
    private  String model;

//    @Column(name = "YEAR")
//    @NonNull
    private int year;

//    @Column(name = "CAPACITY")
//    @NonNull
    private int capacity;

//    @Column(name = "Manufacturer_ID")
    @ManyToOne(cascade=CascadeType.PERSIST)
//    @NonNull
    private Manufacturer manufacturer;

    public Aircraft() {
        super();
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getId() {
        return id;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public String getNumber() {
        return number;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public String getModel() {
        return model;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public int getYear() {
        return year;
    }

    public void setCapacity(int capacity) {
        this.capacity = capacity;
    }

    public int getCapacity() {
        return capacity;
    }

    public void setManufacturer(Manufacturer manufacturer) {
        this.manufacturer = manufacturer;
    }

    public Manufacturer getManufacturer() {
        return manufacturer;
    }

}
