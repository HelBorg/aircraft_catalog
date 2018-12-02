package example.alenaelena.aircraft_catalog.model;

import lombok.*;

import javax.persistence.*;

@Data
@Entity
@Table(name = "aircraft")
public class Aircraft {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String number;

    private  String model;

    private int year;

    private int capacity;

    @ManyToOne
    @JoinColumn(name = "Manufacturer_ID")
    private Manufacturer manufacturer;

    public Aircraft() {
        super();
    }

    public Aircraft(String number, String model, int year, int capacity, Manufacturer manufacturer) {
        this.number = number;
        this.model = model;
        this.year = year;
        this.capacity = capacity;
        this.manufacturer = manufacturer;
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
