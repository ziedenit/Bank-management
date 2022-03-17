
import { CompteService } from './../../services/compte.service';
import { compte } from './../../models/compte';
import { UtilisateurService } from './../../services/utilisateur.service';
import { Component, OnInit } from '@angular/core'
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-list-compte',
  templateUrl: './list-compte.component.html',
  styleUrls: ['./list-compte.component.css']
})
export class ListCompteComponent implements OnInit {
  [x: string]: any;
  rib: any;


  constructor(private utilisateurService: UtilisateurService, private Cs:CompteService, private Confservice:ConfirmationService) { }
  //listUtilisateur:any=[]
  listCompte: compte[];

  ngOnInit() {
    // this.utilisateurService.getAllUtilisateur().subscribe(resultat=>{
    //   console.log(resultat)
    //   this.listUtilisateur= resultat
    // })
    //this.utilisateurService.getAllUtilisateur().subscribe((resultat: Utilisateur[]) => { this.utilisateurs = resultat });

     /* this.utilisateurService.getlistCompte().subscribe(resultat=>{
         console.log(resultat)}); */
         this.Cs.getlistCompte().subscribe((resultat: compte[]) => { this.listCompte = resultat });

  }




  restorelistCompte()
{
  this.Cs.getlistCompte().subscribe((resultat: compte[]) => { this.listCompte = resultat });
}


recherchercompteByRIB(){




  this.Cs.getComptebyRIB(this.rib).subscribe((resultat:compte) => {
    this.listCompte=[];
    if (resultat!=null)
    this.listCompte.push(resultat);


  });

}

deleteCompte(idCpt)  {
   this.Confservice.confirm({
        message: 'Etes vou sure?',
        accept: () => {
          this.Cs.supprimerCompte(idCpt).subscribe(resultat=>{
            let indexDeleted=this.listCompte.findIndex(el=>el.idcompe==idCpt)
            this.listCompte.splice(indexDeleted,1)
          })
        }
    });
}

updateCompte(idCpt)
{

}

}



