package com.banque.fr.entites;


import java.util.Date;


import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

import com.fasterxml.jackson.annotation.JsonTypeName;
@JsonTypeName("Agent")
@Entity
@DiscriminatorValue("AG")
public class Agent extends Utilisateur{




	




	public Agent(String nom, String prenom, String cIN, String adresse, int age, double revenue, String login,
			String motdepasse, String adressemail, Date datenaissance) {
		super(nom, prenom, cIN, adresse, age, revenue, login, motdepasse, adressemail, datenaissance);
		// TODO Auto-generated constructor stub
	}



	public Agent() {
		super();
		// TODO Auto-generated constructor stub
	}

	
	
	

	
	
	
}
