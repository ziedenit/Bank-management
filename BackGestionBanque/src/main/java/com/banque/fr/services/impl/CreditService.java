package com.banque.fr.services.impl;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.banque.fr.entites.Credit;
import com.banque.fr.repository.ICreditRepositery;
import com.banque.fr.services.ICompteService;
import com.banque.fr.services.ICreditService;
@Service
public class CreditService implements ICreditService{
private double taux;
private double mensualité;
private double t1,t2;
@Autowired
ICreditRepositery creditRepository;
	@Override
	public Credit calculMensualite(double montant, int duree,double mensualite) {
		if (montant<10000 && duree<60)
		{
		
			    taux=13;
		        double t=taux/100;
				double t1=montant*t/12;
				double t2=1-Math.pow(1+t/12,-1*duree);
				mensualité=t1/t2;
		}
		
		
		else if (montant>10000 && duree<60)
		{
			    taux=17;
		        double t=taux/100;
				double t1=montant*t/12;
				double t2=1-Math.pow(1+t/12,-1*duree);
				mensualité=t1/t2;
			
		}
		Credit c= new Credit(montant,duree,mensualité);
		return c;
		
		
	}
	@Override
	public Credit ajoutercredit(Credit c) {
		
		
		return (creditRepository.save(c));
	}
	@Override
	public Optional<Credit> recherchebyID(Long id) {
		return (creditRepository.findById(id));
		
	}

	
	
}
