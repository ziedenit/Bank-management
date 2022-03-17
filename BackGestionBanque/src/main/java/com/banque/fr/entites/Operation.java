package com.banque.fr.entites;

import java.time.LocalDate;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
@Entity
public class Operation {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id ;
	private String typeOperation;
	@Temporal(TemporalType.DATE)

	private Date dateoperation;
	private double montant;
	@ManyToOne 
	private Compte cpt;
	
	public Operation() {
		super();
	}

	public Operation(Long id, String typeOperation, Date dateoperation, double montant) {
		super();
		this.id = id;
		this.typeOperation = typeOperation;
		this.dateoperation = dateoperation;
		this.montant = montant;
	}
	
	public Operation(Date dateoperation, double montant) {
		super();
		this.dateoperation = dateoperation;
		this.montant = montant;
	}

	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getTypeOperation() {
		return typeOperation;
	}
	public void setTypeOperation(String typeOperation) {
		this.typeOperation = typeOperation;
	}
	public Date getDateoperation() {
		return dateoperation;
	}
	public void setDateoperation(Date dateoperation) {
		this.dateoperation = dateoperation;
	}
	public double getMontant() {
		return montant;
	}
	public void setMontant(double montant) {
		this.montant = montant;
	}
	
	public Compte getCpt() {
		return cpt;
	}
	public void setCpt(Compte cpt) {
		this.cpt = cpt;
	}
	@Override
	public String toString() {
		return "opération [id=" + id + ", typeOperation=" + typeOperation + ", dateoperation=" + dateoperation
				+ ", montant=" + montant + "]";
	}
	
	
	
	
	
	
	
}
