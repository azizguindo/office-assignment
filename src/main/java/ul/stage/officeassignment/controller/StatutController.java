package ul.stage.officeassignment.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ul.stage.officeassignment.exception.ResourceNotFoundException;
import ul.stage.officeassignment.model.Statut;
import ul.stage.officeassignment.model.Utilisateur;
import ul.stage.officeassignment.repository.StatutRepository;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class StatutController {

    @Autowired
    StatutRepository statutRepository;

    //Get all status
    @GetMapping("/statuts")
    public List<Statut> getAllStatus(){
        return statutRepository.findAll();
    }

    //Get a status
    @GetMapping("statuts/{id}")
    public Statut getStatusById(@PathVariable(value="id") Long statutId){
        return statutRepository.findById(statutId)
                .orElseThrow(()-> new ResourceNotFoundException("Statut","id",statutId));
    }

    //Add a status
    @PostMapping("/statuts")
    public Statut addStatus(@Valid @RequestBody Statut statut){
        return statutRepository.save(statut);
    }
}
