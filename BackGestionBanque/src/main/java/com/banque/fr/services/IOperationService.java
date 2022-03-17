package com.banque.fr.services;



import java.util.Date;
import java.util.List;

import com.banque.fr.entites.Operation;

public interface IOperationService {
	
	public Operation versement(Long id, double montant);

	public Operation retrait(Long id, double montant);

	public Boolean virement(Long codeCompteRetrait, Long codeCompteVersement, double montant);
	
	public List<Operation> toutesLesoperations();
	
	public Boolean supprimerOpCompte(Long idCompte);
	
	public List<Operation> findByDate(Date date);
	
}
