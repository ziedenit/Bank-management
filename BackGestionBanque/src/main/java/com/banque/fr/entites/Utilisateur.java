package com.banque.fr.entites;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.DiscriminatorColumn;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo.As;

@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "type")
//@JsonTypeInfo(use = JsonTypeInfo.Id.CLASS, include = JsonTypeInfo.As.PROPERTY, property = "type")
@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, include = As.PROPERTY, property = "type") @JsonSubTypes({
   @JsonSubTypes.Type(value = Client.class, name = "Client"),
@JsonSubTypes.Type(value = Agent.class, name = "Agent")
})


public class Utilisateur {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	
	private Long idutilisateur;
	private String nom;
	private String prenom;
	@Column(unique = true)
	private String CIN;
	private String adresse;
	private int age;
	private double revenue;
	private String login;
	private String motdepasse;
	
	private String adressemail;
	@Temporal(TemporalType.DATE)
	private Date datenaissance;
	@OneToMany(mappedBy = "utilisateur" ,cascade = CascadeType.REMOVE)
	@JsonIgnore
	private List <Compte> comptes;

	@OneToOne(mappedBy = "user")
	private Credit crd;
	@OneToOne(mappedBy="userCredit")
	private DemandeCredit demande;
	@OneToOne (mappedBy = "userCard")
	private MasterCard card;


	public Utilisateur() {
		super();
		// TODO Auto-generated constructor stub
	}




	public Utilisateur( String nom, String prenom, String cIN, String adresse, int age,
			double revenue, String login, String motdepasse,String adressemail ,Date datenaissance) {
		super();
		
		this.nom = nom;
		this.prenom = prenom;
		CIN = cIN;
		this.adresse = adresse;
		this.age = age;
		this.revenue = revenue;
		this.login = login;
		this.motdepasse = motdepasse;
		this.adressemail=adressemail;
		this.datenaissance = datenaissance;
	}




	public List<Compte> getComptes() {
		return comptes;
	}




	public void setComptes(List<Compte> comptes) {
		this.comptes = comptes;
	}




	public int getAge() {
		return age;
	}




	public void setAge(int age) {
		this.age = age;
	}




	public double getRevenue() {
		return revenue;
	}




	public void setRevenue(double revenue) {
		this.revenue = revenue;
	}




	public Long getIdutilisateur() {
		return idutilisateur;
	}

	public void setIdutilisateur(Long idutilisateur) {
		this.idutilisateur = idutilisateur;
	}

	public String getNom() {
		return nom;
	}

	public void setNom(String nom) {
		this.nom = nom;
	}

	public String getPrenom() {
		return prenom;
	}

	public void setPrenom(String prenom) {
		this.prenom = prenom;
	}

	public String getCIN() {
		return CIN;
	}

	public void setCIN(String cIN) {
		CIN = cIN;
	}

	public String getAdresse() {
		return adresse;
	}

	public void setAdresse(String adresse) {
		this.adresse = adresse;
	}

	public String getLogin() {
		return login;
	}

	public void setLogin(String login) {
		this.login = login;
	}

	public String getMotdepasse() {
		return motdepasse;
	}

	public void setMotdepasse(String motdepasse) {
		this.motdepasse = motdepasse;
	}
	

	public Utilisateur(String adressemail) {
		super();
		this.adressemail = adressemail;
	}




	public Date getDatenaissance() {
		return datenaissance;
	}

	public void setDatenaissance(Date datenaissance) {
		this.datenaissance = datenaissance;
	}




	public String getAdressemail() {
		return adressemail;
	}




	public void setAdressemail(String adressemail) {
		this.adressemail = adressemail;
	}




	@Override
	public String toString() {
		return "Utilisateur [idutilisateur=" + idutilisateur + ", nom=" + nom + ", prenom=" + prenom + ", CIN=" + CIN
				+ ", adresse=" + adresse + ", age=" + age + ", revenue=" + revenue + ", login=" + login
				+ ", motdepasse=" + motdepasse + ", adressemail=" + adressemail + ", datenaissance=" + datenaissance
				+ ", comptes=" + comptes + "]";
	}



	
	
	
	
}