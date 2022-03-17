import { Utilisateur } from './../../models/utilisateur';

import { UtilisateurService } from './../../services/utilisateur.service';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
@Component({
  selector: 'app-lis-utilisateur',
  templateUrl: './lis-utilisateur.component.html',
  styleUrls: ['./lis-utilisateur.component.css']
})

export class LisUtilisateurComponent implements OnInit {
  cin:string;
  constructor(private utilisateurService: UtilisateurService,private confirmationService: ConfirmationService) { }
  //listUtilisateur:any=[]
  utilisateurs: Utilisateur[];

  ngOnInit() {
    // this.utilisateurService.getAllUtilisateur().subscribe(resultat=>{
    //   console.log(resultat)
    //   this.listUtilisateur= resultat
    // })
     this.getlistUtilisateur();

  }

  getlistUtilisateur()
  {
    this.utilisateurService.getAllUtilisateur().subscribe((resultat: Utilisateur[]) => { this.utilisateurs = resultat });
  }
  deleteUser(idUser){
      this.confirmationService.confirm({
          message: 'Etes vou sure?',
          accept: () => {
            this.utilisateurService.supprimerutlisateur(idUser).subscribe(resultat=>{
              let indexDeleted=this.utilisateurs.findIndex(el=>el.idutilisateur==idUser)
              this.utilisateurs.splice(indexDeleted,1)
            })
          }
      });
  }
  rechercherByCin(){
    this.utilisateurService.geUserByCin(this.cin).subscribe((resultat:Utilisateur) => {
      this.utilisateurs=[];
      if (resultat!=null)
      this.utilisateurs.push(resultat);


    });

  }
}
