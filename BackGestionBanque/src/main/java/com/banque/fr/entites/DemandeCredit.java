package com.banque.fr.entites;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
@Entity
public class DemandeCredit {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
private Long idDemande;
private int dureeRemboursement;
private double montantSouhaite;
@OneToOne(fetch = FetchType.LAZY)
@JoinColumn(name = "utilisateur_id")
private Utilisateur userCredit;


public DemandeCredit() {
	super();
}


public DemandeCredit(int dureeRemboursement, double montantSouhaite, Utilisateur userCredit) {
	super();
	this.dureeRemboursement = dureeRemboursement;
	this.montantSouhaite = montantSouhaite;
	this.userCredit = userCredit;
}


public Long getIdDemande() {
	return idDemande;
}


public void setIdDemande(Long idDemande) {
	this.idDemande = idDemande;
}


public int getDureeRemboursement() {
	return dureeRemboursement;
}


public void setDureeRemboursement(int dureeRemboursement) {
	this.dureeRemboursement = dureeRemboursement;
}


public double getMontantSouhaite() {
	return montantSouhaite;
}


public void setMontantSouhaite(double montantSouhaite) {
	this.montantSouhaite = montantSouhaite;
}


public Utilisateur getUserCredit() {
	return userCredit;
}


public void setUserCredit(Utilisateur userCredit) {
	this.userCredit = userCredit;
}



@Override
public String toString() {
	return "DemandeCredit [idDemande=" + idDemande + ", dureeRemboursement=" + dureeRemboursement + ", montantSouhaite="
			+ montantSouhaite + ", userCredit=" + userCredit + "]";
}




}
