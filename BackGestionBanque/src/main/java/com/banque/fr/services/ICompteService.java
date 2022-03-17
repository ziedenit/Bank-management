package com.banque.fr.services;

import java.io.IOException;
import java.util.Date;
import java.util.List;

import javax.mail.MessagingException;

import com.banque.fr.entites.Compte;
import com.banque.fr.entites.Utilisateur;

public interface ICompteService {

	
	public Compte getCompte(Long id);
	public Compte creerCompte(Compte c) throws MessagingException, IOException;
	public Compte updateCompte(Compte c);
	public Compte rechercherbyRib(String rib);
	public List<Compte> retournerTous();
	public boolean supprimerCompte(Long id);


}
