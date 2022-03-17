package com.banque.fr.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.banque.fr.entites.Compte;
@Repository
public interface ICompteRepositery  extends JpaRepository<Compte, Long>{
public Compte findByRib(String rib);
public List<Compte> findBySolde(double solde);

}
