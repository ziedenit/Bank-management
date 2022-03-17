package com.banque.fr.services.impl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

import java.io.IOException;
import java.util.List;

import javax.mail.MessagingException;


import org.springframework.stereotype.Service;

import com.banque.fr.entites.Compte;

import com.banque.fr.repository.ICompteRepositery;

import com.banque.fr.services.ICompteService;
@Service
public class CompteService implements ICompteService {
	@Autowired
	private ICompteRepositery compteRepositery;
	
	@Autowired
    private JavaMailSender javaMailSender;
	
// service numero 1 retoune le compte 
	public Compte getCompte(Long id) {
 
		Compte c= compteRepositery.findById(id).get();
		if (c==null) throw new RuntimeException("compte introuvable");
		else 
			return compteRepositery.findById(id).get();

	}

	@Override
	// service numero 2 permet de creer un compte 
	public Compte creerCompte(Compte c) throws MessagingException, IOException {

//	String mail=c.getUtilisateur().getAdressemail();
//		
//		
//	SimpleMailMessage msg = new SimpleMailMessage();
//        msg.setTo(mail);
//
//       msg.setSubject("Votre compte bancaire est crée ");
//       msg.setText("Chere Client \n vous disposez d'un compte bancaire de type  "+c.getType()+"  chez notre Banque Paris votre RIB est "+c.getRib());
//
//       javaMailSender.send(msg);
	
       return compteRepositery.save(c);
	        
	        
	    	
	}

	// service numero 3 permet de modifier un compte
	public Compte updateCompte(Compte c) {

		return compteRepositery.save(c);
	}

	// service numero 4 retourne le compte recherché par rib
	public Compte rechercherbyRib(String rib) {

		return compteRepositery.findByRib(rib);
	}
	// service numero 5 retourne la liste de tous les comptes 
	@Override
	public List<Compte> retournerTous() {
		return compteRepositery.findAll();
	}
	// service numero 6 retourne true si le compte est supprimer 
	@Override
	public boolean supprimerCompte(Long id) {
		Compte c= compteRepositery.findById(id).get();
		if (c==null) throw new RuntimeException("compte introuvable on ne peut pas le supprimer");
		else 
	
		compteRepositery.deleteById(id);
		return (true) ;

	}
	
}
