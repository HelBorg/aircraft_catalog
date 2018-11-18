package example.alenaelena.aircraft_catalog.model;


import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "Aircrafts")
public class Aircraft {
    @Id
    @Column(name = "ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "NUMBER")
    @NotNull
    private String number;
//    999999null not null

    @Column(name = "MODEL")
    @NotNull
    private  String model;

    @Column(name = "YEAR")
    @NotNull
    private int year;

    @Column(name = "CAPACITY")
    @NotNull
    private int capacity;

    @Column(name = "Manufacturer_ID")
    @ManyToOne(cascade=CascadeType.PERSIST)
    @NotNull
    private Manufacturer manufacturer;

    public Aircraft() {
        super();
    }

    public Aircraft(String number, String model, int year,
                     int capacity, Manufacturer manufacturer) {
        super();
        this.number = number;
        this.model = model;
        this.year = year;
        this.capacity = capacity;
        this.manufacturer = manufacturer;
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
