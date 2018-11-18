package example.alenaelena.aircraft_catalog.controller;

import example.alenaelena.aircraft_catalog.model.Aircraft;
import example.alenaelena.aircraft_catalog.repository.AircraftRepository;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@Controller
@RequestMapping("/main/record")
public class AircraftController {

//    protected static final Logger logger = LoggerFactory.getLogger("controller");

    private AircraftRepository aircraftRepository;

    public AircraftController(AircraftRepository aircraftRepository) {
        this.aircraftRepository = aircraftRepository;
    }

    @GetMapping("/aircrafts")
    Collection<Aircraft> aircrafts() {
        return aircraftRepository.findAll();
    }

    @GetMapping("/aircraft/{ID}")
    public  String aircraft(@PathVariable Long id, Model model) {
        model.addAttribute("aircraft", aircraftRepository.findById(id));
        return "aircraft";
    }

    @RequestMapping(value = "/aircraft/get", method = RequestMethod.GET)
    public String aircraftsList(Model model) {
        model.addAttribute("aircrafts", aircraftRepository.findAll());
        return "aircrafts";
    }

    @RequestMapping(value = "/aircrafts/add", method = RequestMethod.POST)
    public String aircraftsAdd(@RequestParam String number, @RequestParam String mod,
                               @RequestParam int year, @RequestParam int capacity, Model model) {
        Aircraft newAircraft = new Aircraft();
        newAircraft.setNumber(number);
        newAircraft.setModel(mod);
        newAircraft.setYear(year);
        newAircraft.setCapacity(capacity);

        model.addAttribute("aircraft", newAircraft);
        return "redirect:/aircraft/" + newAircraft.getId();
    }

}
