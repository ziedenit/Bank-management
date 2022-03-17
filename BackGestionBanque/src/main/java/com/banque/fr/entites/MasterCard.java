package com.banque.fr.entites;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;


@Entity
public class MasterCard {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
    private String ribassocie;
    @Column(unique = true)
    private int numCarte;
    private String nomUtilisateur;
    private String prenomUtilisateur;
    private String typeCarte;
    
    @OneToOne
    private Utilisateur userCard;
    
	public MasterCard(String ribassocie, int numCarte, String nomUtilisateur, String prenomUtilisateur,
			String typeCarte) {
		super();
		this.ribassocie = ribassocie;
		this.numCarte = numCarte;
		this.nomUtilisateur = nomUtilisateur;
		this.prenomUtilisateur = prenomUtilisateur;
		this.typeCarte = typeCarte;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getRibassocie() {
		return ribassocie;
	}

	public void setRibassocie(String ribassocie) {
		this.ribassocie = ribassocie;
	}

	public int getNumCarte() {
		return numCarte;
	}

	public void setNumCarte(int numCarte) {
		this.numCarte = numCarte;
	}

	public String getNomUtilisateur() {
		return nomUtilisateur;
	}

	public void setNomUtilisateur(String nomUtilisateur) {
		this.nomUtilisateur = nomUtilisateur;
	}

	public String getPrenomUtilisateur() {
		return prenomUtilisateur;
	}

	public void setPrenomUtilisateur(String prenomUtilisateur) {
		this.prenomUtilisateur = prenomUtilisateur;
	}

	public String getTypeCarte() {
		return typeCarte;
	}

	public void setTypeCarte(String typeCarte) {
		this.typeCarte = typeCarte;
	}

	@Override
	public String toString() {
		return "MasterCard [id=" + id + ", ribassocie=" + ribassocie + ", numCarte=" + numCarte + ", nomUtilisateur="
				+ nomUtilisateur + ", prenomUtilisateur=" + prenomUtilisateur + ", typeCarte=" + typeCarte + "]";
	}
    

    
    
    
    
    
    
    
    
}
