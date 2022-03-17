package com.banque.fr.services;

import java.util.Optional;

import com.banque.fr.entites.Credit;
import com.banque.fr.entites.Utilisateur;

public interface ICreditService {

	

	public Credit calculMensualite(double montant, int duree,double mensualite);
	public Credit ajoutercredit(Credit c);
	public Optional<Credit> recherchebyID(Long id);
	
	
	
}
	

