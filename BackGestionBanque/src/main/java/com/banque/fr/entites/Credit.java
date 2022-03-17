package com.banque.fr.entites;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;
@Entity
//@Table(name="credit")
public class Credit {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@JsonIgnore
	private Long idcredit; 
	private double montant;
	private int duree;
	private double mensualite;
	
	 @OneToOne(fetch = FetchType.LAZY)
	 @JoinColumn(name = "utilisateur_id")
	@JsonIgnore
	
	 private Utilisateur user;
	
	
	
	
	public Credit() {
		super();
	}
	
	public Credit(double montant, int duree, double mensualite) {
		super();
		this.montant = montant;
		this.duree = duree;
		this.mensualite = mensualite;
	}

	public double getMensualite() {
		return mensualite;
	}

	public void setMensualite(double mensualite) {
		this.mensualite = mensualite;
	}

	public Long getIdcredit() {
		return idcredit;
	}
	public void setIdcredit(Long idcredit) {
		this.idcredit = idcredit;
	}
	public double getMontant() {
		return montant;
	}
	public void setMontant(double montant) {
		this.montant = montant;
	}
	public int getDuree() {
		return duree;
	}
	public void setDuree(int duree) {
		this.duree = duree;
	}
	
    
	

}
