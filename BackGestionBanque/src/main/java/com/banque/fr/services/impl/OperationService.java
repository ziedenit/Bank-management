package com.banque.fr.services.impl;

import java.util.Date;
import java.util.List;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.banque.fr.entites.Compte;
import com.banque.fr.entites.Operation;
import com.banque.fr.repository.ICompteRepositery;
import com.banque.fr.repository.IOperationRepository;

import com.banque.fr.services.IOperationService;

@Service
public class OperationService implements IOperationService {
	@Autowired
	private IOperationRepository operationRepository;
	@Autowired
	private ICompteRepositery compteRepositery;

	@Override
	// Service permettant d'eefecturer un versement sur un compte
	public Operation versement(Long id, double montant) {

		// ici, la methode save() permet l'enregistrement
		// mettre a jour le solde du compte
		Compte c = compteRepositery.findById(id).get();
		if (c == null)
			throw new RuntimeException("compte introuvable");
		else {
			double ini = c.getSolde();
			c.setSolde(ini + montant);
			compteRepositery.save(c); // ici, la methode save permet de mettre a jours le compte (update) ---->Meme
										// dans la console, on aura comme requette : Hibernate: update compte set
										// code_cli=?, date_creation=?, solde=?, decouvert=? where code_compte=?
			Operation versement = new Operation(new Date(), montant);
			versement.setTypeOperation("versement");
			versement.setCpt(c);
			// le versement est une operation
			return (operationRepository.save(versement));
		}
	}

	@Override
	public Operation retrait(Long id, double montant) {
		// TODO Auto-generated method stub

		Compte c = compteRepositery.findById(id).get();
		double ini = c.getSolde();
		if (ini < montant) {
			
			throw new RuntimeException("solde inssufisant retrait impossible");
			
			
		}
		else 
		c.setSolde(ini - montant);
		compteRepositery.save(c); // ici, la methode save permet de mettre a jours le compte (update) ---->Meme
									// dans la console, on aura comme requette : Hibernate: update compte set
									// code_cli=?, date_creation=?, solde=?, decouvert=? where code_compte=?
		Operation retrait = new Operation(new Date(), montant);
		retrait.setTypeOperation("retrait");
		retrait.setCpt(c);
		return operationRepository.save(retrait);
		
	}

	@Override
	public Boolean virement(Long idCompteRetrait, Long idCompteVersement, double montant) {
		// TODO Auto-generated method stub

		if (idCompteRetrait == idCompteVersement)
			throw new RuntimeException("Impossible : On ne peut pas effectuer un virement dans le meme compte");
		retrait(idCompteRetrait, montant);
		versement(idCompteVersement, montant);

		return (true);

	}

	@Override
	public List<Operation> toutesLesoperations() {
		// TODO Auto-generated method stub
		return operationRepository.findAll();
	}

	public List<Operation> findByCpt(Long id) {

		return operationRepository.findAllByCptIdcompe(id);
	}

	@Override
	public Boolean supprimerOpCompte(Long idCompte) {
		Optional<Compte> c = compteRepositery.findById(idCompte);
		List<Operation> ops = operationRepository.findAllByCptIdcompe(idCompte);
		if (ops.size() != 0)
			operationRepository.deleteAll(ops);

		return (true);

	}

	@Override
	public List<Operation> findByDate(Date date) {
		return operationRepository.findByDateoperation(date);
		
	}

}
