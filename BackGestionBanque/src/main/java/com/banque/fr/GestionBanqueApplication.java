package com.banque.fr;

import java.text.SimpleDateFormat;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Locale;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.support.SimpleJpaRepository;

import com.banque.fr.entites.Agent;
import com.banque.fr.entites.Client;
import com.banque.fr.entites.Compte;
import com.banque.fr.entites.Credit;
import com.banque.fr.entites.Operation;
import com.banque.fr.entites.ResponsableCredit;
import com.banque.fr.entites.Utilisateur;
import com.banque.fr.repository.ICompteRepositery;
import com.banque.fr.repository.IOperationRepository;
import com.banque.fr.repository.IUtilisateurRepository;
import com.banque.fr.services.impl.CompteService;
import com.banque.fr.services.impl.CreditService;
import com.banque.fr.services.impl.OperationService;
import com.banque.fr.services.impl.UtilisateurService;

@SpringBootApplication
public class GestionBanqueApplication implements CommandLineRunner {
@Autowired
IUtilisateurRepository Ur;
@Autowired
UtilisateurService Us;
@Autowired
ICompteRepositery Cr;
@Autowired
CompteService Cs;
@Autowired
IOperationRepository Op;
@Autowired
OperationService Os;
@Autowired
CreditService Crs;

//SimpleDateFormat formatter = new SimpleDateFormat("dd-MMM-yyyy", Locale.ENGLISH);
	public static void main(String[] args) {
		
		SpringApplication.run(GestionBanqueApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
//SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
//Utilisateur u13=new Utilisateur("ZZZZ","ZZZZZ","22222222","centre vil", 33, 4500, "ch", "ch", "blabla@gmail.com", formatter.parse("1990-04-07"));
//Us.ajouterouModifier(u13); 
//////		
//Compte c=new Compte("epargne", 8000 ,"ZIITOUNA000000A",formatter.parse("2005-03-12"), "778255555555",u13);
//Cs.creerCompte(c);
		
		
		//		
//		String pattern = "yyyy-MM-dd";
//		SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);
//
//		String date = simpleDateFormat.format(new Date());
////		System.out.println(date);
////		Date date = new Date();
//	SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
//		String strDate= formatter.format(date);
//		System.out.println(strDate);
//
//	DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
////		System.out.println(formatter);
		
//		List <Operation> ls=Os.findByDate("2020-02-05");
//		
//			System.out.println(ls);
	
//	Credit cr= new Credit(1000,12,100);
//		Crs.ajoutercredit(cr);
//		Utilisateur u6=new ResponsableCredit("alain", "pruski", "07997287799", "lyon",50,2900, "alain", "alain", formatter.parse("22-jun-2000"));
//		Us.ajouterouModifier(u6);
//		Boolean suppresionResult=Os.supprimerOpCompte(8L);
//		System.out.println(suppresionResult);
		
		// test virement de compte a compte
		
		
//		  Boolean virement= Os.virement(8L,40L,4000); if (virement==true) {
//		  System.out.println("virement effectué avec succsée"); }
//		 
//		
		
		
		
//		Utilisateur u=new Utilisateur("zied","guendil","08539917","centre urbain", 33, 1500, "zied", "zied", formatter.parse("22-jun-1986"));
//		/*
// Utilisateur u1= new Agent("zied", "guendil", "08539917",
//"centre urbain",33,1500, "zied", "zied","guendil_zied@yahoo.com" ,formatter.parse("1986-06-22"));
//		 * Utilisateur u2= new Client("med", "ali", "07999999", "charguia",32,1900,
//		 * "ali", "ali", formatter.parse("22-jun-2000")); Utilisateur u3= new
//		 * Client("alain", "lecler", "07999955", "Paris",40,1700, "zed", "zed",
//		 * formatter.parse("22-jun-2002")); Utilisateur u4= new Client("alain", "alain",
//		 * "079944499", "lyon",32,1900, "ali", "ali", formatter.parse("22-jun-2003"));
//		 * Utilisateur u5= new Client("xavi", "xavi", "07997222799", "rennes",44,1700,
//		 * "zied", "zied", formatter.parse("22-jun-2007")); 
//		 Us.ajouterouModifier(u1); 
//		 * s.ajouterouModifier(u2); s.ajouterouModifier(u3); s.ajouterouModifier(u4);
//		 * s.ajouterouModifier(u5);
//		 */
		
//		 Utilisateur u7= new Agent("Ali", "Ali", "0553955917","sfax",40,3000, "ali", "ali","aliali@yahoo.com", formatter.parse("22-jun-1980"));
//	Us.ajouterouModifier(u7);
//	
//	Compte c3=new Compte("epargne", 7000 ,"BIAT222222",formatter.parse("22-jun-2005"), "77853264917",u7);
//	Cs.creerCompte(c3);
//		 Compte c2= new Compte("courant", 50000, "BN56987", formatter.parse("22-jun-2011"), "512347895666",
//					u6);
	     //cs.creerCompte(c2);//
	     
	    // c.setUtilisateur(u.getIdutilisateur());
	     
		//System.out.println(cs.getCompte(8L));
//		Utilisateur u6=new Client("xavi", "allo", "0799727799", "rennes",44,1700, "zied", "zied", formatter.parse("22-jun-2017"));
//		u6.setIdutilisateur(5L);
//		s.ajouterouModifier(u6);
		//System.out.println(s.rechercherUtlisateur(2L));
//		Utilisateur u=s.rechercherUtlisateur(5L);
//		Compte c=cs.getCompte(8L);
//		c.setUtilisateur(u);
//		System.out.println(cs.updateCompte(c));
		
		
//		Utilisateur u = new Agent();
//		u.setNom("zied");
//		u.setPrenom("guendil");
//		u.setCIN("08539917");
//		ur.save(u);
//		// ajout deuxieme utlisateur 
//
//		Utilisateur u1 = new Client();
//		u1.setNom("yassine");
//		u1.setPrenom("Haji");
//		u1.setCIN("09229917");
//		ur.save(u1);
//		// ajout troisième utlisateur 
////	    
//		Utilisateur u2 = new Client();
//		u2.setNom("oussema");
//		u2.setPrenom("ayara");
//		u2.setCIN("07589999");
//		ur.save(u2);
//		Utilisateur u4 = new Client();
//		u4.setNom("hamadi");
//		u4.setPrenom("abcc");
//		u4.setCIN("085589999");
//		ur.save(u4);
//		// Creation de compte pour le client yassine 
//		
//		Compte C2= new Compte("epargne", 400, "BCC22386", formatter.parse("22-jun-2019"), "025977452", (Client) u4);
//		Utilisateur u5=new Client();
//		 u5= ur.getOne(4L);
//		Compte C3= new Compte("courant", 400, "DCC223869", formatter.parse("12-jun-2018"), "025975557452",  u5);
//		//Compte C2= new Compte("epargne", 400, formatter.parse("22-jun-2019"), "BC222N32", "025977452");
//		//System.out.println(cr.save(C2));
//		cr.save(C3);
//		Utilisateur u6=new Agent();
//		 u6= ur.getOne(1L);
//		Compte C4= new Compte("epargne", 100000, "DCCT223869", formatter.parse("10-jun-2018"), "02597588557452",  u6);
//		//Compte C2= new Compte("epargne", 400, formatter.parse("22-jun-2019"), "BC222N32", "025977452");
//		//System.out.println(cr.save(C2));
//		cr.save(C4);
//		Compte C1= new Compte("124555896", "RRN124586");
//		Compte C2= new Compte("124545896326", "RRCCDN124586");
//	cr.save(C1);
//	cr.save(C2);
//		List <Compte> ls= new ArrayList<Compte>();
//		ls.add(C1);
//		ls.add(C2);
//		Utilisateur u5 = new Client();
//	u5.setNom("Medmed");
//	u5.setPrenom("Medmed");
//	u5.setCIN("5559682474747");
//	u5.setComptes(ls);
//	ur.save(u5);
		
		
		
		
		
		
		
	}

}
