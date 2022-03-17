package com.banque.fr.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.banque.fr.entites.Utilisateur;
import java.lang.String;
import java.util.List;
@Repository
public interface IUtilisateurRepository extends JpaRepository <Utilisateur, Long> {

	public Utilisateur findByCIN(String cin);
	
	

}
