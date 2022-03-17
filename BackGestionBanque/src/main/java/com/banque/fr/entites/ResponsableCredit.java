package com.banque.fr.entites;

import java.util.Date;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

@Entity
@DiscriminatorValue("Responsable")
public class ResponsableCredit extends Utilisateur {

	public ResponsableCredit() {
		super();
		// TODO Auto-generated constructor stub
	}

	public ResponsableCredit(String nom, String prenom, String cIN, String adresse, int age, double revenue,
			String login, String motdepasse, String adressemail, Date datenaissance) {
		super(nom, prenom, cIN, adresse, age, revenue, login, motdepasse, adressemail, datenaissance);
		// TODO Auto-generated constructor stub
	}

	public ResponsableCredit(String adressemail) {
		super(adressemail);
		// TODO Auto-generated constructor stub
	}

	

	
	
	
}
