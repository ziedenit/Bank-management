package com.banque.fr.services;

import java.util.Date;
import java.util.List;

import com.banque.fr.entites.Compte;
import com.banque.fr.entites.Utilisateur;

public interface IUtilisateurService {
	public boolean supprimerUtlisateur(Long id);
	public Utilisateur ajouterouModifier(Utilisateur u); 
	public Utilisateur rechercherUtlisateur(Long id);
	public List<Utilisateur> tousUtlisateurs();
	public Utilisateur recherchebyCIN(String CIN);
	

	
	

}
