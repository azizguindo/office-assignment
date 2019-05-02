package ul.stage.officeassignment.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ul.stage.officeassignment.exception.ResourceNotFoundException;
import ul.stage.officeassignment.model.Bureau;
import ul.stage.officeassignment.repository.BureauRepository;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class BureauController {

    @Autowired
    BureauRepository bureauRepository;

    //Get all offices
    @GetMapping("/offices")
    public List<Bureau> getAllOffices(){
        return bureauRepository.findAll();
    }

    //Get an office
    @GetMapping("offices/{id}")
    public Bureau getOfficeById(@PathVariable(value="id") Long bureauId){
        return bureauRepository.findById(bureauId)
                .orElseThrow(()-> new ResourceNotFoundException("Bureau","id",bureauId));
    }

    //Add an office
    @PostMapping("/offices")
    public Bureau addOffice(@Valid @RequestBody Bureau bureau){
        return bureauRepository.save(bureau);
    }

    //Update an office
    @PutMapping("offices/{id}")
    public Bureau UpdateOffice(@PathVariable(value="id") Long bureauId,
                                  @Valid @RequestBody Bureau bureauDetails){
        Bureau bureau = bureauRepository.findById(bureauId)
                .orElseThrow(()-> new ResourceNotFoundException("Bureau","id",bureauId));

        bureau.setNumero(bureauDetails.getNumero());
        bureau.setNbPlaces(bureauDetails.getNbPlaces());
        bureau.setStatut(bureauDetails.getStatut());
        bureau.setNbPlacesOccupees(bureauDetails.getNbPlacesOccupees());

        Bureau updatedOffice = bureauRepository.save(bureau);
        return updatedOffice;
    }

    //Delete an office
    @DeleteMapping("offices/{id}")
    public ResponseEntity<?> deleteOffice(@PathVariable(value = "id") Long bureauId){
        Bureau bureau = bureauRepository.findById(bureauId)
                .orElseThrow(()-> new ResourceNotFoundException("Bureau", "id",bureauRepository));
        bureauRepository.delete(bureau);
        return ResponseEntity.ok().build();
    }



}

