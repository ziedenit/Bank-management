package com.banque.fr.entites;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.ManyToAny;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Compte {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long idcompe;
	private String type;
	private double solde;
	@Column(unique = true)
	private String rib;
	@Temporal(TemporalType.DATE)
	private Date datecreation;
	@Column(unique = true)
	private String numerocarte;
	@ManyToOne
	private Utilisateur utilisateur;
	@OneToMany(mappedBy = "cpt", fetch = FetchType.LAZY)
	@JsonIgnore
	private List<Operation> operation;

	public Compte() {
		super();
	}

	public Compte(String rib, String numerocarte) {
		super();
		this.rib = rib;
		this.numerocarte = numerocarte;
	}

	public Compte(String type, double solde, Date datecreation, String rib, String numerocarte) {
		super();
		this.type = type;
		this.solde = solde;
		this.rib = rib;
		this.datecreation = datecreation;
		this.numerocarte = numerocarte;
	}

	public Compte(String type, double solde, String rib, Date datecreation, String numerocarte,
			Utilisateur utilisateur) {
		super();
		this.type = type;
		this.solde = solde;
		this.rib = rib;
		this.datecreation = datecreation;
		this.numerocarte = numerocarte;
		this.utilisateur = utilisateur;
	}

	public Long getIdcompe() {
		return idcompe;
	}



	public void setIdcompe(Long idcompe) {
		this.idcompe = idcompe;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public double getSolde() {
		return solde;
	}

	public void setSolde(double solde) {
		this.solde = solde;
	}

	public String getRib() {
		return rib;
	}

	public void setRib(String rib) {
		this.rib = rib;
	}

	public Date getDatecreation() {
		return datecreation;
	}

	public void setDatecreation(Date datecreation) {
		this.datecreation = datecreation;
	}

	public String getNumerocarte() {
		return numerocarte;
	}

	public void setNumerocarte(String numerocarte) {
		this.numerocarte = numerocarte;
	}

	public Utilisateur getUtilisateur() {
		return utilisateur;
	}

	public void setUtilisateur(Utilisateur utilisateur) {
		this.utilisateur = utilisateur;
	}

	public List<Operation> getOperation() {
		return operation;
	}

	public void setOperation(List<Operation> operation) {
		this.operation = operation;
	}
	@Override
	public String toString() {
		return "Compte [idcompe=" + idcompe + ", type=" + type + ", solde=" + solde + ", rib=" + rib + ", datecreation="
				+ datecreation + ", numerocarte=" + numerocarte + "]";
	}
}