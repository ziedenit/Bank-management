package com.banque.fr.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.banque.fr.entites.DemandeCredit;

public interface IDemandeCreditRepository extends JpaRepository<DemandeCredit, Long>{

	

	
}
