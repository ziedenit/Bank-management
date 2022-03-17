package com.banque.fr.services.impl;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.banque.fr.entites.Compte;
import com.banque.fr.entites.Utilisateur;
import com.banque.fr.repository.ICompteRepositery;
import com.banque.fr.repository.IUtilisateurRepository;
import com.banque.fr.services.IUtilisateurService;
@Service  // annotation utilise pour les objets de la couche metier
@Transactional  // a importer : 
public class UtilisateurService implements IUtilisateurService{
@Autowired
private IUtilisateurRepository utilisateurRepository;
@Autowired
private CompteService compteService;
	


	public boolean supprimerUtlisateur(Long id) {

		
		
		
	  Optional<Utilisateur> u=  utilisateurRepository.findById(id);
		if (u==null) throw new RuntimeException("Utlisateur introuvable");
		else 
	   utilisateurRepository.deleteById(id);
		return (true);

	}

	public Utilisateur rechercherUtlisateur(Long id) {

		Optional<Utilisateur> u=  utilisateurRepository.findById(id);
		if (u==null) throw new RuntimeException("Utlisateur introuvable");
		else
		return utilisateurRepository.findById(id).get();
	}

	@Override
	public Utilisateur ajouterouModifier(Utilisateur u) {
		
	
		
		return utilisateurRepository.save(u);
		
		
	}

	@Override
	public List<Utilisateur> tousUtlisateurs() {
		
		return utilisateurRepository.findAll();
	}

	@Override
	public Utilisateur recherchebyCIN(String CIN) {
		
		return utilisateurRepository.findByCIN(CIN);
	}

     
	


	
	


	

	
}
