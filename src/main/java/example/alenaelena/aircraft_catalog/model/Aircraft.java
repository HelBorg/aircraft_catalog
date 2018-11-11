package example.alenaelena.aircraft_catalog.model;


import javax.persistence.*;

@Entity
@Table(name = "Aircrafts")
public class Aircraft {
    @Id
    @Column(name = "ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "NUMBER")
    private String number;
    999999null not null

    @Column(name = "MODEL")
    private  String model;

    @Column(name = "YEAR")
    private int year;

    @Column(name = "CAPACITY")
    private int capacity;

    @ManyToOne
    @Column(name = "Manufacturer_ID")
    private Manufacturer manufId;
    777777777777

    public Aircraft() {
        super();
    }

    public Aircraft(String number, String model, int year,
                     int capacity, int manufId) {
        super();
        this.number = number;
        this.model = model;
        this.year = year;
        this.capacity = capacity;
        this.manufId = manufId;
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

    public void setManufId(int manufId) {
        this.manufId = manufId;
    }

    public int getManufId() {
        return manufId;
    }
}
