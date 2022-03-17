import { Utilisateur } from './../../models/utilisateur';
import { compte } from './../../models/compte';
import { UtilisateurService } from './../../services/utilisateur.service';
import { CompteService } from './../../services/compte.service';
import { Component, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms';
import { SelectItem } from 'primeng/api/selectitem';


@Component({
  selector: 'app-ajouter-compte',
  templateUrl: './ajouter-compte.component.html',
  styleUrls: ['./ajouter-compte.component.css']

})


export class AjouterCompteComponent implements OnInit {
user:Utilisateur;
  type: string;
  constructor(private Cs:CompteService,private Us:UtilisateurService) { }
  cpt:compte
  utilisateurs:any
  selectedUser:any;
  typecompte: any;
  selectedCompte: string;

  ngOnInit() {

    this.typecompte = [

      {label:'Epargne', value:'Epargne'},
      {label:'Courant', value:'Courant'}
    ];
    // this.typecompte=this.selectedCompte.name;
    this.Us.getAllUtilisateur().subscribe(resultat=>{this.utilisateurs=resultat});
    //this.type=this.selectedCompte.name;
  }

  oncompteSubmit(cptForm:NgForm)
  {

   cptForm.value.utilisateur=this.selectedUser
   cptForm.value.type=this.selectedCompte
   console.log(cptForm.value)
   if(cptForm.value.utilisateur){
    this.Cs.ajoutercompte(cptForm.value).subscribe(resultat=>{
     console.log(resultat)
   })
  }
   //console.log(cptForm.value)

  }
  concat(nom,prenom){
    return nom+" "+prenom;
  }




}
