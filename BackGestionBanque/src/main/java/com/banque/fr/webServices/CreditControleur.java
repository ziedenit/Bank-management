package com.banque.fr.webServices;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.banque.fr.entites.Compte;
import com.banque.fr.entites.Credit;
import com.banque.fr.entites.Utilisateur;
import com.banque.fr.services.impl.CreditService;

@RestController
@RequestMapping("Credit")
@CrossOrigin(origins = "*")
public class CreditControleur {
	@Autowired
	CreditService creditService;
	
	@PostMapping(value = "simulateur")
	Credit calculMensualite(@RequestBody  Credit c) {
		return (creditService.calculMensualite(c.getMontant(), c.getDuree(),c.getMensualite()));
	}
	
	@GetMapping(value = "recherCredit/{idCredit}")
	Optional<Credit> recherchebyID(@PathVariable("idCredit") Long id) {
		return (creditService.recherchebyID(id));
	}
	
	
	
	
	
}
