import { Utilisateur } from './../../models/utilisateur';
import { UtilisateurService } from './../../services/utilisateur.service';
import { NgForm, FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
@Component({
  selector: 'app-modif-utilisateur',
  templateUrl: './modif-utilisateur.component.html',
  styleUrls: ['./modif-utilisateur.component.css']
})
export class ModifUtilisateurComponent implements OnInit {
  iduser: string;


  userForm = new FormGroup({
    idutilisateur: new FormControl(),
    nom: new FormControl(),
    prenom: new FormControl(),
    cin: new FormControl(),
    adresse: new FormControl(),
    age: new FormControl(),
    revenue: new FormControl(),
    login: new FormControl(),
    motdepasse: new FormControl(),
    datenaissance: new FormControl(),
    type:new FormControl(),
   adressemail:new FormControl(),
  })
  constructor(private route: ActivatedRoute, private utilisateurService: UtilisateurService) { }

  ngOnInit() {
    this.iduser = this.route.snapshot.paramMap.get("id");
    this.utilisateurService.getbyid(this.iduser).subscribe(resultat => {
      console.log(resultat)
      this.userForm.setValue(resultat)
    });

  }
  updateUser() {
      this.utilisateurService.ajouterutlisateur(this.userForm.value).subscribe();
      console.log(this.userForm.value);

  }




}
