package com.banque.fr.webServices;





import java.text.ParseException;
import java.text.SimpleDateFormat;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.banque.fr.entites.Operation;
import com.banque.fr.services.impl.OperationService;

@RestController
@RequestMapping("operation")
@CrossOrigin(origins = "*")
public class OperationControleur {
private Date datee;
	@Autowired
	OperationService operationService;

	// premier méthode utilisation de l'annotation @GetMapping
	@GetMapping(value = "versement/{idCompte}/{montant}")
	Operation versement(@PathVariable("idCompte") Long id, @PathVariable("montant") double montant) {
		return operationService.versement(id, montant);
	}

	// deuxième méthode utilisation de l'annotation @RequestMapping ici on passe les
	// parametres par des ?id=..&montant=..au niveau de l'URL
	@RequestMapping(value = "retrait", method = RequestMethod.GET)
	Operation retrait(@RequestParam Long id, @RequestParam double montant) {
		return operationService.retrait(id, montant);
	}

	@RequestMapping(value = "virement/{idCompteRetrait}/{idCompteVersement}/{montant}", method = RequestMethod.GET)
	Boolean virement(@PathVariable("idCompteRetrait") Long idCompteRetrait,
			@PathVariable("idCompteVersement") Long idCompteVersement, @PathVariable("montant") double montant) {
		return (operationService.virement(idCompteRetrait, idCompteVersement, montant));
	}

	@RequestMapping(value = "operations", method = RequestMethod.GET)
	List<Operation> toutesOperations() {
		return (operationService.toutesLesoperations());
	}

	@RequestMapping(value = "operationsParCompte/{idCompte}", method = RequestMethod.GET)
	List<Operation> findByCpt(@PathVariable("idCompte") Long id) {
		return (operationService.findByCpt(id));
	}

	@DeleteMapping(value = "suppOpCompte/{idCompte}")
	Boolean supprimerOpCompte(@PathVariable("idCompte") Long id) {
		return (operationService.supprimerOpCompte(id));
	}

	@RequestMapping(value = "operationsParDate/{date}", method = RequestMethod.GET)
	List <Operation> findByDate(@PathVariable("date") String date) {
		SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
		 List<Operation> ls= new ArrayList(); 
		try {
			Date d = formatter.parse(date);
			System.out.println(d);
			String pattern = "yyyy-MM-dd";
			SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);
	//
	    	String datee = simpleDateFormat.format(d);
	       	System.out.println(datee);
	      
	       ls=operationService.findByDate(d);
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return ls;
//	
		
	        	
//				return operationService.findByDate(d);
	      
		
	}

}