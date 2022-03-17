package com.banque.fr.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.banque.fr.entites.Credit;

public interface ICreditRepositery extends JpaRepository<Credit, Long> {
	

}
