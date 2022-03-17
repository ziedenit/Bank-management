package com.banque.fr.entites;

import com.fasterxml.jackson.annotation.JsonTypeName;
import java.util.Date;
import java.util.List;

import javax.persistence.DiscriminatorColumn;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
@JsonTypeName("Client")
@Entity
@DiscriminatorValue("clt")

public class Client extends Utilisateur {

	
	


	public Client(String nom, String prenom, String cIN, String adresse, int age, double revenue, String login,
			String motdepasse, String adressemail, Date datenaissance) {
		super(nom, prenom, cIN, adresse, age, revenue, login, motdepasse, adressemail, datenaissance);
		// TODO Auto-generated constructor stub
	}



	public Client() {
		super();
		// TODO Auto-generated constructor stub
	}

	

	
	
	
	}
