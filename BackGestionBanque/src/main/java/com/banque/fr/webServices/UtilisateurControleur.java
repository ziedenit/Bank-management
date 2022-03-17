package com.banque.fr.webServices;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.banque.fr.entites.Utilisateur;
import com.banque.fr.services.impl.CompteService;
import com.banque.fr.services.impl.UtilisateurService;

@RestController
//@RequestMapping("user")
@CrossOrigin(origins = "*")
public class UtilisateurControleur {
	@Autowired
	UtilisateurService userService;
	
	@RequestMapping("user")
	String teste() {
		return "Hello userservice";
	}

	@DeleteMapping(value = "suppUser/{idUser}")
	Boolean supprimerUtlisateur(@PathVariable("idUser") Long id) {
		return (userService.supprimerUtlisateur(id));
	}

	@GetMapping(value = "recherUser/{idUser}") 
	Utilisateur rechercherUtlisateur(@PathVariable("idUser") Long id) {
		return (userService.rechercherUtlisateur(id)); 
	}

	@PostMapping(value = "ajouMod") 
	Utilisateur ajouterouModifier(@RequestBody Utilisateur u) {
		return (userService.ajouterouModifier(u));
	}

	@GetMapping(value = "touUtil")
	List<Utilisateur> tousUtlisateurs() {
		return (userService.tousUtlisateurs());
	}
	@GetMapping(value="ParCIN/{CINUser}")
	Utilisateur recherchebyCIN(@PathVariable("CINUser") String CIN)
	{
		return (userService.recherchebyCIN(CIN));
	}
	

}
