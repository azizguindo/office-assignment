package ul.stage.officeassignment.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ul.stage.officeassignment.exception.ResourceNotFoundException;
import ul.stage.officeassignment.model.Utilisateur;
import ul.stage.officeassignment.repository.UtilisateurRepository;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class UtilisateurController  {

    @Autowired
    UtilisateurRepository utilisateurRepository;

    //Get all users
    @GetMapping("/users")
    public List<Utilisateur> getAllUsers(){
        return utilisateurRepository.findAll();
    }

    //Get a user
    @GetMapping("users/{id}")
    public Utilisateur getUserById(@PathVariable(value="id") Long utilisateurId){
        return utilisateurRepository.findById(utilisateurId)
        .orElseThrow(()-> new ResourceNotFoundException("Utilisateur","id",utilisateurId));
    }

    //Add a user
    @PostMapping("/users")
    public Utilisateur addUser(@Valid @RequestBody Utilisateur utilisateur){
        return utilisateurRepository.save(utilisateur);
    }

    //Update a user
    @PutMapping("users/{id}")
    public Utilisateur UpdateUser(@PathVariable(value="id") Long utilisateurId,
                                  @Valid @RequestBody Utilisateur utilisateurDetails){
        Utilisateur utilisateur = utilisateurRepository.findById(utilisateurId)
                .orElseThrow(()-> new ResourceNotFoundException("Utilisateur","id",utilisateurId));

        utilisateur.setNom(utilisateurDetails.getNom());
        utilisateur.setPrenom(utilisateurDetails.getPrenom());
        utilisateur.setStatut(utilisateurDetails.getStatut());
        utilisateur.setDateArrivee(utilisateurDetails.getDateArrivee());
        utilisateur.setDateDepart(utilisateurDetails.getDateDepart());

        Utilisateur updatedUser = utilisateurRepository.save(utilisateur);
        return updatedUser;
    }

    //Delete a user
    @DeleteMapping("users/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable(value = "id") Long utilisateurId){
        Utilisateur utilisateur = utilisateurRepository.findById(utilisateurId)
                .orElseThrow(()-> new ResourceNotFoundException("Utilisateur", "id",utilisateurId));

        utilisateurRepository.delete(utilisateur);

        return ResponseEntity.ok().build();
    }
}
