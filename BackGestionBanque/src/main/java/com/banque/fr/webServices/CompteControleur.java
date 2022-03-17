package com.banque.fr.webServices;

import java.io.IOException;
import java.util.List;

import javax.mail.MessagingException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.banque.fr.entites.Compte;
import com.banque.fr.entites.Operation;
import com.banque.fr.services.impl.CompteService;
import com.banque.fr.services.impl.OperationService;

@RestController

@CrossOrigin
public class CompteControleur {

	@Autowired
	CompteService compteService;
	
	@RequestMapping("compte")
	String home() {
		return "Hello compteservice";
	}
	
	@GetMapping(value = "getCompte/{idCompte}")
	Compte getCompte(@PathVariable("idCompte") Long id) {
		return (compteService.getCompte(id));
	}

	// nous utilisons ici @Requestbody pour passer un object de type compte en
	// paramètres
	@PostMapping(value = "creerCompte")
	Compte creerCompte(@RequestBody Compte c) throws MessagingException, IOException {
		return (compteService.creerCompte(c));

	}

	@PutMapping(value = "modifierCompte")
	Compte updateCompte(@RequestBody Compte c) {
		return (compteService.updateCompte(c));

	}

	@DeleteMapping(value = "suppCompte/{idCompte}")
	Boolean supprimerCompte(@PathVariable("idCompte") Long id) {
		return (compteService.supprimerCompte(id));
	}
	
	
	
	
	
	@GetMapping(value = "recherchebyRIB/{ribCompte}")
	Compte rechercherbyRib(@PathVariable("ribCompte") String rib) {
		return (compteService.rechercherbyRib(rib));

	}

	@GetMapping(value = "toutesComptes")
	List<Compte> retournerTous() {
		return (compteService.retournerTous());
	}

}
