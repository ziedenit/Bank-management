package com.banque.fr.repository;





import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.data.repository.query.Param;

import com.banque.fr.entites.Operation;
import java.lang.String;




@Repository
public interface IOperationRepository extends JpaRepository<Operation, Long >{
	
	public List<Operation> findAllByCptIdcompe(Long idCompte);
	

	
	public List<Operation> findByTypeOperation(String typeoperation);


	//public List<Operation> findAllByDateoperation(Date date);
	
	//public List<Operation> findByDateoperation(Date dateoperation);
	//public List<Operation> findByDateoperation(Date dateoperation);
	public List<Operation> findByDateoperation(Date dateoperation);
	
//	@Query(value="Select * from operation o,compte c WHERE dateoperation= :date and o.cpt_idcompe= c.idcompe",nativeQuery=true)
//	public List<Operation> findByDateoperation(@Param("date") Date dateoperation);

}
